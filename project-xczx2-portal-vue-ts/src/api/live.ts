import { createAPI } from '@/utils/request'
import { ILivePageList, IPushUrlDTO } from '@/entity/live-page-list'

// 直播列表
export async function getLivePageList(
  params: any,
  body: any
): Promise<ILivePageList> {
  const { data } = await createAPI('/media/live/list', 'post', params, body)
  return data
}

// 根据课程和课程计划获取直播推流地址(视频开始前十分钟前可获取)
export async function getPushUrl(params: any): Promise<IPushUrlDTO> {
  const { data } = await createAPI(
    `/media/live/pushUrl/${params.coursePubId}/${params.teachplanId}`,
    'get'
  )
  return data
}
