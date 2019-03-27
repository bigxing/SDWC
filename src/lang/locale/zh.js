module.exports = {
  login: {
    username:'账号',
    error_username: '请输入账号',
    password:'密码',
    error_password: '请输入密码',
    button:'登录',
    failed: '登录失败：用户名或密码错误'
  },
  header: {
    title:'Superdock无人机自动机场',
    status: '通讯状态',
    logout:'退出',
    air:'无人机',
    depot:'机场',
    normal:'正常',
    shutdown: '已关闭',
    net_error: '网络错误',
    never_online: '未连接',
    abnormal:'异常'
  },
  sidemenu: {
    plan:'任务管理',
    depot:'机场',
    air:'无人机'
  },
  plan:{
    view:{
      title:'查看任务',
      run:'执行任务',
      history:'任务执行历史',
      run_time:'执行时间',
      raw_data:'原始数据',
      auto_run:'自动处理结果',
      logs:'飞行日志',
      sever_logs:'服务器日志',
      start_run:'当前任务开始执行！',
    },
    edit:{
      add:'新建任务',
      alter:'修改任务',
      create:'创建任务',
      save_plan:'保存任务',
      delete_plan:'删除任务',
      name_inp:'请输入任务名称',
      desc_inp:'请输入任务描述',
      first_time_inp:'请选择首次执行时间',
      depot_inp:'请选择起降机场',
      air_inp:'请选择执飞无人机',
      cycle_inp:'请选择执行频次',
      cycle_type_1:'手动',
      cycle_type_2:'一次',
      cycle_type_3:'每小时',
      cycle_type_4:'每天',
      cycle_type_5:'每周',
      cycle_type_6:'每月',
      please_name:'请输入任务名称！',
      please_desc:'请输入任务描述！',
      please_air:'请选择执飞无人机！',
      please_depot:'请选择起降机场！',
      please_cycle:'请选择执行频次！',
      please_file:'请上传航点站务文件！',
      delete_tips:'此操作将删除该任务，是否继续？'
    },
    plan_name:'任务名称',
    plan_desc:'任务描述',
    plan_desc_no:'暂无任务描述',
    plan_air:'执飞无人机',
    plan_depot:'起降机场',
    plan_cycle:'执行频次',
    plan_mapfile:'航点站务文件',
    plan_first_time:'首次执行时间',
    weather:'天气',
    fly_check:'飞行前检查',
    plan_createtime:'创建时间',
    fly_check_desc:'我们需要检查设备情况，确保可以安全执行任务。',
    start_now:'立即启动'
  },
  air:{
    mode_auto:'自动模式',
    mode_guide:'引导模式',
    mode_fixed:'定点模式',
    mode_back:'返航模式',
    mode_land:'降落模式',
    mode_:'--模式',
    flight_time:'飞行{t}',
    flight_speed:'速度{s}',
    flight_height:'高度{h}',
    battery_remain:'电量{num}',
    battery_voltage:'电压{num}',
    gps_satellites:'{num}星',
    pitch_angle:'云台俯仰角',
    screenshot:'截图',
    recording:'录制屏幕',
    air_control:'无人机控制',
    air_hover:'悬停',
    air_return:'返航',
    air_takeoff:'起飞',
    air_runplan:'开始任务',
    air_up:'上升{num}米',
    air_down:'下降{num}米',
    air_landpoint:'降落到备用点',
    air_land:'直接降落',
    air_emergency_stop:'急停',
    air_emergency_stop_tips:'桨叶急停，需特别小心',
  },
  depot:{
    monitor:'实时监控',
    weather:'室外天气',
    weather_feel:'天气{feel}',
    wind_speed:'风速{s}',
    humidity:'湿度{num}',
    temperature:'气温{num}',
    charts:'<{a}为小雨，{a}-{b}为中雨，>{b}为大雨',
    charts_label_now:'现在',
    charts_label_30m:'30分钟',
    charts_label_60m:'60分钟',
    depot_info:"机场信息",
    depot_id:'编号',
    view_old_monitor:'查看历史监控',
    view_fly_plan:'查看飞行任务',
    battery:'{i}仓电池',
    cycle:'循环次数',
    maintain:'维护',
    debug:'调试命令',
    putin:'放入电池',
    pickout:'取下电池',
    start_charge:'开始充电',
    stop_charge:'停止充电',
    motor_run:'电机运动',
    emergency_stop:'急停',
    open_door:'打开舱门',
    close_door:'关闭舱门',
    air_fixed:'固定无人机',
    air_release:'松开无人机',
    air_bat_putin:'安装飞机电池',
    air_bat_pickout:'取下飞机电池',
    air_reset:'复位',
    platform_rise:'平台升顶',
    platform_bottom:'平台降底',
    platform_level:'平台举平',
    status_normal:'状态正常',
    status_abnormal:'状态异常'
  },
  common:{
    air:'无人机',
    depot:'机场',
    cancel:'取消',
    comfirm:'确定',
    view:'查看',
    download:'下载',
    upload:'上传',
    re_upload:'重新上传',
    back:'取消并返回',
    data_none:'暂无相关数据',
    debug_tips:'以下命令仅限开发人员调试使用',
    send:'发送',
    clear:'清空',
    fly_yes:'可以起飞',
    fly_no:'不可起飞',
    control:'控制',
    advanced_control:'高级控制',
    status:'状态',
    air_status:'无人机状态',
    depot_status:'机场状态',
    none:'暂无',
    logs:'日志',
    no_video:'未找到视频源，请稍后再试~',
    operate_pending: '操作执行中 ...',
    operate_success:'操作成功！',
    operate_error:'操作失败！',
    system_tips:'系统提示',
    plan_ready:'任务准备就绪，是否立即执行？',
  },
  weather:{
    clear_day:'晴天',
    clear_night:'晴夜',
    partly_cloudy:'多云',
    cloudy:'阴',
    rain:'雨',
    snow:'雪',
    wind:'风',
    haze:'雾霾沙尘'
  }
}
