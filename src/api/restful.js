import { _axios } from './axios';
import qs from 'qs';

export function actionPostFormData(url, data, responseType) {
    return _axios({
        // url: '/falcon/user/login.html',
        url,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data,
        responseType: responseType
    })
}
export function actionPostJsonData(url, data) {
    return _axios({
        // url: '/falcon/user/login.html',
        url,
        method: 'post',
        cache: false,
        processData: false,
        contentType: false,
        headers: {
            'Content-Type': 'application/json'
        },
        onUploadProgress: (progressEvent) => {  
            var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'  
            let progress = complete;
            console.log(complete)
        },
        data: data
    })
}

export function actionPostForm(url, data, blocked = true) {
    return _axios({
        // url: '/falcon/user/login.html',
        url,
        method: 'post',
        data: data
    }, blocked)
}
export function actionPostJson(url, data, blocked = true) {
    return _axios({
        // url: '/falcon/user/login.html',
        url,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data)
    }, blocked)
}
export function actionPostSingle(url, data) {

    return _axios({
        url,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        contentType: "application/x-www-form-urlencoded",
        data: data
    })
}
export function actionGet(url, data) {
    return _axios({
        url,
        method: 'get',
        params: data,
        // data: JSON.stringify(data)
    })
}
export function actionPut(url, data) {
    return _axios({
        url,
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data)
    })
}
export function actionPostUrl(url, ccid) {

    return _axios({
        url,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        contentType: "application/x-www-form-urlencoded",
        data: qs.stringify({
            // PG20170210000883
            // "src": "http://gs1.z2a.com.cn/frontend/view/certificate?ccid=" + ccid,
            "conversion_source": "uri",
        })
    })
}
// export function actionPutForm(url, data, redirect, _vue, refresh) {
//     store.commit('SET_BLOCKED', true);
//     $.ajax({
//         url: url,
//         type: 'PUT',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
//         },
//         contentType: "application/x-www-form-urlencoded",
//         data: data,
//         success: function(data) {
//             store.commit('SET_BLOCKED', false);
//             if (redirect) router.push(redirect)
//             if (_vue) _vue.$message({
//                 title: '操作成功',
//                 message: '操作成功',
//                 type: 'success',
//                 duration: 2000
//             })
//             if (refresh) _vue.refreshList();
//         },
//         error: function(exception) {
//             store.commit('SET_BLOCKED', false);
//             console.log(exception.responseJSON.data[0].errorMessage)
//             if (exception.responseJSON.data[0].errorMessage === "exception.system.need_login") {
//                 store.dispatch('LogOut').then(() => {
//                     router.push({ path: '/login' })
//                 });
//             }
//             if (_vue) _vue.$message({
//                 message: exception.responseJSON.data[0].errorMessage,
//                 type: 'error',
//                 duration: 2000
//             })
//         }
//     })
// }
export function actionDelete(url, data) {
    return _axios({
        url,
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data)
    })
}