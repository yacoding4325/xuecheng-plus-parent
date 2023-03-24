import { createAPI } from '@/utils/request'
import { ITeachingPersonalOrgDTO } from '@/entity/teaching-personal-org'

// 个人资料提交
export async function savePersonalOrg(
  body: ITeachingPersonalOrgDTO
): Promise<ITeachingPersonalOrgDTO> {
  const { data } = await createAPI(
    '/teaching/personal-org',
    'post',
    undefined,
    body
  )
  return data
}
