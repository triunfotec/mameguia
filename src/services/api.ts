import axios from 'axios'

const {API_BASE_URL} = process.env

export const baseURLMain = API_BASE_URL
export const baseURL = `${API_BASE_URL}/api`

export const api = axios.create({
  baseURL: API_BASE_URL,
})

export const apiSMS = axios.create({
  baseURL: 'https://api.smstoken.com.br/token/v1',
})
