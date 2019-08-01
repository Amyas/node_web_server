import { fetchUtil } from '@/utils/fetch'

export function login (data = {}) {
  return fetchUtil('user/login', {
    method: 'POST',
    data
  })
}
export default {
  login
}
