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
// Vue.use(VueMaterial)
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
router.beforeEach((to, from, next) => {
  store.commit('SET_PAGE_LOADED', false)
  next()
  router.afterEach(() => {
    setTimeout(()=>{
    	store.commit('SET_PAGE_LOADED', true)
    },1000)
    // NProgress.done(); // 结束Progress
  })
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
