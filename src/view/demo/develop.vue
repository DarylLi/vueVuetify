<template>
  <v-app id="devPanel">
    <blockedArea style='height:100%;' :loadingState='loading'></blockedArea>
    <div id='pieChart' :style="{height:'90%',width:'100%'}" v-if='curChart=="pieChart"'></div>
    <div id='lineChart' :style="{height:'90%',width:'100%'}" v-if='curChart=="lineChart"'></div>
    <div id='barChart' :style="{height:'90%',width:'100%'}" v-if='curChart=="barChart"'></div>
    <div id='bubbleChart' :style="{height:'90%',width:'100%'}" v-if='curChart=="bubbleChart"'></div>
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
      </v-bottom-nav>
    </v-card>
  </v-app>
</template>
<script>
  import pieChart from '../../components/charts/chartPie'
  import blockedArea from '../../components/blockedArea'
  import chartData from '../../mock/chartData';
  import store from 'store';
  import {postDemo,sqlDemo} from '../../api';
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
      loading:false
    }
  },created(){
    this.PanelHeight = document.getElementById("app").offsetHeight;
    console.log(this.sideShow)
    this.curSide=this.sideShow;
    postDemo().then(res=>{
      // let numArr=res.rows[0].values;
      // console.log(this.$_.sum(this.$_.map(numArr,(e,i)=>e[0])))
      // this.$_.sumBy(res.rows[0].values),(arr)=>arr[0]
      // console.log(this.$_.sumBy(res.rows[0].values),(arr)=>arr[0])
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
    chatObj[type]?(()=>{
    this.curChart=type;
    this.chartObj?this.chartObj.clear():this.chartObj=echarts.init(document.getElementById(type));  
    setTimeout(()=>{this.chartObj.resize();this.renderEcharts(this.chartObj,chatObj[type]);this.loading=false;},500)
    })():""
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
