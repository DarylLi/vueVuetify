import { actionPostUrl, actionPostForm, actionPostJsonData, actionGet, actionPostFormData, actionPostJson, actionPut, actionDelete, actionPostSingle } from './restful';
import { env, proxName } from '../../config/api.env.js'
let pathname = window.location.pathname;
// let baseUrl = pathname ? (pathname.replaceAll(/\//g, '')) : '';
let curPath = window.document.location.href;
//获取主机地址之后的目录，如： test/test.jsp
let pathName = window.document.location.pathname;
let pos = curPath.indexOf(pathName);
//获取主机地址，如： http://localhost:8088
let localhostPath = curPath.substring(0, pos);
//获取带"/"的项目名，如：/test
let projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
// console.log(projectName)
let url = env == "dev" ? proxName : projectName
// protocal判定
let protocolStr = document.location.protocol;
console.log(protocolStr)

export function getUserDetail(data) {
  return actionGet(url + '/commons/getUserDetail.do', data);
}
export function getChartJson(data) {
  return actionGet('examples/data/asset/data/aqi-beijing.json', data);
}
export function postDemo(data) {
  let initData = 
  // {
  //   event_name: "payOrder",
  //   filter: {},
  //   from_date: "2019-05-13",
  //   measure_type: "period",
  //   rangeText: "本周",
  //   request_id: "1557884567890:781258",
  //   sampling_factor: 64,
  //   to_date: "2019-05-15",
  //   unit: "week",
  //   use_cache: true,
  //   user_filter: {}
  // }
   {
     measures: [{
       event_name: "payOrder",
       aggregator: "uniq_count",
       // field: "event.payOrder.orderAmount",
       // filter: {
       //   conditions: [{
       //     field: "orderType",
       //     function: "equal",
       //     params: ["1元拼团"]
       //   }]
       // }
     }],
     unit: "day",
     filter: {

     },
    "by_fields":[
     ],
     sampling_factor: 64,
     axis_config: {
       isNormalize: false,
       left: [

       ],
       right: [

       ]
     },
     from_date: "2019-01-11",
     to_date: "2019-05-14",
     bookmarkid: "1763",
     tType: "n",
     ratio: "n",
     approx: false,
     detail_and_rollup: true,
     request_id: "1557830405791:237899",
     use_cache: true
   };
  let now = new Date().getTime();
  // return actionPostJson('http://shence.taojiji.com/api/events/report?token=80746d2e3dcffaeb59daade2d835c7d738e6fc727b861524b9b913b2a69ad53&' + now, data ? data : initData);
  return actionPostJson('http://shence.taojiji.com/api/addictions/report/?bookmarkId=&async=true&timeout=5&' + now, data ? data : initData);
  // http://shence.taojiji.com/api/events/report?token=80746d2e3dcffaeb59daade2d835c7d738e6fc727b861524b9b913b2a69ad532
}
export function sqlDemo(data) {
  let now = new Date().getTime();
  return actionPostSingle('https://shence.taojiji.com/api/sql/query?token=80746d2e3dcffaeb59daade2d835c7d738e6fc727b861524b9b913b2a69ad53' + now, data);
}
export function dbDemo(data) {
  return actionPostFormData(`${(__APIHOST__).replace('https:', protocolStr)}/cboard/dashboard/getAggregateData.do`, data);
  // return actionPostFormData('http://localhost:8080/cboard_war_exploded/dashboard/getAggregateData.do', data);
}
export function exportExcel(data) {
  return actionPostFormData(`${(__APIHOST__).replace('https:', protocolStr)}/cboard/dashboard/tableToxls.do`, data, 'arraybuffer');
  // return actionPostFormData('http://localhost:8080/cboard_war_exploded/dashboard/getAggregateData.do', data);
}
export function channelList(data) {
  return actionPostFormData(`${(__APIHOST__).replace('https:', protocolStr)}/cboard/dashboard/getDimensionValues.do`, data);
  // return actionPostFormData('http://localhost:8080/cboard_war_exploded/dashboard/getAggregateData.do', data);
}
// 
// commons/getUserDetail.do
