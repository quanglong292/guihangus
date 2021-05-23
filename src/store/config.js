import * as axios from 'axios'

const service = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}`,
  timeout: 60000
})


service.interceptors.request.use(function (config) {
  const queryString = window.location;
  let token = localStorage.getItem('token')
  if(queryString.pathname === '/new-password'){
    const urlParams = new URLSearchParams(queryString.search);
    const param = urlParams.get('token')
    token = param
  }
  config.headers.Authorization = 'Bearer ' + token
  return config;
});

service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response && error.response.data) {
      return error.response.data
    }
    return Promise.reject(error)
  }
)
export default service