import axios from 'axios'
import { api } from '../config/config'

export default async (
  url,
  body,
  method = 'POST',
  ct = 'application/json;charset=utf-8'
) => axios({
    method,
    url: `${api}/api${url}`,
    data: body,
    header: {
      'Content-Type': ct,
    }
  })
    .then((response) => response?.data || { code: 400, data: [] })
    .catch(({ response }) => response?.data || { code: 400, data: [] })