// @ts-check

import Papaparse from 'papaparse';
import ContentDisposition from 'content-disposition';

import { setLocale } from '@/i18n';
import * as SDWC from '@/api/sdwc';
import * as AMap from '@/api/amap';
import MqttClient from '@/api/mqtt';
import * as CaiYun from '@/api/caiyun';
import * as SuperDock from '@/api/super-dock';
import * as GoogleMap from '@/api/google-map';

import { MutationTypes as PREF } from './modules/preference';
import { MutationTypes as CONFIG } from './modules/config';
import { MutationTypes as USER } from './modules/user';
import { MutationTypes as NODE } from './modules/node';
import { MutationTypes as PLAN } from './modules/plan';

/**
 * @typedef {object} Context
 * @property {import('vuex/types/index').Commit} commit
 * @property {import('vuex/types/index').Dispatch} dispatch
 * @property {import('./getters').Getters} getters
 * @property {import('./index').State} state
 */

/**
 * @param {Context} context
 * @param {any} payload
 */
export function setPreference({ commit }, payload) {
  commit(PREF.SET_PREFERENCE, payload);
}

/**
 * @param {Context} context
 */
export function storePreference({ state }) {
  localStorage.setItem('sdwc-preference', JSON.stringify(state.preference));
}

/**
 * @param {Context} context
 */
export function restorePreference({ commit }) {
  try {
    const pref = JSON.parse(localStorage.getItem('sdwc-preference'));
    commit(PREF.SET_PREFERENCE, pref);
  } catch (e) { /* noop */ }
}

/**
 * @param {Context} context
 */
export async function configure({ state, commit }) {
  const data = await SDWC.config();
  commit(CONFIG.SET_CONFIG, data);
  const config = state.config;
  SuperDock.setBaseURL(config.super_dock_api_server);
  GoogleMap.setApiKey(config.gmap_key);
  CaiYun.setApiKey(config.caiyun_key);
  AMap.setApiKey(config.amap_key);
  setLocale(config.lang);
}

/**
 * @param {Context} context
 * @param {{username: string; password: string}} payload
 */
export async function login({ state, commit }, { username, password }) {
  try {
    const data = await SuperDock.token(username, password, state.config.oauth_client_id, state.config.oauth_client_secret);
    const token = `${data.token_type} ${data.access_token}`;
    const due = (data.created_at + data.expires_in) * 1000;
    commit(USER.SET_USER_TOKEN, { token, due });
    SuperDock.setAuth(token);
    return token;
  }
  catch (e) {
    throw { msg: e.invalid_grant };
  }
}

/**
 * @param {Context} context
 */
export async function logout({ state, commit }) {
  try {
    await SuperDock.logout(state.user.token.slice(7));
    sessionStorage.removeItem('user');
    MqttClient.disconnect();
    SuperDock.setAuth('');
    commit(USER.SET_USER_TOKEN, { token: '', due: -1 });
    commit(USER.SET_USER_INFO, { email: '', id: -1 });
    commit(NODE.CLEAR_NODES);
    commit(PLAN.CLEAR_PLANS);
  } catch (e) { /* noop */ }
}

/**
 * @param {Context} context
 */
export async function getUserInfo({ commit, dispatch }) {
  const data = await SuperDock.user();
  commit(USER.SET_USER_INFO, data);
  dispatch('storeUser');
  MqttClient.setIdPrefix(data.id);
}

/**
 * @param {Context} context
 */
export function storeUser({ state }) {
  sessionStorage.setItem('user', JSON.stringify(state.user));
}

/**
 * restore user session after page refresh, if token still valid
 * @param {Context} context
 */
export async function reconfigure({ commit }) {
  const str = sessionStorage.getItem('user');
  if (!str) return;
  /** @type {import('./modules/user').State} */
  let json;
  try { json = JSON.parse(str); } catch (e) { /* ignore it */ }
  if (!json.token) return;
  commit(USER.SET_USER_TOKEN, json);
  commit(USER.SET_USER_INFO, json);
  SuperDock.setAuth(json.token);
}

/**
 * @param {Context} context
 */
export async function getNodes({ commit }) {
  const data = await SuperDock.nodes();
  data.forEach(node => {
    commit(NODE.ADD_NODE, node);
  });
}

/**
 * @param {Context} context
 */
export async function subscribeNodes({ state, commit }) {
  MqttClient.connect(state.config.mqtt_url);
  state.node.forEach(node => {
    MqttClient.subscribeNode(node.info.id);
  });
  MqttClient.on('status', ({ id, status }) => {
    commit(NODE.SET_NODE_STATUS, { id, status });
  });
  MqttClient.on('message', ({ id, message }) => {
    let parsed;
    try {
      parsed = JSON.parse(message);
      commit(NODE.ADD_NODE_MSG, { id, msg: parsed });
    } catch (e) {
      commit(NODE.ADD_NODE_LOG, { id, log: message });
    }
  });
}

/**
 * @param {Context} context
 * @param {number} id
 */
export async function getDepotPosition({ state, commit }, id) {
  const node = state.node.find(node => node.info.id === id);
  if (node && node.info.type_name === 'depot' && node.status === 0) {
    MqttClient.invoke(node.info.id, 'ncp', ['status'], {}).then(msg => {
      commit(NODE.ADD_NODE_MSG, { id, msg });
    });
  }
}

/**
 * @param {Context} context
 */
export async function getPlans({ commit }) {
  const data = await SuperDock.plans();
  data.forEach(plan => {
    commit(PLAN.ADD_PLAN, plan);
  });
}

/**
 * @param {Context} context
 * @param {number} id
 */
export async function getPlanLogs({ commit }, id) {
  const data = await SuperDock.planLogs(id);
  data.forEach(log => {
    commit(PLAN.ADD_PLAN_LOG, log);
  });
}

/**
 * @typedef {import('./modules/plan').PlanInfo} Plan
 * @param {Context} context
 * @param {Plan} plan
 */
export async function createPlan({ commit }, plan) {
  const data = await SuperDock.createPlan(plan);
  commit(PLAN.ADD_PLAN, data);
  return data;
}

/**
 * @param {Context} context
 * @param {number} id
 */
export async function retrievePlan({ commit }, id) {
  const data = await SuperDock.retrievePlan(id);
  commit(PLAN.UPDATE_PLAN, data);
  return data;
}

/**
 * @param {Context} context
 * @param {Plan} plan
 */
export async function updatePlan({ commit }, plan) {
  const data = await SuperDock.updatePlan(plan.id, plan);
  commit(PLAN.UPDATE_PLAN, data);
  return data;
}

/**
 * @param {Context} context
 * @param {number} id
 */
export async function deletePlan({ commit }, id) {
  await SuperDock.deletePlan(id);
  commit(PLAN.DELETE_PLAN, id);
}

/**
 * @param {Context} _
 * @param {{url: string, name: string}} payload
 */
export async function downloadFile(_, { url, name }) {
  const res = await SuperDock.getFile(url);
  const cd = res.headers.get('content-disposition');
  const blob = await res.blob();
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  if (typeof cd === 'string') {
    a.download = ContentDisposition.parse(cd).parameters.filename;
  } else {
    a.download = name;
  }
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  Promise.resolve().then(() => {
    URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
  });
}

/**
 * @param {Context} _
 * @param {string} url
 */
export async function getMapPath(_, url) {
  const text = await SuperDock.getFile(url).then(r => r.text());
  const path = [];
  Papaparse.parse(text).data.forEach(dt => {
    if (dt[3] === '16') {
      path.push({
        lat: Number.parseFloat(dt[8]),
        lng: Number.parseFloat(dt[9])
      });
    }
  });
  return path;
}