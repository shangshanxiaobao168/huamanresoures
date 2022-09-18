import request from '@/utils/request.js'
export function getCompanyInfoApi(companyId) {
  return request({
    url:`/company/${companyId}`,
  
  })
}
