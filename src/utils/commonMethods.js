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
        return myChart
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
      if (!date) return '-'

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    splitTimeArea(timeArea) {
      let start = parseInt(new Date(timeArea[0]).getTime()) - 8*60*60*1000
      let endTime = parseInt(new Date(timeArea[1]).getTime()) - 8*60*60*1000
      let timeList=[]
      void(start === endTime ? (() => {
        endTime = endTime + 24*60*60*1000
        for(var curTime=start;curTime < endTime;curTime += 15*60*1000) {
          timeList.push(curTime)
        }        
      })(): (() => {
        for(var curTime=start;curTime <= endTime;curTime += 24*60*60*1000) {
          timeList.push(curTime)
        }
      })())
      return timeList
    },
    splitOneDay() {
      let start = new Date(new Date().toLocaleDateString()).getTime()
      let endTime = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 -1 ).getTime()
      let timeList=[]
      for(var curTime=start;curTime < endTime;curTime+=15*60*1000) {
        timeList.push(curTime)
      }
      return timeList
    },
    splitYesterday() {
      let start = new Date(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000 ).getTime()
      let endTime = new Date(new Date(new Date().toLocaleDateString()).getTime() -1 ).getTime()
      let timeList=[]
      for(var curTime=start;curTime < endTime;curTime+=15*60*1000) {
        timeList.push(curTime)
      }
      return timeList
    },
    splitYesterdayPre() {
      let start = new Date(new Date(new Date().toLocaleDateString()).getTime() - 2 * 24 * 60 * 60 * 1000 ).getTime()
      let endTime = new Date(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000-1 ).getTime()
      let timeList=[]
      for(var curTime=start;curTime < endTime;curTime+=15*60*1000) {
        timeList.push(curTime)
      }
      return timeList
    },    
    splitOneMonth() {
      let start = new Date(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000 * 29 ).getTime()
      let endTime = new Date(new Date().toLocaleDateString()).getTime()
      let timeList=[]
      for(var curTime=start;curTime <= endTime;curTime += 24*60*60*1000) {
        timeList.push(curTime)
      }
      return timeList
    },
    splitHalfMonth() {
      let start = new Date(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000 * 13 ).getTime()
      let endTime = new Date(new Date().toLocaleDateString()).getTime()
      let timeList=[]
      for(var curTime=start;curTime <= endTime;curTime += 24*60*60*1000) {
        timeList.push(curTime)
      }
      return timeList
    },    
    splitHalfMonthPre() {
      let start = new Date(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000 * 27 ).getTime()
      let endTime = new Date(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000 * 14 ).getTime()
      let timeList=[]
      for(var curTime=start;curTime <= endTime;curTime += 24*60*60*1000) {
        timeList.push(curTime)
      }
      return timeList
    },      
    splitOneWeek() {
      let start = new Date(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000 * 6 ).getTime()
      let endTime = new Date(new Date().toLocaleDateString()).getTime()
      let timeList=[]
      for(var curTime=start;curTime <= endTime;curTime += 24*60*60*1000) {
        timeList.push(curTime)
      }
      return timeList
    },
    splitOneWeekPre() {
      let start = new Date(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000 * 13 ).getTime()
      let endTime = new Date(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000 * 7 ).getTime()
      let timeList=[]
      for(var curTime=start;curTime <= endTime;curTime += 24*60*60*1000) {
        timeList.push(curTime)
      }
      return timeList
    },     
    splitOneMonthPre() {
      let start = new Date(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000 * 59 ).getTime()
      let endTime = new Date(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000 * 30 ).getTime()
      let timeList=[]
      for(var curTime=start;curTime <= endTime;curTime += 24*60*60*1000) {
        timeList.push(curTime)
      }
      return timeList
    },
    // new Date((new Date().getTime() - 60 * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10), new Date((new Date().getTime() - 30 * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10)
    generateTimeData(timeList, getData) {
      // timeList = timeList.map(e => this.formatDate(e, 'YYYY-MM-DD HH:mm:ss'))
      let valList = timeList.map(e => [e, '-'])
      let times = timeList
      var judgeList = getData.data
      valList = valList.map(e=> {
        let flag = judgeList.map(i=>i[0]).indexOf(e[0])
        return (flag !=-1 && parseInt(judgeList[flag][1]) != 0) ? judgeList[flag][1] : e[1]
      })
      return valList
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
