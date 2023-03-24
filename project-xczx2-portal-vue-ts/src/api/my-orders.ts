import { createAPI } from '@/utils/request'
import { IMyOrdersPageList } from '@/entity/my-orders-page-list'

// 用户的课程订单列表
export async function getMyOrdersPageList(
  param: any,
  body: any
): Promise<IMyOrdersPageList> {
  const { data } = await createAPI('/order/orders/my-list', 'post', param, body)
  return data
}
