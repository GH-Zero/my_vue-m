import request from '@/utils/request.js'

export const login = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 获取验证码请求
export const getSmsCode = mobile => {
  return request({
    method: 'get',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
// 获取我的信息
export const getMyUser = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user'
  })
}
// 关注用户
export const getFollow = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data
  })
}
// 取消用户
export const deleteFollow = (target) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${target}`
  })
}
