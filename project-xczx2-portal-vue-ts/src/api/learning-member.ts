import { createAPI } from '@/utils/request'
import { ILearningMemberPageList, IMemberDTO } from '@/entity/learning-member'

/**
 * Members page list 翻页
 * @param params 翻页参数
 * @returns page list
 */
export async function memberPageList(
  params: any
): Promise<ILearningMemberPageList> {
  const { data } = await createAPI('/learning/xc-member/list', 'post', params)
  return data
}

/**
 * Finds user by phone 根据手机号查询用户
 * @param phone 电话号码
 * @returns user by phone
 */
export async function findUserByPhone(
  phone: string | number
): Promise<IMemberDTO> {
  const { data } = await createAPI(`/learning/xc-member/get-by-phone`, 'get', {
    phone
  })
  return data
}

/**
 * Binds user 绑定用户
 * @param phone 电话号码
 * @param userId 用户id
 * @returns user
 */
export async function bindUser(
  phone: string | number,
  userId: string | number
): Promise<void> {
  await createAPI(`/learning/xc-member/binding`, 'post', {
    phone,
    userId
  })
}

/**
 * 解除绑定
 * @param userId 用户ID
 * @returns user
 */
export async function unbindUser(memberId: number): Promise<void> {
  await createAPI(`/learning/xc-member/unbinding/${memberId}`, 'post')
}
