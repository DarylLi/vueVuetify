// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import store from './store';
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import commonMethods from './utils/common'
import common from './utils/commonMethods'
import '@mdi/font/css/materialdesignicons.css'
import VueFullpage from 'vue-fullpage'
import $ from 'jquery';
import * as _ from "lodash";
import Cookies from 'js-cookie';
Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken1, // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
})
// Vue.use(Vuetify)
window.jQuery = $;
Vue.prototype.$_ = _;
Vue.use(VueFullpage)
Vue.mixin(common)
Vue.config.productionTip = false
Vue.prototype.commonMethods = commonMethods;
let frameOptions = {
  'dashboard.category.view.市场.120' : 'totalTable',
  'dashboard.category.view.市场.115' : 'chartsDevice',
  'dashboard.category.view.市场.119' : 'chartsOrder'
}
let curFrame = localStorage.getItem('curRootPath')
// Cookies.get('curRootPath')
// Vue.use(VueMaterial)
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
router.beforeEach((to, from, next) => {
  console.log(curFrame)
  if (frameOptions[curFrame]) {
  let curUrl = frameOptions[curFrame]
  curFrame = ''
  store.commit('SET_PAGE_LOADED', false)
  // if (to.path === '/') {
    router.push(curUrl)
    store.commit('SET_PAGE_LOADED', true)
  }
  else {
    next()
  }
})
router.afterEach(() => {
  setTimeout(()=>{
  	store.commit('SET_PAGE_LOADED', true)
  },1000)
  // NProgress.done(); // 结束Progress
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
