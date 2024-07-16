import { useRequest } from '@/utils/ofetch'

/**
 * 180.100.200.14 登录
 */
export function dlgPdf(prop = {}) {
  return useRequest({
    ...prop,
    method: 'get',
    fileName: 'aa.pdf',
    responseType: 'blob',
    url: '/api/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  })
}

/**
 *getCustomer
 */
export function getCustomer(id, prop = {}) {
  return useRequest({
    ...prop,
    method: 'GET',
    domain: 'user',
    responseType: 'blob',
    url: `/customer/${id}`,
  })
}
