import { createAPI } from '@/utils/request'
import { IOrderPageVO } from '@/entity/order-page-list'

// 机构的订单列表及明细
export async function getOrderPageList(
  params: any,
  body: any
): Promise<IOrderPageVO> {
  const { data } = await createAPI(
    '/order/orders/org-list',
    'post',
    params,
    body
  )
  return data
}
