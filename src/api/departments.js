import request from '@/utils/request'
/**
 * 获取组织架构的数据
 * @returns promise
 */
export function getDepartmentsApi() {
  // 利用request发送请求，并将结果return出去
  return request({
    url: '/company/department',
  })
}
/**
 *
 * @param {*} id 要删除的部门id
 * @returns promise
 */
export function delDepartmentsApi(id) {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE',
  })
}
/**
 * @param{Object}data
 */
export function addDepartmentsApi(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data,
  })
}
