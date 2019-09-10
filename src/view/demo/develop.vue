<template>
  <v-app id="devPanel">
    <blockedArea style='height:100%;' :loadingState='loading'></blockedArea>
    <div id='pieChart' :style="{height:'90%',width:'100%'}" v-if='curChart=="pieChart"'></div>
    <div id='lineChart' :style="{height:'90%',width:'100%'}" v-if='curChart=="lineChart"'></div>
    <div id='barChart' :style="{height:'90%',width:'100%'}" v-if='curChart=="barChart"'></div>
    <div id='bubbleChart' :style="{height:'90%',width:'100%'}" v-if='curChart=="bubbleChart"'></div>
    <div id='tableData' :style="{height:'90%',width:'100%'}" v-if='curChart=="tableData"'>
     <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="elevation-1"
      >
        <template v-slot:items="props">
          <td v-for='item in headers' class="text-xs-left">{{ props.item[item.value] }}</td>
        </template>
      </v-data-table>
    </div>
    <v-card height="56px">
      <v-bottom-nav :active.sync="bottomNav" :color="color" :value="true" absolute dark shift>
        <v-btn dark @click='reRender("pieChart")' :loading='curChart=="pieChart"&&loading' :disabled="loading">
          <span>pie</span>
          <v-icon>mdi-chart-arc</v-icon>
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>
          </template>
        </v-btn>
        <v-btn dark @click='reRender("lineChart")' :loading='curChart=="lineChart"&&loading' :disabled="loading">
          <span>line</span>
          <v-icon>mdi-chart-line</v-icon>
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>
          </template>
        </v-btn>
        <v-btn dark @click='reRender("barChart")' :loading='curChart=="barChart"&&loading' :disabled="loading">
          <span>bar</span>
          <v-icon>mdi-chart-bar</v-icon>
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>
          </template>
        </v-btn>
        <v-btn dark @click='reRender("bubbleChart")' :loading='curChart=="bubbleChart"&&loading' :disabled="loading">
          <span>bubble</span>
          <v-icon>mdi-chart-bubble</v-icon>
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>
          </template>
        </v-btn>
        <v-btn dark @click='reRender("tableData")' :loading='curChart=="tableData"&&loading' :disabled="loading">
          <span>bubble</span>
          <v-icon>mdi-folder</v-icon>
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>
          </template>
        </v-btn>        
      </v-bottom-nav>
    </v-card>
  </v-app>
</template>
<script>
  import pieChart from '../../components/charts/chartPie'
  import blockedArea from '../../components/blockedArea'
  import chartData from '../../mock/chartData';
  import store from 'store';
  import {postDemo,sqlDemo,dbDemo} from '../../api';
  import { mapGetters } from 'vuex'
  var echarts = require('echarts');
export default {
  data() {
    return {
      bottomNav: 0,
      showNav: true,
      curChart:'pieChart',
      chartObj:null,
      PanelHeight:0,
      curSide:null,
      loading:false,
      headers:null,
      desserts:null,
      getData:null
    }
  },
  created(){
    this.PanelHeight = document.getElementById("app").offsetHeight;
    console.log(this.sideShow)
    this.curSide=this.sideShow;
    postDemo().then(res=>{
      // let numArr=res.rows[0].values;
      // console.log(this.$_.sum(this.$_.map(numArr,(e,i)=>e[0])))
      // this.$_.sumBy(res.rows[0].values),(arr)=>arr[0]
      // console.log(this.$_.sumBy(res.rows[0].values),(arr)=>arr[0])
    })
    let sql = {"rows":[{"columnName":"日期","filterType":"eq","values":[],"id":"ecbbd4df-4f8e-42ac-86b7-36a1d72c6d61"},{"columnName":"页面名称","filterType":"eq","values":[],"id":"c4b0e7a6-43b7-4398-a59c-714cd23c9520"},{"columnName":"页面访问次数","filterType":"eq","values":[],"id":"c6049740-d0cd-4883-94fb-0885b4b83d72"},{"columnName":"人均页面访问时长","filterType":"eq","values":[],"id":"4102a3cc-187b-4ab0-8960-a8b265ee132f"},{"columnName":"次均页面访问时长","filterType":"eq","values":[],"id":"ee7f78be-ee4b-4566-b8bf-24317629fc82"},{"columnName":"跳出率","filterType":"eq","values":[],"id":"97c06c8b-ab34-4730-b996-9ab73dedff94"}],"columns":[],"filters":[{"columnName":"日期","filterType":"eq","values":[],"id":"ecbbd4df-4f8e-42ac-86b7-36a1d72c6d61"}],"values":[]}
    
    // let sql = {"rows":[{"columnName":"日期","filterType":"eq","values":[]},{"columnName":"累计付费用户","filterType":"eq","values":[]},{"columnName":"累计注册用户","filterType":"eq","values":[]},{"columnName":"订单","filterType":"eq","values":[]},{"columnName":"销售","filterType":"eq","values":[]},{"columnName":"uv","filterType":"eq","values":[]},{"columnName":"客单价","filterType":"eq","values":[]},{"columnName":"新客转化","filterType":"eq","values":[]},{"columnName":"总转化","filterType":"eq","values":[]},{"columnName":"已付费老客转化","filterType":"eq","values":[]},{"columnName":"未付费老客转化","filterType":"eq","values":[]},{"columnName":"当天收藏商品数","filterType":"eq","values":[]},{"columnName":"收藏用户数","filterType":"eq","values":[]},{"columnName":"收藏用户数占比","filterType":"eq","values":[]},{"columnName":"收藏商品当天转化率","filterType":"eq","values":[]},{"columnName":"日均下单次数","filterType":"eq","values":[]},{"columnName":"新增付费用户","filterType":"eq","values":[]},{"columnName":"当天付费用户总数","filterType":"eq","values":[]},{"columnName":"次日复购","filterType":"eq","values":[]},{"columnName":"30日复购率","filterType":"eq","values":[]},{"columnName":"次日复购率","filterType":"eq","values":[]},{"columnName":"新增注册","filterType":"eq","values":[]},{"columnName":"7日复购","filterType":"eq","values":[]},{"columnName":"7日复购率","filterType":"eq","values":[]},{"columnName":"15日复购","filterType":"eq","values":[]},{"columnName":"15日复购率","filterType":"eq","values":[]},{"columnName":"30日复购","filterType":"eq","values":[]},{"columnName":"新增激活","filterType":"eq","values":[]},{"columnName":"新增付费","filterType":"eq","values":[]},{"columnName":"付费转化率","filterType":"eq","values":[]},{"columnName":"当天注册当天付费","filterType":"eq","values":[]},{"columnName":"当天付费转化率","filterType":"eq","values":[]}],"columns":[],"filters":[],"values":[]};
    let formData = new FormData()
    let data = {
      datasetId: 147,
      cfg: JSON.stringify(sql),
      reload: false
    }
    formData.append("datasetId", 147);
    formData.append("cfg", JSON.stringify(sql));
    formData.append("reload", false);
    dbDemo(formData).then(res => {
      this.getData = res
      this.headers = this.getData.columnList.map((e) => {return {
        text:e.name,
        value: `column_${e.index}`
        }
      }
      )
      this.desserts = this.getData.data.map((e,i) => {
        let content = {}
        e.forEach((item, indx) => {
          content[ `column_${indx}`] = item
        })
        return content
      })
      console.log(this.headers)
      console.log(this.desserts)
    })
  },
  components: { pieChart,blockedArea},
  computed:{
      sideShow(){
        return store.getters.sideShow;
      },modeChange(){
        return store.getters.mode;
      },
      color () {
      switch (this.bottomNav) {
        case 0: return '#26c6da'
        case 1: return '#99abb4'
        case 2: return '#7460ee'
        case 3: return '#1e88e5'
      }
    }
  },
  watch:{
    sideShow(val){
      // setTimeout(()=>{
      this.reRender(this.curChart)
      // },1000);
      // console.log(this.curChart)
    },modeChange(val){
      this.reRender(this.curChart)
    }
  },
  mounted(){
    this.reRender("pieChart")
  },
  methods:{
    reRender(type){
  this.loading=true;

// setInterval(() => {
//     myChart.setOption({
//       legend: {
//         selected: {
//           '出口': false,
//           '入口': false
//         }
//       }
//     })
//     myChart.setOption({
//       legend: {
//         selected: {
//           '出口': true,
//           '入口': true
//         }
//       }
//     })
// },10000)
    let chatObj={
      pieChart:chartData.pieOption,
      lineChart:chartData.lineOption,
      barChart:chartData.barOption,
      bubbleChart:chartData.bubbleOption
    }
    console.log(chartData.lineOption)
    this.curChart=type;
    chatObj[type]&&type!=='tableData'?(()=>{
    this.chartObj?this.chartObj.clear():this.chartObj=echarts.init(document.getElementById(type));  
    setTimeout(()=>{this.chartObj.resize();this.renderEcharts(this.chartObj,chatObj[type]);this.loading=false;},500)
    })():(()=>{this.chartObj.clear();this.loading=false})()
    }
  }
}

</script>
<style type="text/scss" lang="scss">
  @import "src/styles/component.scss";
  #devPanel{
    height:100%;
  .application--wrap{
    background:#fff;
    display: flex;
    justify-content: space-between!important;
}
  .v-card{
    @include attachedOut
    .v-item-group{
      @include attachedIn
    }
  }
    .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .application--wrap{
    position:relative;
    min-height:auto!important;
    margin-top:0px;
  }
}
</style>
