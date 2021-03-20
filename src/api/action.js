import request from '../utils/request'

// 获取导航里面信息
export const getInfo = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}
// 获取频道里面信息
export const getPin = (params) => {
  return request({
    method: 'get',
    url: '/app/v1_1/articles',
    params
  })
}
// 获取频道请求
export const getTab = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
// 添加频道
export const addTab = (channels) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}
// 删除频道
export const deleTab = (id) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${id}`
  })
}
