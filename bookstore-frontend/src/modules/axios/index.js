import axios from 'axios'
import Cookies from 'js-cookie'
const baseURL = 'http://localhost:8000'

export default axios.create({baseURL})

const axiosPrivate = axios.create({baseURL})
axiosPrivate.interceptors.request.use((config) => {
  const token = Cookies.get('jwt_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error);
})

export { axiosPrivate }