import request from '@/utils/request'
export function getDepartmentsApi() {
  // 利用request发送请求，并将结果return出去
  return request({
    url: '/company/department',
  })
}
