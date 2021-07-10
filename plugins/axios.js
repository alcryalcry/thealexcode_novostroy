import axios from 'axios'
import { HEADERS } from '@/config/constants'

export default axios.create({
  baseURL: process.env.API_ROOT,
  headers: HEADERS,
  withCredentials: false
})
