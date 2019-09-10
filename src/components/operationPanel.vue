<template>
  <v-app id="operationPanel" class="operationPanel">
      <v-dialog v-model="dialog" width='300'>
        <v-card>
        <v-card-title
          class="headline lighten-2"
          primary-title
        >
          所选时间段不规范！
        </v-card-title>
          <v-card-text>
            筛选的日期不能为当天</br>
            筛选的最早日期为当前日期的前120天</br>
            筛选的时间跨度最大为30天
          </v-card-text>
        </v-card>
      </v-dialog>  
    <div class='opHeader'>{{opHeader}}</div>
    <div class='selectArea'>
      <span class='title'>日期:</span>
      <v-btn-toggle class='timeSelect' light>
        <v-btn :value='1' :class="{'v-btn--active--force':curTime==1}" @click='btnChange(1,1)' flat>今日</v-btn>
        <v-btn :value='2' :class="{'v-btn--active--force':curTime==2}" @click='btnChange(1,2)' flat>昨日</v-btn>
        <v-btn :value='3' :class="{'v-btn--active--force':curTime==3}" @click='btnChange(1,3)' flat>近7天</v-btn>
        <v-btn :value='4' :class="{'v-btn--active--force':curTime==4}" @click='btnChange(1,4)' flat>近14天</v-btn>
        <v-btn :value='5' :class="{'v-btn--active--force':curTime==5}" @click='btnChange(1,5)' flat>近30天</v-btn>
      </v-btn-toggle>
      <div class='timePickerField'>
        <v-menu ref="menu1" v-model="menu1" :nudge-right="40" lazy transition="scale-transition" offset-y max-width="290px" min-width="120px" :close-on-content-click="false">
          <template v-slot:activator="{ on }">
            <v-text-field readonly prepend-icon="event" v-model="dateFormatted" class='timePicker' persistent-hint @blur="date = parseDate(dateFormatted)" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title @input="ctrlMenuPre"></v-date-picker>
        </v-menu>
        至
        <v-menu ref="menu2" v-model="menu2" :nudge-right="40" lazy transition="scale-transition" offset-y max-width="290px" min-width="120px" :close-on-content-click="false">
          <template v-slot:activator="{ on }">
            <v-text-field readonly prepend-icon="event" v-model="dateFormatted2" class='timePicker' persistent-hint @blur="date2 = parseDate(dateFormatted2)" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="date2" no-title @input="ctrlMenuAft"></v-date-picker>
        </v-menu>
      </div>
    </div>
    <div class='selectArea'>
      <span class='title'>系统:</span>
      <v-btn-toggle class='deviceSelect' light>
        <v-btn :value='1' :class="{'v-btn--active--force':curDevice==1}" @click='btnChange(2,1)' flat>汇总</v-btn>
        <v-btn :value='2' :class="{'v-btn--active--force':curDevice==2}" @click='btnChange(2,2)' flat>安卓</v-btn>
        <v-btn :value='3' :class="{'v-btn--active--force':curDevice==3}" @click='btnChange(2,3)' flat>ios</v-btn>
        <v-btn :value='4' :class="{'v-btn--active--force':curDevice==4}" @click='btnChange(2,4)' flat>wechat</v-btn>
        <!-- wechat -->
      </v-btn-toggle>
    </div>
    <div class='selectArea'>
      <span class='title'>渠道:</span>
      <v-tooltip right>
      <template v-slot:activator="{ on }">
      <span v-on="on" class='tooltip'>
      <v-select multiple v-model='curChannel' :items="chanelList" @change='judgeCurChannel'></v-select>
      </span>
      </template>
      <span>{{curChannel.length===0?'汇总':curChannel.join(' , ')}}</span>
      </v-tooltip>
    </div>
    <div class='selectArea'>
      <span class='title'>显示:</span>
      <v-checkbox v-model="displayOrder" value="1" :label="filterLabel" data-vv-name="checkbox" type="checkbox"></v-checkbox>
    </div>
  </div>
  </v-app>
</template>
<script>
import {channelList} from '../api'
export default {
  props:{
    opHeader: {
      type: String,
      default: '设备实时监控数据'
    },
    filterLabel: {
      type: String,
      default: '剔除一元拼团订单'
    },
    value: {
      type: [Array, String]
    },
    accept: {
      type: String,
      default: '*'
    }
  },
  data: vm => ({
      date: new Date((new Date().getTime() - 24 * 60 * 60 * 1000)).toISOString().substr(0, 10),
      sql:'',
      loading: true,
      curTime: 1,
      curDevice: 1,
      menu1: false,
      displayOrder:null,
      dialog: false,
      menu2: false,
      chanelList:[],
      curChannel:['汇总'],
      dateRollBack: [],
      dateFormatted: vm.formatDate(new Date((new Date().getTime() - 24 * 60 * 60 * 1000)).toISOString().substr(0, 10)),
      date2: new Date((new Date().getTime() - 24 * 60 * 60 * 1000)).toISOString().substr(0, 10),
      dateFormatted2: vm.formatDate(new Date((new Date().getTime() - 24 * 60 * 60 * 1000)).toISOString().substr(0, 10))
  }),
  watch: {
    curTime: {
      handler(val) {
        // this.queryData()
      },
      deep: true
    },
    date (val) {
        // this.dateFormatted = this.formatDate(this.date)
        // if (!this.dialog) this.changePick()
    },
    date2 (val) {
        // this.dateFormatted2 = this.formatDate(this.date2)
        // if (!this.dialog) this.changePick()
    },
    curChannel (val) {
        this.queryData()
    },
    displayOrder (val) {
        this.queryData(this.displayOrder?'warning':'','radio')
    },
    curDevice (val) {
        this.queryData()
    }
  },
  created() {
    let formData = new FormData()
    formData.append("datasetId", 160);
    formData.append("colmunName", '渠道');
    channelList(formData).then(res=> {
      this.chanelList = res.filter(e => e !== '')
      this.chanelList.push('汇总')
    })
  },
  mounted() {
  },
  methods: {
    ctrlMenuPre () {
      this.menu1 = false
      // this.dateFormatted = this.formatDate(this.date)
      if (!this.dialog) this.changePick()      
    },
    ctrlMenuAft () {
      this.menu2 = false
      // this.dateFormatted2 = this.formatDate(this.date2)
      if (!this.dialog) this.changePick()      
    },
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    changePick() {
      let day = 1000 * 60 * 60 *24
      let curData = new Date().toISOString().substr(0, 10)
      let daysBetween = (Date.parse(this.date2.replace(/-/g, "/")) - Date.parse(this.date.replace(/-/g, "/"))) / day
      let daysEnd = parseInt((new Date() - Date.parse(this.date.replace(/-/g, "/"))) / day)
      let daysStart = parseInt((new Date() - Date.parse(this.date2.replace(/-/g, "/"))) / day)
      let daysOk = daysBetween >= 0 && daysBetween <= 30 && daysStart > 0
      let daysEndOk = daysEnd >= 0 && daysEnd <= 120
      let timeOk = daysOk && daysEndOk &&(this.date !== curData || this.date2 !== curData)
      if (timeOk) {
        this.dateRollBack = [this.date, this.date2]
        this.$nextTick(()=>{
        this.curTime = null
        this.queryData()
        })
      }
      else {
        this.dialog = true
        this.date = this.dateRollBack[0] ? this.dateRollBack[0] : new Date((new Date().getTime() - 24 * 60 * 60 * 1000)).toISOString().substr(0, 10)
        this.date2 = this.dateRollBack[1] ? this.dateRollBack[1] : new Date((new Date().getTime() - 24 * 60 * 60 * 1000)).toISOString().substr(0, 10)
      }
      this.dateFormatted = this.formatDate(this.date)
      this.dateFormatted2 = this.formatDate(this.date2)
    },
    btnChange(type,val) {
      switch(type) {
        case 1:
        this.curTime = val
        // this.displayOrder = null
        this.queryData()
        break;
        case 2:
        this.curDevice = val
        break;
      }
    },
    queryData(type, chking){
      let opObj = {
        curTime: this.curTime,
        curDevice: this.curDevice,
        date: this.date,
        date2: this.date2,
        curChannel: this.curChannel,
        displayOrder:this.displayOrder,
        renderType: type || null
      }
    	this.$emit('queryData', opObj, chking)
    },
    judgeCurChannel(e){
      if(e[e.length-1] && e[e.length-1]==='汇总') {
        this.curChannel = ['汇总']
      }
      else if(e[e.length - 1] !== '汇总' && e.filter(e =>e === '汇总').length > 0) {
        this.curChannel = this.curChannel.filter(e => e!=='汇总')
      }
      console.log(e[e.length-1])
    }
  }
}

</script>
<style type="text/scss" lang="scss">
  .operationPanel {
    .theme--light.v-icon{
      font-size:14px;
    }    
  .opHeader{
    background:#fff;
    text-align:left;
    margin-left:20px;
    font-size:18px;
  }
  padding-bottom:20px;
  background:#fff;
  .v-btn--active:before, .v-btn:focus:before, .v-btn:hover:before{
    background-color:#fff;
  }
  .v-btn--active--force:before{
   background-color:currentColor; 
  }
  .selectArea {
  padding-top:10px;
  padding-bottom:10px;
  background:#fff;
  display:flex;
  justify-content:left;
  align-items:center;
  .v-icon.primary--text {
    caret-color:#1e88e5!important;
    color:#1e88e5!important;    
  }
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
      border:1px solid #1e88e5;
      border-right-color:#1e88e5!important;
      opacity:1;
      color:#1e88e5!important;
      margin:0 10px;
      .v-btn__content{
        color:#1e88e5
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
    caret-color:#1e88e5!important;
    justify-content:center;
    margin-left:20px;
    .v-input__slot:hover:before{
      border-color:#1e88e5;
    }
    .v-input__prepend-outer{
      position:relative;
      margin-right:0px;
    }
    .theme--light.v-icon {
      font-size:18px;
      position:absolute;
      left:15px;
    }
    .v-icon.primary--text{
      caret-color:#1e88e5!important;
      color:#1e88e5!important;
    }
  }
    .v-input.primary--text{
      caret-color:#1e88e5!important;
      color:#1e88e5!important;
    }
    .v-select__selections{
      display:block;
      justify-content:center;
      overflow:hidden;
      white-space:nowrap;
      text-align:center;
      text-overflow:ellipsis;
      input{
        display:none;
      }
    .v-select__selection--comma{
      color:#1e88e5;
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
        color:#1e88e5!important;
      }
      .v-input--selection-controls__input{
        width:24px;
        .accent--text{
          caret-color:#1e88e5!important;
          color:#1e88e5!important;
        }
      }
    }
    .v-input__control{
      .v-messages{
        display:none;
      }
    }
    .tooltip{
      width:120px;
      margin-left:30px; 
      .v-select{
        margin-left:0px;
      }
    }
}
}
.v-dialog {
  .v-card__title {
    background:#1e88e5;
    color:#fff;
    font-size:16px!important;
    justify-content:center;
  }
}
</style>
