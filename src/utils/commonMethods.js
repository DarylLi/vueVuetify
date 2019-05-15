import router from '../router';
import store from 'store';
var echarts = require('echarts');
const common = {
  methods: {
    linkUrl(url) {
      // console.log("1111");
      router.push(url)
      // console.log(this)
    },
    createEcharts(el,options) {
      // let myChart = echarts.init((options.elType?document.getElementsByClassName(el)[0]:document.getElementById(el)));
      // store.getters.echarts ? (() => {
      //   let myChart = store.getters.echarts;
      //   console.log('aaa')
      //   myChart.clear();
      //   myChart.setOption(options)
      //   store.commit('SET_ECHART', myChart)
      // })() : (() => {
        let myChart = echarts.init(document.getElementById(el));
        myChart.setOption(options)
        // store.commit('SET_ECHART', myChart)
      // })()

    },
    renderEcharts(myChart,options) {
      // let myChart = echarts.init((options.elType?document.getElementsByClassName(el)[0]:document.getElementById(el)));
      // store.getters.echarts ? (() => {
      //   let myChart = store.getters.echarts;
      //   console.log('aaa')
      //   myChart.clear();
      //   myChart.setOption(options)
      //   store.commit('SET_ECHART', myChart)
      // })() : (() => {
        // let myChart = myChart.init(document.getElementById(el));
        myChart.setOption(options)
        // store.commit('SET_ECHART', myChart)
      // })()

    },
    formatDate(dateTime, fmt = 'YYYY年M月DD日 HH:mm:ss') {
      if (!dateTime) {
        return ''
      }
      moment.locale('zh-CN')
      dateTime = moment(dateTime).format(fmt)
      return dateTime
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    activeHref(activeIndex, rootName) {
      store.commit('SET_SELECTED_LINK', [activeIndex])
      // this.selected.push(index)
      // }
      rootName ? this.linkUrl(rootName) : ''
    }
  }
}


export default common
