<template>
  <v-app id="inspire" class="formChartC">
    <operationPanel @queryData='queryData' filterLabel='显示风险订单数量' opHeader='订单实时监控'></operationPanel>
    <v-layout row wrap>
      <v-flex xs6 lg6>
      <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <div v-on="on" class='chartOp' v-if='showLast'>
          <v-checkbox v-model="displayPrevious.chartAlpha" @change="previousOp('chartAlpha')" value="1" label="上一时段" data-vv-name="checkbox" type="checkbox"></v-checkbox>
        </div>
      </template>
      <span>上一个所选时间段，如日期选择近7天，则对比上一个7天</span>
      </v-tooltip>
        <div id='chartAlpha' style="height:600px"></div>
      </v-flex>
      <v-flex xs6 lg6>
      <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <div v-on="on" class='chartOp' v-if='showLast'>
          <v-checkbox v-model="displayPrevious.chartBeta" @change="previousOp('chartBeta')" value="1" label="上一时段" data-vv-name="checkbox" type="checkbox"></v-checkbox>
        </div>
      </template>
      <span>上一个所选时间段，如日期选择近7天，则对比上一个7天</span>
      </v-tooltip>        
        <div id='chartBeta' style="height:600px"></div>
      </v-flex>
    </v-layout>
  </v-app>
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
    getData: null,
    getDataLast: null,
    myChart: {},
    sql:{

    },
    showLast: true,
    queryObj: {
   
    },
    displayPrevious: {
      chartAlpha: null,
      chartBeta: null
    },
    sqlOption:{
      chartAlpha: {
        datasetId: 176,
        values: [{"column":"当日首单（限当日激活）","aggType":"sum"}]
      },
      chartBeta: {
        datasetId: 177,
        values: [{"column":"当日客单价（限当日激活）","aggType":"avg"}]
      }
    },
    displayPreviousLast: null,
    chartOption: {},
    timeQuery: {
        1: [{ "columnName": "日期类型", "filterType": "=", "values": ["今日"] },{"columnName":"时段","filterType":"=","values":["本时段"]},{"columnName":"显示","filterType":"=","values":["全量"]}],
        2: [{ "columnName": "日期类型", "filterType": "=", "values": ["昨日"] },{"columnName":"时段","filterType":"=","values":["本时段"]},{"columnName":"显示","filterType":"=","values":["全量"]}],
        3: [{ "columnName": "日期类型", "filterType": "=", "values": ["近七日"] },{"columnName":"时段","filterType":"=","values":["本时段"]},{"columnName":"显示","filterType":"=","values":["全量"]}],
        4: [{ "columnName": "日期类型", "filterType": "=", "values": ["近十四日"] },{"columnName":"时段","filterType":"=","values":["本时段"]},{"columnName":"显示","filterType":"=","values":["全量"]}],
        5: [{ "columnName": "日期类型", "filterType": "=", "values": ["近三十日"] },{"columnName":"时段","filterType":"=","values":["本时段"]},{"columnName":"显示","filterType":"=","values":["全量"]}]        
    }, 
    timeQueryLast: {
        1: [{ "columnName": "日期类型", "filterType": "=", "values": ["今日"] },{"columnName":"时段","filterType":"=","values":["上一时段"]},{"columnName":"显示","filterType":"=","values":["全量"]}],
        2: [{ "columnName": "日期类型", "filterType": "=", "values": ["昨日"] },{"columnName":"时段","filterType":"=","values":["上一时段"]},{"columnName":"显示","filterType":"=","values":["全量"]}],
        3: [{ "columnName": "日期类型", "filterType": "=", "values": ["近七日"] },{"columnName":"时段","filterType":"=","values":["上一时段"]},{"columnName":"显示","filterType":"=","values":["全量"]}],
        4: [{ "columnName": "日期类型", "filterType": "=", "values": ["近十四日"] },{"columnName":"时段","filterType":"=","values":["上一时段"]},{"columnName":"显示","filterType":"=","values":["全量"]}],
        5: [{ "columnName": "日期类型", "filterType": "=", "values": ["近三十日"] },{"columnName":"时段","filterType":"=","values":["上一时段"]},{"columnName":"显示","filterType":"=","values":["全量"]}]        
    },     
    deviceQuery: {
        1: null,
        2: { "columnName": "系统", "filterType": "=", "values": ["android"] },
        3: { "columnName": "系统", "filterType": "=", "values": ["ios"] },
        4: { "columnName": "系统", "filterType": "=", "values": ["wechat"] }
    },
    channelQuery: {
        '汇总': null,
        '今日头条': { "columnName": "渠道", "filterType": "=", "values": ["今日头条"] },
        '快手': { "columnName": "渠道", "filterType": "=", "values": ["快手"] },
        '广点通': { "columnName": "渠道", "filterType": "=", "values": ["广点通"] },
    }    
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
    formatDate (dateTime, fmt = 'YYYY年M月DD日 HH:mm:ss') {
      if (!dateTime) {
        return ''
      }
      moment.locale('zh-CN')
      dateTime = moment(dateTime).format(fmt)
      return dateTime
    },
    objectParser(obj, value, trans) {
      Object.keys(obj).forEach(e => {
        void(value? (()=>{obj[e][value] = trans})(): (()=>{obj[e] = 
          // JSON.parse(JSON.stringify(trans))})())
          this.$_.cloneDeep(trans)})())
      })
    },
    parseDate (date) {
      if (!date) return null
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    channelQuerys (channel) {
      return channel.length === 0 || channel.filter(e => e==='汇总').length === 1 ? null : { "columnName": "渠道", "filterType": "=", "values": channel }
    },
    previousOp (idName) {
      this.queryPrevious(this.queryObj[idName], idName)
    },
    creatCharts (idName) {
      // 图表初始化
        // let filter= [{"columnName":"日期","filterType":"=","values":["2019-08-22"]}]
      // let timeFilter = obj.curTime ? timeQuery[obj.curTime] : { "columnName": "日期", "filterType": "[a,b]", "values": [obj.date, obj.date2] }
      // sql参数初始化
      this.sql[idName] = { "rows": [{ "columnName": "日期", "filterType": "eq", "values": [], "id": "351df1bb-5117-44a4-89af-c48eb1907426" }], "columns": [], "filters": [], "values": this.sqlOption[idName].values }
      this.queryObj[idName] = {
        curTime: 1,
        curChannel: ['汇总'],
        curDevice: 1,
        displayOrder: null,
        idName : idName,
        renderType: null      
      }
      this.sql[idName].filters = this.$_.cloneDeep(this.timeQuery[this.queryObj[idName].curTime])
      // JSON.parse(JSON.stringify(this.timeQuery[this.queryObj[idName].curTime]))
      void(this.deviceQuery[this.queryObj[idName].curDevice] ? this.sql[idName].filters.push(this.deviceQuery[this.queryObj[idName].curDevice]) : '')
      void(this.queryObj[idName].curChannel.filter(e => e==='汇总').length === 0 ? this.sql[idName].filters.push(this.channelQuerys(this.queryObj[idName].curChannel)) : '')
      let formData = new FormData()
      formData.append("datasetId", this.sqlOption[idName].datasetId);
      formData.append("cfg", JSON.stringify(this.sql[idName]));
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
        // '设备首单客单价（限当日激活）'文案调整
        this.headers[1].text = '设备首单客单价（限当日激活）'
        this.desserts = this.getData.data.map((e, i) => {
          let content = {}
          e.forEach((item, indx) => {
            content[`column_${indx}`] = item
          })
          return content
        })
        store.commit('SET_PAGE_LOADED', true)
        this.initChart(idName, this.getData, this.headers)
      })      
    },
    queryPrevious (obj, idName) {
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
      let sbObj = this.$_.cloneDeep(obj)
      // JSON.parse(JSON.stringify(obj))
      sbObj.renderType = 'previous'
      sbObj.idName = idName
      this.renderQuery(sbObj)
      // [{"columnName":"日期","filterType":"[a,b]","values":["{now('M', -1, 'yyyy-MM-dd')}","{now('W', -1, 'yyyy-MM-dd')}"]}]
      // "filters":}
    },    
    queryData (obj, chking) {
      console.log(obj.curChannel.filter(e => e==='汇总').length)
      let parseObj = obj
      parseObj.idName = ''
      // obj.idName = 'chartAlpha'
      this.objectParser(this.queryObj,null,obj)
      if (!chking) {
        this.displayPrevious.chartAlpha = null 
        this.displayPrevious.chartBeta = null 
        // this.displayPreviousLast = null 
      }
      // let filter= [{"columnName":"日期","filterType":"=","values":["{now('W', -1, 'yyyy-MM-dd')}"]}]
      // let filter= [{"columnName":"日期","filterType":"=","values":["2019-08-22"]}]
      this.showLast = obj.curTime ? true : false
      let timeFilter = obj.curTime 
      // ? JSON.parse(JSON.stringify(this.timeQuery[obj.curTime])) 
      ? this.$_.cloneDeep(this.timeQuery[obj.curTime])
      : [{ "columnName": "日期类型", "filterType": "[a,b]", "values": [obj.date, obj.date2] },{"columnName":"显示","filterType":"=","values":["全量"]}]
      // timeFilter = [timeFilter]
      void(this.deviceQuery[obj.curDevice] ? timeFilter.push(this.deviceQuery[obj.curDevice]) : '')
      void(obj.curChannel.filter(e => e==='汇总').length === 0 ? timeFilter.push(this.channelQuerys(obj.curChannel)) : '')
      this.objectParser(this.sql,'filters',timeFilter)
      Object.keys(this.queryObj).forEach(e => {
        // let newObj = JSON.parse(JSON.stringify(parseObj))
        let newObj = this.$_.cloneDeep(parseObj)
        newObj.idName = e
        this.renderQuery(newObj)
      })
    },
    reloadChart (option,type,opSwitch,renderData,timeArea) {
        // 日期前端筛选
        let timePeriod = this.splitTimeArea(timeArea)
        if (!type) {
          this.chartOption[option.idName].legend.data = [this.headers[1].text]
          let showTimes = []
           switch(option.timeType) {
            case 1:
            showTimes = this.splitOneDay().map(e=>this.formatDate(e, 'YYYY-MM-DD HH:mm:ss'))
            break;
            case 2:
            showTimes = this.splitYesterday().map(e=>this.formatDate(e, 'YYYY-MM-DD HH:mm:ss'))
            break;
            case 3:
            showTimes = this.splitOneWeek().map(e=>this.formatDate(e, 'YYYY-MM-DD'))
            break;
            case 4:
            showTimes = this.splitHalfMonth().map(e=>this.formatDate(e, 'YYYY-MM-DD'))
            break;
            case 5:
            showTimes = this.splitOneMonth().map(e=>this.formatDate(e, 'YYYY-MM-DD'))
            break;
          }
          let times = (option.timeType == '1'||option.timeType == '2') ? showTimes.map(e=>e.split(" ")[1]) : showTimes
          // this.chartOption[option.idName].xAxis.data = ((option.timeType == '1'||option.timeType == '2') ? option.times.map(e=>e.split(" ")[1]) : option.times)
          this.chartOption[option.idName].xAxis.data = ((option.timeType != null) 
            ? times 
            // : option.times
            : timePeriod.map(e=>this.formatDate(e, (timeArea[0] === timeArea[1] ? 'HH:mm:ss' : 'YYYY-MM-DD')))
            )
          let showData = option.timeType == null 
          ? this.generateTimeData(timePeriod.map(e=>this.formatDate(e, 'YYYY-MM-DD')), renderData) 
          : this.generateTimeData(showTimes, renderData)          
          var lineY = [{
            name: this.headers[1].text,
            type: 'line',
            smooth: true,
            color: '#1e88e5',
            symbol: 'circle',
            symbolSize: 5,
            showAllSymbol : true,
            data: option.idName == 'chartAlpha' 
            ? showData 
            : showData.map(e => Number(e).toFixed(2))            
          //   data: option.idName == 'chartAlpha' 
          // ? option.values 
          // : option.values.map(e => Number(e).toFixed(2))
          }]
          // this.chartOption.series[0].data = option.values
          this.chartOption[option.idName].series = lineY
        }
        else if (type === 'previous'){
          this.chartOption[option.idName].legend.data.push('上一时段')
          let showTimes = []
           switch(option.timeType) {
            case 1:
            showTimes = this.splitYesterday().map(e=>this.formatDate(e, 'YYYY-MM-DD HH:mm:ss'))
            break;
            case 2:
            showTimes = this.splitYesterdayPre().map(e=>this.formatDate(e, 'YYYY-MM-DD HH:mm:ss'))
            break;
            case 3:
            showTimes = this.splitOneWeekPre().map(e=>this.formatDate(e, 'YYYY-MM-DD'))
            break;
            case 4:
            showTimes = this.splitHalfMonthPre().map(e=>this.formatDate(e, 'YYYY-MM-DD'))
            break;
            case 5:
            showTimes = this.splitOneMonthPre().map(e=>this.formatDate(e, 'YYYY-MM-DD'))
            break;
          }
          let times = (option.timeType == '1' || option.timeType == '2') ? showTimes.map(e=>e.split(" ")[1]) : showTimes              
          // this.chartOption[option.idName].xAxis.data = [...option.times, ...this.chartOption[option.idName].xAxis.data]
          // let judgeXAxis = this.chartOption[option.idName].xAxis.data.map((e, index)=>{
          //   return e + ((option.times[index] && option.timeType != '1' && option.timeType != '2') ? ('/' + option.times[index]) : '')
          // })
          let judgeXAxis = this.chartOption[option.idName].xAxis.data.map((e, index)=>{
            return e + ((times[index] && option.timeType != '1' && option.timeType != '2') ? ('/' + times[index]) : '')
          })          
          // this.chartOption[option.idName].xAxis.data = this.chartOption[option.idName].xAxis.data
          this.chartOption[option.idName].xAxis.data = judgeXAxis
          let newY = this.$_.cloneDeep(this.chartOption[option.idName].series[0])
          // JSON.parse(JSON.stringify(this.chartOption[option.idName].series[0]))
          newY.color= '#26c6da'
          newY.name= '上一时段'
          // newY.data = option.values.map(e=>(e - Math.random()*140+''))
          // newY.data = option.idName == 'chartAlpha' 
          // ? option.values 
          // : option.values.map(e => Number(e).toFixed(2))
          newY.data = option.idName == 'chartAlpha' 
          ? this.generateTimeData(showTimes, renderData) 
          : this.generateTimeData(showTimes, renderData).map(e => Number(e).toFixed(2))
          // console.log(option.values.length)
          // let backup = []
          // for(var i=0;i<newY.data.length;i++){
          //   backup.push('-')
          // }
          // newY.data = [...newY.data]
          // this.chartOption[option.idName].tooltip = {

          // }
          // let preY = this.chartOption[option.idName].series[0]
          // preY.data = [...backup, ...preY.data]
          // this.chartOption[option.idName].series = [newY,preY]
          this.chartOption[option.idName].series.push(newY)                    
        }        
        else {
          let showTimes = []
          if (type === 'pWarning') {
             switch(option.timeType) {
              case 1:
              showTimes = this.splitYesterday().map(e=>this.formatDate(e, 'YYYY-MM-DD HH:mm:ss'))
              break;
              case 2:
              showTimes = this.splitYesterdayPre().map(e=>this.formatDate(e, 'YYYY-MM-DD HH:mm:ss'))
              break;
              case 3:
              showTimes = this.splitOneWeekPre().map(e=>this.formatDate(e, 'YYYY-MM-DD'))
              break;
              case 4:
              showTimes = this.splitHalfMonthPre().map(e=>this.formatDate(e, 'YYYY-MM-DD'))
              break;
              case 5:
              showTimes = this.splitOneMonthPre().map(e=>this.formatDate(e, 'YYYY-MM-DD'))
              break;
            }
           }
          else {
             switch(option.timeType) {
              case 1:
              showTimes = this.splitOneDay().map(e=>this.formatDate(e, 'YYYY-MM-DD HH:mm:ss'))
              break;
              case 2:
              showTimes = this.splitYesterday().map(e=>this.formatDate(e, 'YYYY-MM-DD HH:mm:ss'))
              break;
              case 3:
              showTimes = this.splitOneWeek().map(e=>this.formatDate(e, 'YYYY-MM-DD'))
              break;
              case 4:
              showTimes = this.splitHalfMonth().map(e=>this.formatDate(e, 'YYYY-MM-DD'))
              break;
              case 5:
              showTimes = this.splitOneMonth().map(e=>this.formatDate(e, 'YYYY-MM-DD'))
              break;
            }     
          }
          this.chartOption[option.idName].legend.data.push(type === 'pWarning' ? '上一时段风险订单':'风险订单')
          let newY = this.$_.cloneDeep(this.chartOption[option.idName].series[0])
          // JSON.parse(JSON.stringify(this.chartOption[option.idName].series[0]))
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
          newY.name = type === 'pWarning' ? '上一时段风险订单' : '风险订单'
          // newY.data = option.idName == 'chartAlpha' 
          // ? option.values 
          // : option.values.map(e => Number(e).toFixed(2))
          newY.data = option.idName == 'chartAlpha' 
          ? this.generateTimeData(showTimes, renderData) 
          : this.generateTimeData(timePeriod.map(e=>this.formatDate(e, 'YYYY-MM-DD')), renderData)          
          // newY.data = option.values.map(e=>(e/4+''))
          this.chartOption[option.idName].series.push(newY)
          // this.chartOption.xAxis.data = option.times
        }

        // Object.keys(this.myChart).forEach(e => {
          // data: idName == 'chartAlpha' ? values : values.map(e => Number(e).toFixed(2))
          this.myChart[option.idName].setOption(this.chartOption[option.idName], true)      
        // })        
        // this.myChart[0].setOption(this.chartOption[option.idName], true)      
    },
    renderQuery (obj) {
      let formData = new FormData()
      formData.append("datasetId", this.sqlOption[obj.idName].datasetId);
      formData.append("cfg", JSON.stringify(this.sql[obj.idName]));
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
        // '设备首单客单价（限当日激活）'文案调整
        this.headers[1].text = '设备首单客单价（限当日激活）'
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
          timeType :obj.curTime,
          idName: obj.idName,
          times,
          values
        }
        this.reloadChart(option,'', obj.displayOrder, this.getData, [obj.date, obj.date2])
        // let preObj = JSON.parse(JSON.stringify(obj))
        // let disObj = JSON.parse(JSON.stringify(obj))
        // let pWobj = JSON.parse(JSON.stringify(obj))
        let preObj = this.$_.cloneDeep(obj)
        let disObj = this.$_.cloneDeep(obj)
        let pWobj = this.$_.cloneDeep(obj)
        // 预警图表，上一时段图表以及上一时段预警图表显示逻辑
        store.commit('SET_PAGE_LOADED', true)
        void(this.queryObj[obj.idName].displayOrder!==null? (()=>{preObj.renderType = 'warning';this.judgeQuery(preObj)})() : '')
        // Object.keys(this.displayPrevious).forEach(previous => {
          void(this.displayPrevious[obj.idName]!==null? (()=>{disObj.renderType = 'previous';this.judgeQuery(disObj)})() : '')
          void(this.displayPrevious[obj.idName]!==null && this.queryObj[obj.idName].displayOrder!==null? (()=>{pWobj.renderType = 'pWarning';this.judgeQuery(pWobj)})() : '')
        // })        
        // void(this.displayPrevious!==null? (()=>{disObj.renderType = 'previous';this.judgeQuery(disObj)})() : '')
        // void(this.displayPrevious!==null && this.queryObj[obj.idName].displayOrder!==null? (()=>{pWobj.renderType = 'pWarning';this.judgeQuery(pWobj)})() : '')
      })
    },
    judgeQuery (obj) {
      console.log(obj.renderType === 'previous' && this.displayPrevious[obj.idName]==1 )
      this.showLast = obj.curTime ? true : false
      let timeFilter = obj.curTime 
      // ? JSON.parse(JSON.stringify(this.timeQuery[obj.curTime])) 
      ? this.$_.cloneDeep(this.timeQuery[obj.curTime])
      : [{ "columnName": "日期类型", "filterType": "[a,b]", "values": [obj.date, obj.date2] },{"columnName":"显示","filterType":"=","values":["全量"]}]
      // timeFilter = [timeFilter]
      // 上一时段条件
      void (obj.renderType === 'previous' && this.displayPrevious[obj.idName] === '1' 
        // ? timeFilter = JSON.parse(JSON.stringify(this.timeQueryLast[obj.curTime])) 
        ? timeFilter = this.$_.cloneDeep(this.timeQueryLast[obj.curTime])
        : '')
      // 上一时段风险设备条件      
      void (obj.renderType === 'pWarning' && this.displayPrevious[obj.idName] === '1' && obj.displayOrder === '1' ? (() => {
          // timeFilter = JSON.parse(JSON.stringify(this.timeQueryLast[obj.curTime]))
          timeFilter = this.$_.cloneDeep(this.timeQueryLast[obj.curTime])
          // timeFilter.push({ "columnName": "显示", "filterType": "=", "values": "异常" })
          timeFilter[this.$_.findIndex(timeFilter, e=>e.columnName == '显示')].values='异常'
      })() : '')
      // 风险设备条件
      // void (obj.renderType === 'warning' && obj.displayOrder === '1' ? timeFilter.push({ "columnName": "显示", "filterType": "=", "values": "异常" }) : '')
      // console.log(timeFilter)
      // console.log(this.$_.findIndex(timeFilter, e=>e.columnName == '显示'))
      void (obj.renderType === 'warning' && obj.displayOrder === '1' ? timeFilter[this.$_.findIndex(timeFilter, e=>e.columnName == '显示')].values='异常' : '')
      // 系统条件
      // void (this.deviceQuery[obj.curDevice] ? timeFilter.push(this.deviceQuery[obj.curDevice]) : '')
      // 系统条件
      void (obj.curChannel.filter(e => e==='汇总').length === 0 ? timeFilter.push(this.channelQuerys(obj.curChannel)) : '')
      // let curSql = JSON.parse(JSON.stringify(this.sql))
      let curSql = this.$_.cloneDeep(this.sql)
      console.log(timeFilter)
      curSql[obj.idName].filters = timeFilter
      let formData = new FormData()
      formData.append("datasetId", this.sqlOption[obj.idName].datasetId);
      formData.append("cfg", JSON.stringify(curSql[obj.idName]));
      formData.append("reload", false);
      dbDemo(formData).then(res => {
        this.getData = res
        this.headers = this.getData.columnList.map((e) => {
          return {
            text: e.name,
            value: `column_${e.index}`
          }
        })
        // '设备首单客单价（限当日激活）'文案调整
        this.headers[1].text = '设备首单客单价（限当日激活）'
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
          timeType :obj.curTime,
          idName: obj.idName,
          times,
          values
        }
        this.reloadChart(option, obj.renderType, obj.displayOrder, this.getData, [obj.date, obj.date2])
        store.commit('SET_PAGE_LOADED', true)
      })
    },    
    initChart (idName, getData, getHeaders) {
      // let timeList = this.splitOneDay()
      // timeList = timeList.map(e=>this.formatDate(e, 'YYYY-MM-DD HH:mm:ss'))
      // let valList = timeList.map(e => [e, null])
      // let times = timeList
      // var judgeList = this.getData.data
      // valList = valList.map(e=> {
      //   let flag = judgeList.map(i=>i[0]).indexOf(e[0])
      //   return (flag !=-1 && parseInt(judgeList[flag][1]) != 0) ? judgeList[flag][1] : e[1]
      // })
      // let values = valList
      // values = values.map(e=> e > 0 ? e : null)
      let times = this.splitOneDay().map(e=>this.formatDate(e, 'YYYY-MM-DD HH:mm:ss'))
      let values = this.generateTimeData(times, getData)
      // let times = this.getData.data.map(e => e[0])
      // let values = this.getData.data.map(e =>e[1])
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
        showAllSymbol : true,
        // connectNulls: true,
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
        data: idName == 'chartAlpha' ? values : values.map(e => Number(e).toFixed(2))
      }]
      let option = {
        title: {
          text: idName == 'chartAlpha' ? '当日首单（限当日激活）':'设备首单客单价（限当日激活）',
          textStyle: {
            color : '#1e88e5',
            fontSize:16
          },
          left: '120'
        },
        backgroundColor: '#fff',
        tooltip: {
            trigger: 'axis',
            // borderColor: '#fff',
            // formatter : function(params) {
            //   return params[0].name +'</br>'+params[0].marker + params[0].seriesName+':'+params[0].data
            // } 
        },
        legend: {
          data: charts.names,
          type: 'scroll',
          orient: 'vertical',
          textStyle: {
            fontSize: 12,
            color: '#1e88e5'
          },
          right: '4%'
        },
        grid: {
          top: '14%',
          left: '4%',
          right: '6%',
          bottom: '12%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // data: charts.lineX,
          data: (this.queryObj[idName].curTime == '1'||this.queryObj[idName].curTime == '2') ? charts.lineX.map(e=>e.split(" ")[1]) : charts.lineX,
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
      this.chartOption[idName] = option
      this.myChart[idName] = this.createEcharts(idName, option)
      // this.myChart.push(this.createEcharts(idName, option))
      // this.myChart.push(this.createEcharts('chartBeta', option))
    }
  },
  mounted() {
    this.creatCharts('chartAlpha')
    this.creatCharts('chartBeta')
    window.onresize = () =>{
      this.myChart['chartAlpha'].resize()
      this.myChart['chartBeta'].resize()
    }
    // this.renderEcharts('main', option);
  },
  created() {

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
      height:30px;
      top:-22px;
      z-index:1;
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
    .v-menu__content {
      .v-list__tile.primary--text {
      caret-color:#1e88e5!important;
      color:#1e88e5!important;
    }
    .v-icon{
      font-size:24px;
    }
    .v-icon.primary--text{
       caret-color:#1e88e5!important;
       color:#1e88e5!important; 
    }
    }
  }
</style>
