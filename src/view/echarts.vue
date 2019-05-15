<template>
  <v-app id="inspire" class="formChartC">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 lg6>
          <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field v-model="dateFormatted" label="Date" hint="MM/DD/YYYY format" persistent-hint prepend-icon="event" @blur="date = parseDate(dateFormatted)" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
          </v-menu>
          <p>Date in ISO format: <strong>{{ date +':'+ $_.now()}}</strong></p>
        </v-flex>
        <v-flex xs12 lg6>
          <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field v-model="computedDateFormatted" label="Date (read only text field)" hint="MM/DD/YYYY format" persistent-hint prepend-icon="event" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
          </v-menu>
          <p>Date in ISO format: <strong>{{ date }}</strong></p>
        </v-flex>
        <v-flex xs12 lg12>
          <div id='main' style="height:600px"></div>
          <div id='chartMain' style="height:800px;margin-bottom:60px"></div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
import moment from 'moment'
import { getChartJson } from 'api'
export default {
  data: vm => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    }
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
    }
    // formatDate(date) {
    //   if (!date) return null

    //   const [year, month, day] = date.split('-')
    //   return `${month}/${day}/${year}`
    // },

  },
  mounted() {
    let a = [1, 3, 4, 5];
    console.log(this.$_.size(a))
    let option = {
      color: ['#8EC9EB'],
      legend: {
        data: ['高度(km)与气温(°C)变化关系']
      },
      tooltip: {
        trigger: 'axis',
        formatter: "Temperature : <br/>{b}km : {c}°C"
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        splitLine: {
          show: false
        },
        axisLabel: {
          formatter: '{value} °C'
        }
      },
      yAxis: {
        type: 'category',
        axisLine: { onZero: false },
        axisLabel: {
          formatter: '{value} km'
        },
        boundaryGap: true,
        data: ['0', '10', '20', '30', '40', '50', '60', '70', '80']
      },
      graphic: [{
          type: 'image',
          id: 'logo',
          right: 20,
          top: 20,
          z: -10,
          bounding: 'raw',
          origin: [75, 75],
          style: {
            image: 'http://echarts.baidu.com/images/favicon.png',
            width: 150,
            height: 150,
            opacity: 0.4
          }
        },
        {
          type: 'group',
          rotation: Math.PI / 4,
          bounding: 'raw',
          right: 110,
          bottom: 110,
          z: 100,
          children: [{
              type: 'rect',
              left: 'center',
              top: 'center',
              z: 100,
              shape: {
                width: 400,
                height: 50
              },
              style: {
                fill: 'rgba(0,0,0,0.3)'
              }
            },
            {
              type: 'text',
              left: 'center',
              top: 'center',
              z: 100,
              style: {
                fill: '#fff',
                text: 'ECHARTS BAR CHART',
                font: 'bold 26px Microsoft YaHei'
              }
            }
          ]
        },
        {
          type: 'group',
          left: '10%',
          top: 'center',
          children: [{
              type: 'rect',
              z: 100,
              left: 'center',
              top: 'middle',
              shape: {
                width: 190,
                height: 90
              },
              style: {
                fill: '#fff',
                stroke: '#555',
                lineWidth: 2,
                shadowBlur: 8,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowColor: 'rgba(0,0,0,0.3)'
              }
            },
            {
              type: 'text',
              z: 100,
              left: 'center',
              top: 'middle',
              style: {
                fill: '#333',
                text: [
                  '横轴表示温度，单位是°C',
                  '纵轴表示高度，单位是km',
                  '右上角有一个图片做的水印',
                  '这个文本块可以放在图中各',
                  '种位置'
                ].join('\n'),
                font: '14px Microsoft YaHei'
              }
            }
          ]
        }
      ],
      series: [{
        name: '高度(km)与气温(°C)变化关系',
        type: 'bar',
        smooth: true,
        barCategoryGap: 25,
        lineStyle: {
          normal: {
            width: 3,
            shadowColor: 'rgba(0,0,0,0.4)',
            shadowBlur: 10,
            shadowOffsetY: 10
          }
        },
        data: [15, -50, -56.5, -46.5, -22.1, -2.5, -27.7, -55.7, -76.5]
      }]
    };
    // this.renderEcharts('main', option);
    this.createEcharts('main', option);
    getChartJson().then(data => {
      let lineOption = {
        title: {
          text: 'Beijing AQI',
          textStyle: {
            fontFamily: 'sans-serif',
            color: '#dedede',
            fontSize: 40,
            // align: 'center'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: data.map(function(item) {
            return item[0];
          })
        },
        yAxis: {
          splitLine: {
            show: false
          }
        },
        toolbox: {
          left: 'center',
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [{
          startValue: '2014-06-01'
        }, {
          type: 'inside'
        }],
        visualMap: {
          top: 10,
          right: 10,
          pieces: [{
            gt: 0,
            lte: 50,
            color: '#096'
          }, {
            gt: 50,
            lte: 100,
            color: '#ffde33'
          }, {
            gt: 100,
            lte: 150,
            color: '#ff9933'
          }, {
            gt: 150,
            lte: 200,
            color: '#cc0033'
          }, {
            gt: 200,
            lte: 300,
            color: '#660099'
          }, {
            gt: 300,
            color: '#7e0023'
          }],
          outOfRange: {
            color: '#999'
          }
        },
        series: {
          name: 'Beijing AQI',
          type: 'line',
          data: data.map(function(item) {
            return item[1];
          }),
          markLine: {
            silent: true,
            data: [{
              yAxis: 50
            }, {
              yAxis: 100
            }, {
              yAxis: 150
            }, {
              yAxis: 200
            }, {
              yAxis: 300
            }]
          }
        }
      }
      this.createEcharts('chartMain', lineOption);
      // this.renderEcharts('chartMain', lineOption);
    })
  }
}

</script>
