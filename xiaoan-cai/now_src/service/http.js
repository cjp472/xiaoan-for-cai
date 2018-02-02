import Axios from 'axios'

const Http = (Vue) => {

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
     /* Vue.prototype.$message({
       showClose: true,
       type: 'error',
       duration: 3000,
       message: error.message
     }) */
       return Promise.reject(error)
   })

  return Axios
}

export default Http
