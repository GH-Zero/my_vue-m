import request from '../utils/request'

export const getSeachT = q => {
  return request({
    method: 'get',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const getSearchS = params => {
  return request({
    method: 'get',
    url: '/app/v1_0/search',
    params
  })
}
