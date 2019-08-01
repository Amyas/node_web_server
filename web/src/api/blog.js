import { fetchUtil } from '@/utils/fetch'

export function list (data = {}) {
  return fetchUtil('blog/list', {
    data
  })
}
export function detail (data = {}) {
  return fetchUtil('blog/detail', {
    data
  })
}
export function create (data = {}) {
  return fetchUtil('blog/new', {
    method: 'POST',
    data
  })
}
export function del (id, data = {}) {
  return fetchUtil(`blog/del?id=${id}`, {
    method: 'POST',
    data
  })
}
export function update (id, data = {}) {
  return fetchUtil(`blog/update?id=${id}`, {
    method: 'POST',
    data
  })
}

export function fetchRemoveBatch (data = {}) {
  return fetchUtil('user/destroyBatch', {
    method: 'POST',
    data,
    loading: 'user.list.loading'
  })
}

export default {
  list,
  detail,
  create,
  del,
  update
}
