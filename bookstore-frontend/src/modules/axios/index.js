import axios from 'axios'
import Cookie from 'js-cookie'
const baseURL = 'http://localhost:8000'

const token = Cookie.get('jwt_token')
export default axios.create({baseURL})

export const axiosPrivate = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`
  }
})