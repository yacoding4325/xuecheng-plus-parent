import axios, { AxiosRequestConfig, Method } from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utils/cookies'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000 * 5
})
service.defaults.headers.post['Content-Type'] = 'application/json'

// Request interceptors
service.interceptors.request.use(
  config => {
    let token = getToken()
    //alert(token)
    if (token) { 
      config.headers['Authorization'] = `Bearer ${token}`
    } else {
      let temp = process.env.VUE_APP_SERVER_AUTHORIZATION
      if (temp) {
        config.headers['Authorization'] = `Bearer ${temp}`
      }
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  response => response,
  // response => {
  // 	const res = response.data;
  // 	if (res.code !== 200) {
  // 		Message({
  // 			message: res.message || 'Error',
  // 			type: 'error',
  // 			duration: 5 * 1000,
  // 		});
  // 		5001: token过期
  // 		5002: 无效token
  // 		5003: token校验异常
  // 		if (res.code === 5001 || res.code === 5002 || res.code === 5003) {
  // 			MessageBox.confirm('You have been logged out, try to login again.', 'Log out', {
  // 				confirmButtonText: 'Relogin',
  // 				cancelButtonText: 'Cancel',
  // 				type: 'warning',
  // 			}).then(() => {
  // 				UserModule.ResetToken();
  // 				location.reload(); // To prevent bugs from vue-router
  // 			});
  // 		}
  // 		return Promise.reject(new Error(res.message || 'Error'));
  // 	} else {
  // 		return response.data;
  // 	}
  // },
  error => {
    // debugger
    
    Message({
      message: error.response.data.errMessage || error.message,
      type: 'error',
      duration: 5 * 1000
    })
    if(error.response.status=="401" && error.response.data.errMessage=='没有认证'){
      window.location='http://www.xuecheng-plus.com/sign.html'
    }
    return Promise.reject(error)
  }
)

export const createAPI = (
  url: string,
  method: Method = 'get',
  params: any = undefined,
  data: any = undefined
) => {
  let config: AxiosRequestConfig = {}
  config.url = url
  config.method = method
  if (params !== undefined) {
    config.params = params
  }
  if (method != 'get' && data !== undefined) {
    config.data = data
  }

  return service(config)
}

export const createFormAPI = (url: string, method: Method, data: any) => {
  let config: AxiosRequestConfig = {}
  config.url = url
  config.method = method
  config.data = data
  config.headers = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  config.responseType = 'json'
  config.transformRequest = [
    function(data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }
  ]
  return service(config)
}

// 视频上传
export const uploadVideo = (url: string, method: Method, data: any, contentType = 'application/x-www-form-urlencoded') => {
  let config: AxiosRequestConfig = {}
  config.url = url
  config.method = method
  config.data = data
  config.headers = {
    'Content-Type': 'multipart/form-data; boundary=WebAppBoundary'
  }
  return service(config)
}
export default service
