import axios from 'axios'

const instance = axios.create({
  baseURL: '/api/',
  timeout: 20000
})

instance.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  response => {
    if (response.data.errno !== 0) {
      alert(response.data.message)
    }
    return response.data
  },
  error => Promise.reject(error)
)

export async function fetchUtil (name, options = {}) {
  const {
    method = 'GET',
    data = {}
  } = options

  const opt = {}

  if (method === 'GET') {
    opt['params'] = data
  } else {
    opt['data'] = data
  }

  opt['url'] = name
  opt['method'] = method

  try {
    const response = await instance(opt)
    return response
  } catch (error) {
    throw error
  }
}
