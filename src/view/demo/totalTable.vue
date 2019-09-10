<template>
  <v-app id="inspire" class="dataTableContent">
  <a v-if='downloadUrl' ref='downloadLink' :href="downloadUrl" :download='fileName'></a>
  <operationPanel @queryData='queryData' opHeader='汇总展示数据'></operationPanel>
    <v-btn class="exportOp" @click='exportCSV'>
      <span>
        导出数据
      </span>
    </v-btn>
    <v-data-table no-data-text='' :loading="dataLoaded" :headers="headers" :items="desserts" :pagination.sync
='paginationOp' :rows-per-page-items="[10,25]" class="elevation-1">
      <!-- <template v-slot:headers="props">
      <v-tooltip top>
      <template v-slot:activator="{ on }">
        <tr>
          <th v-for="header in props.headers" :key="header.text"  v-on="on">
            {{ header.text }}
          </th>
        </tr>
      </template>
      <span>Tooltip</span>
      </v-tooltip>
      </template> -->
      <template v-slot:items="props">
        <!-- <td v-for='item in headers' :class="{'text-xs-left':true,'large_td':item.value=='column_0'}">{{ props.item[item.value] }}</td> -->
        <td v-for='item in headers' :class="{'text-xs-left':true,'large_td':item.value=='column_0'}">{{ !props.item[item.value]? (()=>{return props.item['column_3']==='ios' ? 'App Store' : 'taojiji'})():props.item[item.value] }}</td>
      </template>
      <!-- <template v-slot:footer>
        <td v-for='num in total' style="text-align:left">
          <strong>{{num}}</strong>
        </td>
    </template> -->
    </v-data-table>
    <!-- <v-data-table :headers="headers" :items="desserts" :pagination.sync="pagination" :total-items="totalDesserts" :loading="loading" class="elevation-1">
        <template v-slot:items="props">
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.calories }}</td>
          <td class="text-xs-left">{{ props.item.fat }}</td>
          <td class="text-xs-left">{{ props.item.carbs }}</td>
          <td class="text-xs-left">{{ props.item.protein }}</td>
          <td class="text-xs-left">{{ props.item.iron }}</td>
        </template>
      </v-data-table> -->
  </v-app>
</template>
<script>
import {postDemo,sqlDemo,dbDemo,exportExcel} from '../../api'
import operationPanel from '../../components/operationPanel'
export default {
  data: vm => ({
      desserts: [],
      sql:'',
      downloadUrl:'',
      dataLoaded: false,
      pagination: {},
      headers: [],
      total: [],
      fileName: 'table.xls',
      timeQuery: {
          1: [{ "columnName": "日期类型", "filterType": "=", "values": ["今日"] },{"columnName":"显示","filterType":"=","values":["全量"]}],
          2: [{ "columnName": "日期类型", "filterType": "=", "values": ["昨日"] },{"columnName":"显示","filterType":"=","values":["全量"]}],
          3: [{ "columnName": "日期类型", "filterType": "=", "values": ["近七日"] },{"columnName":"显示","filterType":"=","values":["全量"]}],
          4: [{ "columnName": "日期类型", "filterType": "=", "values": ["近十四日"] },{"columnName":"显示","filterType":"=","values":["全量"]}],
          5: [{ "columnName": "日期类型", "filterType": "=", "values": ["近三十日"] },{"columnName":"显示","filterType":"=","values":["全量"]}]
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
      },            
      paginationOp:{
        descending: true,
        rowsPerPage: 10,
        sortBy: 'column_0'
      }
  }),
  components: { operationPanel },
  created() {
    // let sql = {"rows":[{"columnName":"日期","filterType":"eq","values":[],"id":"ecbbd4df-4f8e-42ac-86b7-36a1d72c6d61"},{"columnName":"页面名称","filterType":"eq","values":[],"id":"c4b0e7a6-43b7-4398-a59c-714cd23c9520"},{"columnName":"页面访问次数","filterType":"eq","values":[],"id":"c6049740-d0cd-4883-94fb-0885b4b83d72"},{"columnName":"人均页面访问时长","filterType":"eq","values":[],"id":"4102a3cc-187b-4ab0-8960-a8b265ee132f"},{"columnName":"次均页面访问时长","filterType":"eq","values":[],"id":"ee7f78be-ee4b-4566-b8bf-24317629fc82"},{"columnName":"跳出率","filterType":"eq","values":[],"id":"97c06c8b-ab34-4730-b996-9ab73dedff94"}],"columns":[],"filters":[{"columnName":"日期","filterType":"eq","values":[],"id":"ecbbd4df-4f8e-42ac-86b7-36a1d72c6d61"}],"values":[]}
  let sql = 
    {"rows":[{"columnName":"日期","filterType":"eq","values":[]},{"columnName":"渠道","filterType":"eq","values":[]},{"columnName":"渠道链接","filterType":"eq","values":[]},{"columnName":"系统","filterType":"eq","values":[]},{"columnName":"当日激活设备","filterType":"eq","values":[]},{"columnName":"当日异常激活率","filterType":"eq","values":[]},{"columnName":"当日激活当日注册设备","filterType":"eq","values":[]},{"columnName":"当日注册转化率","filterType":"eq","values":[]},{"columnName":"当日订单转化设备数","filterType":"eq","values":[]},{"columnName":"当日订单设备转化率","filterType":"eq","values":[]},{"columnName":"当日首单用户数","filterType":"eq","values":[]},{"columnName":"当日首单用户总订单数","filterType":"eq","values":[]},{"columnName":"当日首单平均客单价","filterType":"eq","values":[]},{"columnName":"当日首单订单总销售额","filterType":"eq","values":[]}],"columns":[],"filters":[{"columnName":"日期类型","filterType":"=","values":["今日"]},{"columnName":"显示","filterType":"=","values":["全量"]}],"values":[]}
  // {"rows":[{"columnName":"日期","filterType":"eq","values":[],"id":"ecbbd4df-4f8e-42ac-86b7-36a1d72c6d61"},{"columnName":"页面名称","filterType":"eq","values":[],"id":"c4b0e7a6-43b7-4398-a59c-714cd23c9520"},{"columnName":"页面访问次数","filterType":"eq","values":[],"id":"c6049740-d0cd-4883-94fb-0885b4b83d72"},{"columnName":"人均页面访问时长","filterType":"eq","values":[],"id":"4102a3cc-187b-4ab0-8960-a8b265ee132f"},{"columnName":"次均页面访问时长","filterType":"eq","values":[],"id":"ee7f78be-ee4b-4566-b8bf-24317629fc82"},{"columnName":"跳出率","filterType":"eq","values":[],"id":"97c06c8b-ab34-4730-b996-9ab73dedff94"}],"columns":[],"filters":[{"columnName":"日期","filterType":"eq","values":[],"id":"ecbbd4df-4f8e-42ac-86b7-36a1d72c6d61"}],"values":[]}    
      this.sql = sql    
      this.renderTable()
  },
  mounted() {
    // console.log('2')
    // this.getDataFromApi()
    //   .then(data => {
    //     this.desserts = data.items
    //     this.totalDesserts = data.total
    //   })
  },
  methods: {
    renderTable() {
    let formData = new FormData()
    formData.append("datasetId", 178);
    formData.append("cfg", JSON.stringify(this.sql));
    formData.append("reload", false);
    this.dataLoaded = true
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
      this.dataLoaded = false
      this.total = this.$_.cloneDeep(this.desserts)[0]
      // let formData = new FormData()
      // formData.append('data', JSON.stringify({data: exportData, type: 'table'}));     
    })      
    },
    channelQuerys (channel) {
      return channel.length === 0 || channel.filter(e => e==='汇总').length === 1 ? null : { "columnName": "渠道", "filterType": "=", "values": channel }
    },    
    exportCSV(){
      let exportData='\ufeff'
      let curArr = []
      this.fileName = 'table.csv'
      this.headers.forEach((e,indx) => {
        curArr.push(e.text)
      })
      exportData += curArr.join(',')+'\n'
      this.getData.data.forEach(e => {
        let curArr = []
        e.forEach(f => {
          curArr.push(f)
        })
        exportData += curArr.join(',')+'\n'
      })
      var blob = new Blob([exportData], {type: "application/csv"});
      var objectUrl = URL.createObjectURL(blob);
      this.downloadUrl = objectUrl
      this.$nextTick(() => {
        this.$refs.downloadLink.click()
        this.downloadUrl = ''
      })          
    },
    exportExcel() {
        let exportData=[]
        this.fileName = 'table.xls'
        exportData.push(this.headers.map(e => {return {property: "header_key", column_header_header: true, data: e.text}}))
        this.getData.data.forEach(e => {
          let parseObj = []
          e.forEach(f => {
            parseObj.push({
              property: "column_key",
              data: f
              // rowSpan: "row"
            })
          })
          exportData.push(parseObj)
        })        
        // var xhr = new XMLHttpRequest()
        var formData = new FormData()
        formData.append('data', JSON.stringify({data: exportData, type: 'table'}))
        exportExcel(formData).then(res => {
            var blob = new Blob([res], {type: "application/vnd.ms-excel"})
            var objectUrl = URL.createObjectURL(blob);  
            this.downloadUrl = objectUrl
            this.$nextTick(() => {
              this.$refs.downloadLink.click()
              this.downloadUrl = ''
            })            
        })
        // xhr.open('POST', 'http://localhost:8086/cboard_war_exploded/dashboard/tableToxls.do')
        // xhr.responseType = 'arraybuffer';
        // let _vue = this
        // xhr.onload = function (e) {
        //     var blob = new Blob([this.response], {type: "application/vnd.ms-excel"})
        //     var objectUrl = URL.createObjectURL(blob);
        //     _vue.downloadUrl = objectUrl
        //     _vue.$nextTick(() => {
        //       _vue.$refs.downloadLink.click()
        //       _vue.downloadUrl = ''
        //     })
        // };
        // xhr.send(formData); 
    },
    queryData(obj) {
      // let filter= [{"columnName":"日期","filterType":"=","values":["{now('W', -1, 'yyyy-MM-dd')}"]}]
      // let filter= [{"columnName":"日期","filterType":"=","values":["2019-08-22"]}]
      let timeFilter = obj.curTime ? this.$_.cloneDeep(this.timeQuery[obj.curTime]) : [{"columnName":"日期类型","filterType":"[a,b]","values":[obj.date, obj.date2]},{"columnName":"显示","filterType":"=","values":["全量"]}]
      // void (obj.displayOrder === '1' ? timeFilter.push({ "columnName": "显示", "filterType": "=", "values": "剔除一元拼团" }) : '')
      console.log(timeFilter)
      void (obj.displayOrder === '1' ? timeFilter[this.$_.findIndex(timeFilter, e=>e.columnName == '显示')].values=['剔除一元拼团'] : '')
      // 系统条件
      void (this.deviceQuery[obj.curDevice] ? timeFilter.push(this.deviceQuery[obj.curDevice]) : '')
      // 系统条件
      void (obj.curChannel.filter(e => e==='汇总').length === 0 ? timeFilter.push(this.channelQuerys(obj.curChannel)) : '')      
      this.sql.filters = timeFilter
      this.renderTable()
      // [{"columnName":"日期","filterType":"[a,b]","values":["{now('M', -1, 'yyyy-MM-dd')}","{now('W', -1, 'yyyy-MM-dd')}"]}]
      // "filters":}
    }
  }
}

</script>
<style type="text/scss" lang="scss">
  .dataTableContent{
    .exportOp{
      position:absolute;
      top:200px;
      z-index:1;
      right:45px;
      color:#1e88e5;
      background-color:#fff!important;
      border:1px solid #1e88e5;
    }
    .exportOp.v-btn--active, .exportOp.v-btn:focus, .exportOp.v-btn:hover{
      position:absolute;
    }
  .large_td{
    width:160px;
    display:flex;
    align-items:center;
  }
  .v-progress-linear__background.primary{
    background-color:#1e88e5!important;
    border-color:#1e88e5!important;    
  }
  .v-progress-linear__bar__indeterminate.primary{
    background-color:#1e88e5!important;
    border-color:#1e88e5!important;
  }
  .v-table__overflow{
    max-height:500px;
    overflow-y:auto;
  }
  .v-datatable__actions{
    padding-bottom:10px;
    margin-bottom:0px;
  }
  @media only screen and (max-width: 1400px){
   .v-datatable__actions{
      padding-bottom:50px;
      margin-bottom:0px;
  } 
  }
}
.opPanel {
  padding-bottom:20px;
  background:#fff;
}
.selectArea {
  padding-top:10px;
  padding-bottom:10px;
  background:#fff;
  display:flex;
  justify-content:left;
  align-items:center;
  .title{
    margin-left:20px;
    font-size:14px!important;
    font-weight:bold;
  }
  .timeSelect,.deviceSelect{
    box-shadow:none;
    padding-left:20px;
    .v-btn {
      width:80px;
      height:28px;
      border:1px solid #ff6632;
      border-right-color:#ff6632!important;
      opacity:1;
      color:#ff6632!important;
      margin:0 10px;
      .v-btn__content{
        color:#ff6632
      }
    }
  }
  .v-select {
    margin-left:30px;
    max-width:120px;
    padding:0px;
    margin-top:0px;
  }
  .timePicker{
    margin:0 10px;
    max-width:150px;
    input {
      text-align:center;
    }
  }
  .timePickerField{
    display:flex;
    align-items:center;
    caret-color:#ff6632!important;
    justify-content:center;
    margin-left:20px;
    .v-input__slot:hover:before{
      border-color:#ff6632;
    }
  }
    .v-input.primary--text{
      caret-color:#ff6632!important;
      color:#ff6632!important;
    }
    .v-select__selections{
      display:flex;
      justify-content:center;
      input{
        display:none;
      }
    .v-select__selection--comma{
      color:#ff6632;
      text-align:center;
      font-size:14px;
    }
    }
    .v-input--checkbox{
      max-width:160px;
      margin-left:30px;
      margin-top:0px;
      padding:0px;
      .v-input__slot{
        margin-bottom:0px;
      }
      .v-label{
        font-size:14px;
        color:#ff6632!important;
      }
      .v-input--selection-controls__input{
        .accent--text{
          caret-color:#ff6632!important;
          color:#ff6632!important;
        }
      }
    }
    .v-input__control{
      .v-messages{
        display:none;
      }
    }
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
</style>
