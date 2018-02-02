import Axios from 'axios'

const Http = (Vue, $cookie) => {

    Axios.defaults.timeout = 50000
    Axios.defaults.withCredentials = true
    // 请求拦截器
    Axios.interceptors.request.use(config => {
        let token = $cookie.getCookie("token")
        if (config.params) {
            if (config.params.token) {
                token = config.params.token
            }
        }
        let opt = {token: token}
        let params = Object.assign({}, config.params, opt)
        config.params = params
        return config
    }, error => {
        return Promise.reject(error)
    })
    // 响应拦截器
    /* Axios.interceptors.response.use(response => {
         console.log('响应正确:' + response)
         return response;
     }, error => {
         console.log('响应错误:' + error)
         return Promise.reject(error)
     })*/

    return Axios
}

export default Http
