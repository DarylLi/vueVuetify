import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../view/layout'
// import HelloWorld from '../components/HelloWorld'
// import demo from '../view/demo'
// const Layout = resolve => require(['../view/layout'], resolve);
// const HelloWorld = resolve => require(['../components/HelloWorld'], resolve);
const HelloWorld = () => import('../components/HelloWorld').then(m => m.default);
const demo = () => import('../view/demo').then(m => m.default);
const echarts = () => import('../view/echarts').then(m => m.default);
const dataTable = () => import('../view/demo/dataTable').then(m => m.default);
const lazyLoad = () => import('../view/demo/lazyLoad').then(m => m.default);
const iconList = () => import('../components/icons').then(m => m.default);
const form = () => import('../view/demo/form').then(m => m.default);
const devPanel = () => import('../view/demo/develop').then(m => m.default);
// const demo = resolve => require(['../view/demo'], resolve);

Vue.use(Router)

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    // welcome page
    {
      path: '/',
      component: Layout,
      redirect: '/',
      name: '',
      hidden: true,
      // meta: {
      //     role: ['admin,developer'],
      // },
      children: [{
        path: '',
        component: HelloWorld,
        // meta: {
        //     role: ['admin', 'developer', 'editor']
        // },
      }]
    },
    // demo page
    {
      path: '/demo',
      component: Layout,
      name: '',
      hidden: true,
      // meta: {
      //     role: ['admin,developer'],
      // },
      children: [{
        path: '',
        component: demo,
        // meta: {
        //     role: ['admin', 'developer', 'editor']
        // },
      }]
    },
    // echarts page
    {
      path: '/echarts',
      component: Layout,
      name: '',
      hidden: true,
      // meta: {
      //     role: ['admin,developer'],
      // },
      children: [{
        path: '',
        component: echarts,
        // meta: {
        //     role: ['admin', 'developer', 'editor']
        // },
      }]
    }, {
      path: '/dataTable',
      component: Layout,
      name: '',
      hidden: true,
      // meta: {
      //     role: ['admin,developer'],
      // },
      children: [{
        path: '',
        component: dataTable,
        // meta: {
        //     role: ['admin', 'developer', 'editor']
        // },
      }]
    }, {
      path: '/lazyLoad',
      component: Layout,
      name: '',
      hidden: true,
      // meta: {
      //     role: ['admin,developer'],
      // },
      children: [{
        path: '',
        component: lazyLoad,
        // meta: {
        //     role: ['admin', 'developer', 'editor']
        // },
      }]
    }, {
      path: '/iconList',
      component: Layout,
      name: '',
      hidden: true,
      // meta: {
      //     role: ['admin,developer'],
      // },
      children: [{
        path: '',
        component: iconList,
        // meta: {
        //     role: ['admin', 'developer', 'editor']
        // },
      }]
    }, {
      path: '/form',
      component: Layout,
      name: '',
      hidden: true,
      // meta: {
      //     role: ['admin,developer'],
      // },
      children: [{
        path: '',
        component: form,
        // meta: {
        //     role: ['admin', 'developer', 'editor']
        // },
      }]
    }, {
      path: '/devPanel',
      component: Layout,
      name: '',
      hidden: true,
      // meta: {
      //     role: ['admin,developer'],
      // },
      children: [{
        path: '',
        component: devPanel,
        // meta: {
        //     role: ['admin', 'developer', 'editor']
        // },
      }]
    }
    // dataTable
    // ,
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    // {
    //   path: '/demo',
    //   name: 'demo',
    //   component: demo
    // }
  ]
})
