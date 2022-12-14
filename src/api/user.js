import request from '@/utils/request'
/**
 * 登录请求
 * @param {Object} data password mobile
 * @returns promise
 */
export function login(data) {
  return request({
    url:'/sys/login',
    method: 'POST',
    data,
  })
}
export function getUserInfoApi(){
  return request({
    url:'/sys/profile',
    method:'POST',
  })
}
/**
 * 根据用户id获取员工详情数据
 * @para{string}
 * @return promise
 */
export function getUserDetail(id){
  return request({
    url:'/sys/user/'+ id
  })
}
