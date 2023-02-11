import axios from 'axios'
import { api } from '../config/config'

export default async (
  url,
  body,
  method = 'POST',
) => axios({
    method,
    url: `${api}/api${url}`,
    data: body,
  })
    .then((response) => response?.data || { code: 400, data: [] })
    .catch(({ response }) => response?.data || { code: 400, data: [] })