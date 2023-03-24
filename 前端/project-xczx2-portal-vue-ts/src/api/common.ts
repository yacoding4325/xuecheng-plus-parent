import { createAPI } from '@/utils/request'
import { IQnParamsDTO } from '@/entity/media-page-list'

// 根据申请人手机号获取验证码
export async function smsMsg(phone: string): Promise<string> {
  const { data } = await createAPI('/content/common/smsMsg', 'get', {
    phone: phone
  })
  return data
}

// 获取七牛云上传凭证
export async function getQnParams(): Promise<IQnParamsDTO> {
  const { data } = await createAPI('/content/common/qnUploadToken', 'get')
  return data
}