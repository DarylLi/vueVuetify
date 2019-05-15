import Cookies from 'js-cookie';
const app = {
  state: {
    mode: Cookies.get('mode') ? Cookies.get('mode') : 'normal',
    sideShow: Cookies.get('sideShow') ? eval(Cookies.get('sideShow')) : true,
    list_Active: Cookies.get('list_Active') ? Boolean(Cookies.get('list_Active')) : true,
    selected_Link: Cookies.get('selected_Link') ? Cookies.get('selected_Link') : [],
    selected_Nav: Cookies.get('selected_Nav') ? Cookies.get('selected_Nav') : "",
    echarts: null,
    pageLoaded: Cookies.get('pageLoaded') ? Cookies.get('pageLoaded') : false,
  },
  mutations: {
    SET_MODE(state, value) {
      state.mode = value;
      Cookies.set('mode', value)
    },
    SET_SIDE_SHOW(state, value) {
      state.sideShow = Boolean(value);
      Cookies.set('sideShow', value)
    },
    SET_LIST_ACTIVE(state, value) {
      state.list_Active = Boolean(value);
      Cookies.set('list_Active', value)
    },
    SET_SELECTED_LINK(state, value) {
      state.selected_Link = value;
      Cookies.set('selected_Link', value)
    },
    SET_SELECTED_NAV(state, value) {
      state.selected_Nav = value;
      Cookies.set('selected_Nav', value)
    },
    SET_PAGE_LOADED(state, value) {
      state.pageLoaded = value;
      Cookies.set('pageLoaded', value)
    },
    SET_ECHART(state, value) {
      state.echarts = value;
      localStorage.setItem('echarts', JSON.stringify(value))
    }
  }
}
export default app
