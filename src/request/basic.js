import axios from 'axios'
import router from '../router/index'
const baseUrl = 'http://localhost:3000'

const service = axios.create(
  {
    baseURL: baseUrl,
    timeout: 5000
  }
)

// 设置请求次数，请求的间隙
service.defaults.retry = 4
service.defaults.retryDelay = 1000

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    if (error.response) {
      // console.log('err' + error) // for debug
      switch (error.response.status) {
        case 401:
          // console.log('err status' + error.response.status)
          router.push('/login')
          break
        case 404:
          break
        case 500:
          break
      }
      return Promise.reject(error)
    } else {
      // 处理超时的情况
      let config = error.config
      // If config does not exist or the retry option is not set, reject
      if (!config || !config.retry) return Promise.reject(error)

      // Set the variable for keeping track of the retry count
      config.__retryCount = config.__retryCount || 0

      // Check if we've maxed out the total number of retries
      if (config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(error)
      }

      // Increase the retry count
      config.__retryCount += 1

      // Create new promise to handle exponential backoff
      let backoff = new Promise(function(resolve) {
        setTimeout(function() {
          resolve()
        }, config.retryDelay || 1)
      })

      // Return the promise in which recalls axios to retry the request
      return backoff.then(function() {
        return service(config)
      })
    }
  }
)
export default service
