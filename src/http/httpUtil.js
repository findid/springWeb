import axios from 'axios'
import Vue from 'vue';

let vue = new Vue();
let _a = axios.create({headers: {'Content-Type': 'application/json'}});
_a.defaults.timeout = 60000;
let _b = axios.create({headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}});

_b.defaults.transformRequest = [function (data) {
  let ret = '';
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret;
}];

/* 拦截器添加header*/
function addHeader(axios) {
  axios.interceptors.request.use(config => {

    // config.headers['access-token'] = accessToken;

    return config;
  }, error => {
    return Promise.reject(error)
  });
}


addHeader(_a);

/**
 * 拦截器 拦截响应
 */

_a.interceptors.response.use(
  response => {

    return response;
  },
  error => {
    debugger
    if (error && error.response && error.response.data && error.response.data.resCode && error.response.data.resCode === '405230602') {
    }
    return Promise.reject(error.response.data)
  }
);


function httpPost(path, param, isNeedLoading) {
  return _a.post('flask-api' + path, param).then(res => res.data);

}

/**
 * http
 * @param path
 * @param param
 * @returns {Promise<T>}
 */
function httpGet(path,param) {
  return _a.get('flask-api' + path,param).then(res => res.data);
}

function httpDelete(path) {
  return _a.delete('flask-api' + path).then(res => res.data);
}



export default {
  httpPost: (path, param) => {
    return httpPost(path, param);
  },
  httpGet: (path,param) => {
    return httpGet(path,param);
  },
  httpDelete: (path) => {
    return httpDelete(path);
  }

}
