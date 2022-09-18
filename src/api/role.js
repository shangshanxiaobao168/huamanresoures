import request from '@/utils/request.js'
/**
 * 获取角色列表
 * @param {*} params
 * @returns
 */
export function getRolesApi(params) {
  return request({
    url: '/sys/role',
    params,
  })
}
/**
 * 添加角色
 * @param {*} data {name,region}
 * @returns
 */
export function addRolesApi(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data,
  })
}
/**
 * 通过角色id实现删除
 * @param {*} id
 * @returns
 */
export function removeRolesApi(id) {
  return request({
    url: '/sys/role/' + id,
    method: 'DELETE',
  })
}
