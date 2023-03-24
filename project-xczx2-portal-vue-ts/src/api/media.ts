import { createAPI } from '@/utils/request'
import {
  IMediaPageList,
  IMediaBaseDTO,
  IQnParamsDTO,
  IVodTokenDTO
} from '@/entity/media-page-list'

// 机构查询媒资信息
export async function getMediaPageList(
  params: any,
  body: any
): Promise<IMediaPageList> {
  const { data } = await createAPI('/media/files', 'post', params, body)
  return data
}

// 获取七牛云上传需要的参数
// export async function getQnParams(): Promise<IQnParamsDTO> {
//   const { data } = await createAPI('/media/media/qn-params', 'get')
//   return data
// }

// 获取视频上传凭证
export async function getVodToken(body: any): Promise<IVodTokenDTO> {
  const { data } = await createAPI('/media/media/vod-token', 'post', null, body)
  return data
}

// 保存媒资信息
export async function saveMedia(body: any): Promise<IMediaBaseDTO> {
  const { data } = await createAPI('/media/media', 'post', null, body)
  return data
}

// 预览点播视频
export async function previewMedia(mediaId: number): Promise<string> {
  const { data } = await createAPI(`/media/preview/${mediaId}`, 'get')
  return data
}

// 删除媒资信息
export async function deleteMedia(id: number): Promise<boolean> {
  const { data } = await createAPI(`/media/${id}`, 'delete')
  return data
}
