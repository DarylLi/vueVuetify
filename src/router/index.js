import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../view/layout'
// import HelloWorld from '../components/HelloWorld'
// import demo from '../view/demo'
// const Layout = resolve => require(['../view/layout'], resolve);
// const HelloWorld = resolve => require(['../components/HelloWorld'], resolve);
const HelloWorld = () => import('../components/HelloWorld').then(m => m.default);
const demo = () => import('../view/demo').then(m => m.default);
const chartsDevice = () => import('../view/chartsDevice').then(m => m.default);
const chartsOrder = () => import('../view/chartsOrder').then(m => m.default);
const totalTable = () => import('../view/demo/totalTable').then(m => m.default);
const lazyLoad = () => import('../view/demo/lazyLoad').then(m => m.default);
const iconList = () => import('../components/icons').then(m => m.default);
const form = () => import('../view/demo/form').then(m => m.default);
const devPanel = () => import('../view/demo/develop').then(m => m.default);
const chartsRender = () => import('../view/dataView/chartsRender').then(m => m.default);
const coHort = () => import('../view/dataView/coHort').then(m => m.default);
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
        component: chartsDevice,
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
    // chartsOrder
    {
      path: '/chartsOrder',
      component: Layout,
      name: '',
      hidden: true,
      // meta: {
      //     role: ['admin,developer'],
      // },
      children: [{
        path: '',
        component: chartsOrder,
        // meta: {
        //     role: ['admin', 'developer', 'editor']
        // },
      }]
    },    
    // chartsRender 
    {
      path: '/chartsRender',
      component: Layout,
      name: '',
      hidden: true,
      // meta: {
      //     role: ['admin,developer'],
      // },
      children: [{
        path: '',
        component: chartsRender,
        // meta: {
        //     role: ['admin', 'developer', 'editor']
        // },
      }]
    },    
    // coHort    
    {
      path: '/coHort',
      component: Layout,
      name: '',
      hidden: true,
      // meta: {
      //     role: ['admin,developer'],
      // },
      children: [{
        path: '',
        component: coHort,
        // meta: {
        //     role: ['admin', 'developer', 'editor']
        // },
      }]
    },        
    // chartsDevice page
    {
      path: '/chartsDevice',
      component: Layout,
      name: '',
      hidden: true,
      // meta: {
      //     role: ['admin,developer'],
      // },
      children: [{
        path: '',
        component: chartsDevice,
        // meta: {
        //     role: ['admin', 'developer', 'editor']
        // },
      }]
    }, {
      path: '/totalTable',
      component: Layout,
      name: '',
      hidden: true,
      // meta: {
      //     role: ['admin,developer'],
      // },
      children: [{
        path: '',
        component: totalTable,
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
