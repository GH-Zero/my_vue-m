import request from '../utils/request'

// 获取文章里面信息
export const getArticle = (articleId) => {
  return request({
    method: 'get',
    url: `/app/v1_0/articles/${articleId}`
  })
}
// 文章收藏
export const getLike = (data) => {
  return request({
    method: 'post',
    url: '/app/v1_0/article/collections',
    data
  })
}
// 取消文章收藏
export const geNotLike = (articleId) => {
  return request({
    method: 'delete',
    url: `/app/v1_0/article/collections/${articleId}`
  })
}
// 文章点赞
export const getGood = (data) => {
  return request({
    method: 'post',
    url: '/app/v1_0/article/likings',
    data
  })
}
// 取消文章点赞
export const geNotGood = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/dislikes',
    data
  })
}
