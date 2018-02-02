/**
 * Created by zhuliang on 2017/5/6.
 */
import Axios from 'axios'
Axios.defaults.timeout = 50000
Axios.defaults.withCredentials = true
// 请求拦截器
Axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
Axios.interceptors.response.use(response => {
  console.log('响应正确:' + response)
  return response;
}, error => {
  console.log('响应错误:' + error)
  return Promise.reject(error)
})
export default {
  get: function (url, params) {
    return new Promise(function (resolve, reject) {
      Axios.get(url, {params: params}).then((response) => {
        resolve(response)
      }).catch((response) => {
        reject(response)
      })
    })
  },
  post: function (url, body, params) {
    return new Promise(function (resolve, reject) {
      Axios.post(url, body, {params: params}).then((response) => {
        resolve(response)
      }).catch((response) => {
        reject(response)
      })
    })
  },
  delete: function (url, params) {
    return new Promise(function (resolve, reject) {
      Axios.delete(url, {params: params}).then((response) => {
        resolve(response)
      }).catch((response) => {
        reject(response)
      })
    })
  },
  put: function (url, body, params) {
    return new Promise(function (resolve, reject) {
      Axios.put(url, body, {params: params}).then((response) => {
        resolve(response)
      }).catch((response) => {
        reject(response)
      })
    })
  }
}
