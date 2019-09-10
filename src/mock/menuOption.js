export default {
  optionsData: {
    menuObj: {
      'chart1': {
        chartList: [{
          name: 'chartAlpha',
          data: {
            tabName: '当日激活',
            dataId: 160,
            sqlObj: { "rows": [{ "columnName": "日期", "filterType": "eq", "values": [], "id": "351df1bb-5117-44a4-89af-c48eb1907426" }], "columns": [], "filters": [], "values": [{ "column": "当日激活", "aggType": "sum" }] },
            sqlValues: [{ "column": "当日激活", "aggType": "sum" }],
            timeQuery: {
              1: [{ "columnName": "日期类型", "filterType": "=", "values": ["今日"] }, { "columnName": "时段", "filterType": "=", "values": ["本时段"] }],
              2: [{ "columnName": "日期类型", "filterType": "=", "values": ["昨日"] }, { "columnName": "时段", "filterType": "=", "values": ["本时段"] }],
              3: [{ "columnName": "日期类型", "filterType": "=", "values": ["近七日"] }, { "columnName": "时段", "filterType": "=", "values": ["本时段"] }],
              4: [{ "columnName": "日期类型", "filterType": "=", "values": ["近十四日"] }, { "columnName": "时段", "filterType": "=", "values": ["本时段"] }],
              5: [{ "columnName": "日期类型", "filterType": "=", "values": ["近三十日"] }, { "columnName": "时段", "filterType": "=", "values": ["本时段"] }]
            },
            timeQueryLast: {
              1: [{ "columnName": "日期类型", "filterType": "=", "values": ["今日"] }, { "columnName": "时段", "filterType": "=", "values": ["上一时段"] }],
              2: [{ "columnName": "日期类型", "filterType": "=", "values": ["昨日"] }, { "columnName": "时段", "filterType": "=", "values": ["上一时段"] }],
              3: [{ "columnName": "日期类型", "filterType": "=", "values": ["近七日"] }, { "columnName": "时段", "filterType": "=", "values": ["上一时段"] }],
              4: [{ "columnName": "日期类型", "filterType": "=", "values": ["近十四日"] }, { "columnName": "时段", "filterType": "=", "values": ["上一时段"] }],
              5: [{ "columnName": "日期类型", "filterType": "=", "values": ["近三十日"] }, { "columnName": "时段", "filterType": "=", "values": ["上一时段"] }]
            },
            deviceQuery: {
              1: null,
              2: { "columnName": "系统", "filterType": "=", "values": ["android"] },
              3: { "columnName": "系统", "filterType": "=", "values": ["ios"] },
            },
            channelQuery: {
              '汇总': null,
              '今日头条': { "columnName": "渠道", "filterType": "=", "values": ["今日头条"] },
              '快手': { "columnName": "渠道", "filterType": "=", "values": ["快手"] },
              '广点通': { "columnName": "渠道", "filterType": "=", "values": ["广点通"] },
            },
            displayPrevious: null
          }
        }, {
          name: 'chartBeta',
          data: {
            tabName: '当日注册（限当日激活）',
            dataId: 161,
            sqlObj: { "rows": [{ "columnName": "日期", "filterType": "eq", "values": [], "id": "351df1bb-5117-44a4-89af-c48eb1907426" }], "columns": [], "filters": [], "values": [{ "column": "当日注册（限当日激活）", "aggType": "sum" }] },
            sqlValues: [{ "column": "当日注册（限当日激活）", "aggType": "sum" }],
            timeQuery: {
              1: [{ "columnName": "日期类型", "filterType": "=", "values": ["今日"] }, { "columnName": "时段", "filterType": "=", "values": ["本时段"] }],
              2: [{ "columnName": "日期类型", "filterType": "=", "values": ["昨日"] }, { "columnName": "时段", "filterType": "=", "values": ["本时段"] }],
              3: [{ "columnName": "日期类型", "filterType": "=", "values": ["近七日"] }, { "columnName": "时段", "filterType": "=", "values": ["本时段"] }],
              4: [{ "columnName": "日期类型", "filterType": "=", "values": ["近十四日"] }, { "columnName": "时段", "filterType": "=", "values": ["本时段"] }],
              5: [{ "columnName": "日期类型", "filterType": "=", "values": ["近三十日"] }, { "columnName": "时段", "filterType": "=", "values": ["本时段"] }]
            },
            timeQueryLast: {
              1: [{ "columnName": "日期类型", "filterType": "=", "values": ["今日"] }, { "columnName": "时段", "filterType": "=", "values": ["上一时段"] }],
              2: [{ "columnName": "日期类型", "filterType": "=", "values": ["昨日"] }, { "columnName": "时段", "filterType": "=", "values": ["上一时段"] }],
              3: [{ "columnName": "日期类型", "filterType": "=", "values": ["近七日"] }, { "columnName": "时段", "filterType": "=", "values": ["上一时段"] }],
              4: [{ "columnName": "日期类型", "filterType": "=", "values": ["近十四日"] }, { "columnName": "时段", "filterType": "=", "values": ["上一时段"] }],
              5: [{ "columnName": "日期类型", "filterType": "=", "values": ["近三十日"] }, { "columnName": "时段", "filterType": "=", "values": ["上一时段"] }]
            },
            deviceQuery: {
              1: null,
              2: { "columnName": "系统", "filterType": "=", "values": ["android"] },
              3: { "columnName": "系统", "filterType": "=", "values": ["ios"] },
            },
            channelQuery: {
              '汇总': null,
              '今日头条': { "columnName": "渠道", "filterType": "=", "values": ["今日头条"] },
              '快手': { "columnName": "渠道", "filterType": "=", "values": ["快手"] },
              '广点通': { "columnName": "渠道", "filterType": "=", "values": ["广点通"] },
            },
            displayPrevious: null
          }
        }],
        timeQuery: {
          1: [{ "columnName": "日期类型", "filterType": "=", "values": ["今日"] }, { "columnName": "时段", "filterType": "=", "values": ["本时段"] }],
          2: [{ "columnName": "日期类型", "filterType": "=", "values": ["昨日"] }, { "columnName": "时段", "filterType": "=", "values": ["本时段"] }],
          3: [{ "columnName": "日期类型", "filterType": "=", "values": ["近七日"] }, { "columnName": "时段", "filterType": "=", "values": ["本时段"] }],
          4: [{ "columnName": "日期类型", "filterType": "=", "values": ["近十四日"] }, { "columnName": "时段", "filterType": "=", "values": ["本时段"] }],
          5: [{ "columnName": "日期类型", "filterType": "=", "values": ["近三十日"] }, { "columnName": "时段", "filterType": "=", "values": ["本时段"] }]
        },
        timeQueryLast: {
          1: [{ "columnName": "日期类型", "filterType": "=", "values": ["今日"] }, { "columnName": "时段", "filterType": "=", "values": ["上一时段"] }],
          2: [{ "columnName": "日期类型", "filterType": "=", "values": ["昨日"] }, { "columnName": "时段", "filterType": "=", "values": ["上一时段"] }],
          3: [{ "columnName": "日期类型", "filterType": "=", "values": ["近七日"] }, { "columnName": "时段", "filterType": "=", "values": ["上一时段"] }],
          4: [{ "columnName": "日期类型", "filterType": "=", "values": ["近十四日"] }, { "columnName": "时段", "filterType": "=", "values": ["上一时段"] }],
          5: [{ "columnName": "日期类型", "filterType": "=", "values": ["近三十日"] }, { "columnName": "时段", "filterType": "=", "values": ["上一时段"] }]
        },
        deviceQuery: {
          1: null,
          2: { "columnName": "系统", "filterType": "=", "values": ["android"] },
          3: { "columnName": "系统", "filterType": "=", "values": ["ios"] },
        },
        channelQuery: {
          '汇总': null,
          '今日头条': { "columnName": "渠道", "filterType": "=", "values": ["今日头条"] },
          '快手': { "columnName": "渠道", "filterType": "=", "values": ["快手"] },
          '广点通': { "columnName": "渠道", "filterType": "=", "values": ["广点通"] },
        },
        tabList: [{
          name: 'tableAlpha',
          datasetId: 178,
          sql: { "rows": [{ "columnName": "日期", "filterType": "eq", "values": [] }, { "columnName": "渠道", "filterType": "eq", "values": [] }, { "columnName": "渠道链接", "filterType": "eq", "values": [] }, { "columnName": "系统", "filterType": "eq", "values": [] }, { "columnName": "当日激活设备", "filterType": "eq", "values": [] }, { "columnName": "当日异常激活率", "filterType": "eq", "values": [] }, { "columnName": "当日激活当日注册设备", "filterType": "eq", "values": [] }, { "columnName": "当日注册转化率", "filterType": "eq", "values": [] }, { "columnName": "当日订单转化设备数", "filterType": "eq", "values": [] }, { "columnName": "当日订单设备转化率", "filterType": "eq", "values": [] }, { "columnName": "当日首单用户数", "filterType": "eq", "values": [] }, { "columnName": "当日首单用户总订单数", "filterType": "eq", "values": [] }, { "columnName": "当日首单平均客单价", "filterType": "eq", "values": [] }, { "columnName": "当日首单订单总销售额", "filterType": "eq", "values": [] }], "columns": [], "filters": [{ "columnName": "日期类型", "filterType": "=", "values": ["今日"] }], "values": [] },
          tableTimeQuery: {
            1: [{ "columnName": "日期类型", "filterType": "=", "values": ["今日"] }],
            2: [{ "columnName": "日期类型", "filterType": "=", "values": ["昨日"] }],
            3: [{ "columnName": "日期类型", "filterType": "=", "values": ["近七日"] }],
            4: [{ "columnName": "日期类型", "filterType": "=", "values": ["近十四日"] }],
            5: [{ "columnName": "日期类型", "filterType": "=", "values": ["近三十日"] }]
          },
          deviceQuery: {
            1: null,
            2: { "columnName": "系统", "filterType": "=", "values": ["android"] },
            3: { "columnName": "系统", "filterType": "=", "values": ["ios"] },
          },
          channelQuery: {
            '汇总': null,
            '今日头条': { "columnName": "渠道", "filterType": "=", "values": ["今日头条"] },
            '快手': { "columnName": "渠道", "filterType": "=", "values": ["快手"] },
            '广点通': { "columnName": "渠道", "filterType": "=", "values": ["广点通"] },
          }
        }]
      },
      'chart2': {
        chartList: ['chartAlpha', 'chartBeta'],
        dataList: [160, 161]
      }
    }
  }
}
