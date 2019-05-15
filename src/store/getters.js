const getters = {
  admins: state => state.user.admins,
  cruds: state => state.user.crud,
  mode: state => state.app.mode,
  sideShow: state => state.app.sideShow,
  list_Active: state => state.app.list_Active,
  curUser: state => state.user.curUser,
  selected_Link: state => state.app.selected_Link,
  selected_Nav: state => state.app.selected_Nav,
  echarts: state => state.app.echarts,
  pageLoaded: state => state.app.pageLoaded,
}
export default getters