import request from '@/utils/request'
/**
 * 获取员工简单列表
 * @returns promise
 */
export function getEmployeesApi() {
  return request({
    url: '/sys/user/simple',
  })
}
/**
 * 获取员工的列表信息
 * @param {*} params
 * @returns
 */
export function getEmployeesInfoApi(params) {
  return request({
    url: '/sys/user',
    params,
  })
}
/**
 * 获取员工id
 * @param {*} id
 * @returns
 */
export function deleteEmployeesApi(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE',
  })
}
/**
 * 新增员工
 * @param {*} data
 * @returns
 */
export function addEmployeesApi(data) {
  return request({
    url: '/sys/user',
    method: 'POST',
    data,
  })
}
/**
 * 批量导入员工
 * @param {*} data 员工数组
 * @returns
 */
export function importEmployess(data) {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data,
  })
}

/**
 * 读取用户详情的基础信息
 * @param {*} id
 * @returns
 */
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`,
    method: 'GET',
  })
}

export function assignRoles(data) {
  return request({
    url: '/sys/user/assignRoles',
    method: 'PUT',
    data,
  })
}
