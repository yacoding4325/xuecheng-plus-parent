import { createAPI } from '@/utils/request'
import { ITeachingCompany } from '@/entity/teaching-company.ts'

// 机构详情-读取
export async function getCompany(): Promise<ITeachingCompany> {
  const { data } = await createAPI('/teaching/my-company')
  return data
}

// 机构详情-修改
export async function updateCompany(
  body: ITeachingCompany
): Promise<ITeachingCompany> {
  const { data } = await createAPI('/teaching/company', 'put', undefined, body)
  return data
}

// 机构详情-提交
export async function submitCompany(
  body: ITeachingCompany
): Promise<ITeachingCompany> {
  const { data } = await createAPI('/teaching/company', 'post', undefined, body)
  return data
}
