import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://10.0.0.108:4000'
  // baseURL: 'http://192.168.0.107:4000'
})