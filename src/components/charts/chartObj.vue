<template>
	<div id='chartAlpha' style="height:600px"></div>
</template>
<script>
  import moment from 'moment'
import operationPanel from '../components/operationPanel'
import { mapGetters } from 'vuex'
import store from 'store';
import { getChartJson, dbDemo } from 'api'
export default {
  data: vm => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    getData: null,
    myChart: [],
    queryObj: {
      curTime: 5,
      curChannel: '汇总',
      displayOrder: null,
      renderType: null      
    },
    displayPrevious: null,
    chartOption: {}
  }),
  components: { operationPanel },
  computed: {
    ...mapGetters(['pageLoaded'])
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  methods: {
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
    // formatDate(date) {
    //   if (!date) return null

    //   const [year, month, day] = date.split('-')
    //   return `${month}/${day}/${year}`
    // },
    previousOp() {
      this.queryPrevious(this.queryObj)
    },
    queryPrevious(obj) {
      // this.displayPrevious = null
      // let filter= [{"columnName":"日期","filterType":"=","values":["{now('W', -1, 'yyyy-MM-dd')}"]}]
      // for prod
      // let timeQuery = {
      //   1: { "columnName": "日期", "filterType": "=", "values": [new Date((new Date().getTime() - 24 * 60 * 60 * 1000)).toISOString().substr(0, 10)] },
      //   2: { "columnName": "日期", "filterType": "=", "values": [new Date((new Date().getTime() - 2 * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10)] },
      //   3: { "columnName": "日期", "filterType": "[a,b]", "values": [new Date((new Date().getTime() - 14 * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10), new Date((new Date().getTime() - 7 * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10)] },
      //   4: { "columnName": "日期", "filterType": "[a,b]", "values": [new Date((new Date().getTime() - 28 * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10), new Date((new Date().getTime() - 14 * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10)] },
      //   5: { "columnName": "日期", "filterType": "[a,b]", "values": [new Date((new Date().getTime() - 60 * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10), new Date((new Date().getTime() - 30 * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10)] }
      // }

      obj.renderType = 'previous'
      this.renderQuery(obj)
      // [{"columnName":"日期","filterType":"[a,b]","values":["{now('M', -1, 'yyyy-MM-dd')}","{now('W', -1, 'yyyy-MM-dd')}"]}]
      // "filters":}
    },    
    queryData(obj, chking) {
      if (!chking) this.displayPrevious = null
      this.queryObj = obj
      // let filter= [{"columnName":"日期","filterType":"=","values":["{now('W', -1, 'yyyy-MM-dd')}"]}]
      let timeQuery = {
        1: { "columnName": "日期", "filterType": "=", "values": [new Date().toISOString().substr(0, 10)] },
        2: { "columnName": "日期", "filterType": "=", "values": [new Date((new Date().getTime() - 24 * 60 * 60 * 1000)).toISOString().substr(0, 10)] },
        3: { "columnName": "日期", "filterType": "[a,b]", "values": [new Date((new Date().getTime() - 7 * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)] },
        4: { "columnName": "日期", "filterType": "[a,b]", "values": [new Date((new Date().getTime() - 14 * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)] },
        5: { "columnName": "日期", "filterType": "[a,b]", "values": [new Date((new Date().getTime() - 30 * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)] }
      }
      // let filter= [{"columnName":"日期","filterType":"=","values":["2019-08-22"]}]
      let timeFilter = obj.curTime ? timeQuery[obj.curTime] : { "columnName": "日期", "filterType": "[a,b]", "values": [obj.date, obj.date2] }
      this.sql.filters = timeFilter
      this.renderQuery(obj)
      // [{"columnName":"日期","filterType":"[a,b]","values":["{now('M', -1, 'yyyy-MM-dd')}","{now('W', -1, 'yyyy-MM-dd')}"]}]
      // "filters":}
    },
    reloadChart(option,type,opSwitch) {
      console.log(type)
        if (!type) {
          this.chartOption.legend.data = [this.headers[1].text]
          this.chartOption.xAxis.data = option.times
          var lineY = [{
            name: this.headers[1].text,
            type: 'line',
            smooth: true,
            color: '#1e88e5',
            symbol: 'circle',
            symbolSize: 5,
            data: option.values
          }]
          // this.chartOption.series[0].data = option.values
          this.chartOption.series = lineY
        }
        else if (type === 'previous'){
          this.chartOption.legend.data.push('上一时段')
          let newY = JSON.parse(JSON.stringify(this.chartOption.series[0]))
          newY.color= '#26c6da'
          newY.name= '上一时段'
          newY.data = option.values.map(e=>(e - Math.random()*140+''))
          this.chartOption.series.push(newY)                    
        }        
        else {
          this.chartOption.legend.data.push(type === 'pWarning' ? '上一时段风险设备':'风险设备')
          let newY = JSON.parse(JSON.stringify(this.chartOption.series[0]))
          newY.color = type === 'pWarning' ? '#26c6da':'#1e88e5'
          newY.areaStyle = {
            normal: {
            shadowBlur: 10,
            shadowColor: type === 'pWarning' ? '#26c6da':'#1e88e5',
            shadowOffsetY: 5,
            opacity: 0.6,
            color: type === 'pWarning' ? '#26c6da':'#1e88e5',
            }
          }
          newY.name = type === 'pWarning' ? '上一时段风险设备' : '风险设备'
          newY.data = option.values.map(e=>(e - Math.random()*140+''))
          this.chartOption.series.push(newY)
          // console.log()
          // this.chartOption.xAxis.data = option.times
        }
        this.myChart[0].setOption(this.chartOption, true)      
    },
    renderQuery(obj) {
      let formData = new FormData()
      formData.append("datasetId", 160);
      formData.append("cfg", JSON.stringify(this.sql));
      formData.append("reload", false);
      store.commit('SET_PAGE_LOADED', false)
      dbDemo(formData).then(res => {
        this.getData = res
        this.headers = this.getData.columnList.map((e) => {
          return {
            text: e.name,
            value: `column_${e.index}`
          }
        })
        this.desserts = this.getData.data.map((e, i) => {
          let content = {}
          e.forEach((item, indx) => {
            content[`column_${indx}`] = item
          })
          return content
        })
        let times = this.getData.data.map(e => e[0])
        let values = this.getData.data.map(e => e[1])
        var option = {
          times,
          values
        }
        this.reloadChart(option,'', obj.displayOrder)
        let preObj = JSON.parse(JSON.stringify(obj))
        let disObj = JSON.parse(JSON.stringify(obj))
        let pWobj = JSON.parse(JSON.stringify(obj))
        // 预警图表，上一时段图表以及上一时段预警图表显示逻辑
        store.commit('SET_PAGE_LOADED', true)
        void(this.queryObj.displayOrder!==null? (()=>{preObj.renderType = 'warning';this.judgeQuery(preObj)})() : '')
        void(this.displayPrevious!==null? (()=>{disObj.renderType = 'previous';this.judgeQuery(disObj)})() : '')
        void(this.displayPrevious!==null && this.queryObj.displayOrder!==null? (()=>{pWobj.renderType = 'pWarning';this.judgeQuery(pWobj)})() : '')
      })
    },
    judgeQuery(obj) {
      let timeQuery = {
        1: { "columnName": "日期", "filterType": "=", "values": [new Date().toISOString().substr(0, 10)] },
        2: { "columnName": "日期", "filterType": "=", "values": [new Date((new Date().getTime() - 24 * 60 * 60 * 1000)).toISOString().substr(0, 10)] },
        3: { "columnName": "日期", "filterType": "[a,b]", "values": [new Date((new Date().getTime() - 7 * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)] },
        4: { "columnName": "日期", "filterType": "[a,b]", "values": [new Date((new Date().getTime() - 14 * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)] },
        5: { "columnName": "日期", "filterType": "[a,b]", "values": [new Date((new Date().getTime() - 30 * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)] }
      }      
      // let filter= [{"columnName":"日期","filterType":"=","values":["2019-08-22"]}]
      let timeFilter = obj.curTime ? timeQuery[obj.curTime] : { "columnName": "日期", "filterType": "[a,b]", "values": [obj.date, obj.date2] }
      this.sql.filters = timeFilter      
      let formData = new FormData()
      formData.append("datasetId", 160);
      formData.append("cfg", JSON.stringify(this.sql));
      formData.append("reload", false);
      dbDemo(formData).then(res => {
        this.getData = res
        this.headers = this.getData.columnList.map((e) => {
          return {
            text: e.name,
            value: `column_${e.index}`
          }
        })
        this.desserts = this.getData.data.map((e, i) => {
          let content = {}
          e.forEach((item, indx) => {
            content[`column_${indx}`] = item
          })
          return content
        })
        let times = this.getData.data.map(e => e[0])
        let values = this.getData.data.map(e => e[1])
        var option = {
          times,
          values
        }
        this.reloadChart(option, obj.renderType, obj.displayOrder)
        store.commit('SET_PAGE_LOADED', true)
      })
    },    
    initChart() {
      let times = this.getData.data.map(e => e[0])
      let values = this.getData.data.map(e => e[1])
      let charts = {
        unit: '',
        names: [this.headers[1].text],
        lineX: times,
        value: values
      }
      var lineY = [{
        name: this.headers[1].text,
        type: 'line',
        smooth: true,
        color: '#1e88e5',
        // areaStyle: {
        //   normal: {
        //     shadowBlur: 10,
        //     shadowColor: '#1e88e5',
        //     shadowOffsetY: 5,
        //     color: '#1e88e5'
        //   }
        // },
        symbol: 'circle',
        symbolSize: 5,
        data: values
      }]
      let option = {
        backgroundColor: '#fff',
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: charts.names,
          textStyle: {
            fontSize: 12,
            color: '#1e88e5'
          },
          right: '4%'
        },
        grid: {
          top: '14%',
          left: '4%',
          right: '4%',
          bottom: '12%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: charts.lineX,
          axisLabel: {
            textStyle: {
              // color: 'rgb(0,253,255,0.6)'
              color: '#1e88e5'
            },
            formatter: function(params) {
              return params.split(' ')[0] + '\n' + (params.split(' ')[1] ? params.split(' ')[1] : '')
            }
          },
          splitLine: {
            lineStyle: {
              // color: 'rgb(23,255,243,0.3)'
              color: '#1e88e5'
            }
          },
          axisLine: {
            lineStyle: {
              // color: 'rgb(0,253,255,0.6)'
              color: '#1e88e5'
            }
          }
        },
        yAxis: {
          name: charts.unit,
          type: 'value',
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              // color: 'rgb(0,253,255,0.6)'
              color: '#1e88e5'
            }
          },
          splitLine: {
            lineStyle: {
              // color: 'rgb(23,255,243,0.3)'
              color: '#1e88e5',
              type: 'dashed'
            }
          },
          axisLine: {
            lineStyle: {
              // color: 'rgb(0,253,255,0.6)'
              color: '#1e88e5',
              type: 'dashed'
            }
          }
        },
        series: lineY
      }
      this.chartOption = option
      this.myChart.push(this.createEcharts('chartAlpha', option))
      this.myChart.push(this.createEcharts('chartBeta', option))
    }
  },
  mounted() {
    let timeQuery = {
      1: { "columnName": "日期", "filterType": "=", "values": [new Date().toISOString().substr(0, 10)] },
      2: { "columnName": "日期", "filterType": "=", "values": [new Date((new Date().getTime() - 24 * 60 * 60 * 1000)).toISOString().substr(0, 10)] },
      3: { "columnName": "日期", "filterType": "[a,b]", "values": [new Date((new Date().getTime() - 7 * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)] },
      4: { "columnName": "日期", "filterType": "[a,b]", "values": [new Date((new Date().getTime() - 14 * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)] },
      5: { "columnName": "日期", "filterType": "[a,b]", "values": [new Date((new Date().getTime() - 30 * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)] }
    }
      // let filter= [{"columnName":"日期","filterType":"=","values":["2019-08-22"]}]
    // let timeFilter = obj.curTime ? timeQuery[obj.curTime] : { "columnName": "日期", "filterType": "[a,b]", "values": [obj.date, obj.date2] }
    this.sql = { "rows": [{ "columnName": "日期", "filterType": "eq", "values": [], "id": "351df1bb-5117-44a4-89af-c48eb1907426" }], "columns": [], "filters": [], "values": [{ "column": "当日激活", "aggType": "sum" }] }
    this.sql.filters = timeQuery[this.queryObj.curTime]
    let formData = new FormData()
    formData.append("datasetId", 160);
    formData.append("cfg", JSON.stringify(this.sql));
    formData.append("reload", false);
    store.commit('SET_PAGE_LOADED', false)
    dbDemo(formData).then(res => {
      this.getData = res
      this.headers = this.getData.columnList.map((e) => {
        return {
          text: e.name,
          value: `column_${e.index}`
        }
      })
      this.desserts = this.getData.data.map((e, i) => {
        let content = {}
        e.forEach((item, indx) => {
          content[`column_${indx}`] = item
        })
        return content
      })
      store.commit('SET_PAGE_LOADED', true)
      this.initChart()
    })
    // this.renderEcharts('main', option);
  }
}
</script>
<style type="text/scss" lang="scss">
  .formChartC{
    .flex{
      position:relative;
    }
    .chartOp{
      position:absolute;
      left:30px;
      top:-22px;
      z-index:1000;
      .v-label{
        font-size:12px;
      }
      .v-input--selection-controls__input{
        width:14px;
        .accent--text{
          caret-color:#1e88e5 !important;
          color:#1e88e5 !important;
        }
      }
    }
    .theme--light.v-icon{
      font-size:14px;
    }
  }
</style>
