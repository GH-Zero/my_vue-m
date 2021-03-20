import axios from 'axios'
import store from '../store'
// 引入大数据包
import jsonBig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径
  // 默认axios是将数据转换成json
  transformResponse: [function (data) {
    try {
      return jsonBig.parse(data)
    } catch (err) {
      return {
        data
      }
    }
  }
  ]
})
// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
export default request
