import { createAPI } from '@/utils/request'
import { IUserInfo } from '@/entity/user-login'

// 验证手机 验证码
export async function verify(params: any): Promise<string> {
  const { data } = await createAPI(
    '/learning/xcUser/changePwd/verify',
    'post',
    params
  )
  return data
}

// 修改用户密码
export async function changePwd(
  verifyToken: string,
  body: any
): Promise<boolean> {
  const { data } = await createAPI(
    `/learning/xcUser/changePwd/${verifyToken}`,
    'post',
    undefined,
    body
  )
  return data
}

// 获取用户的信息（此接口后端老师说不调用）
export async function profile(userId: number): Promise<IUserInfo> {
  const { data } = await createAPI(`/learning/xcUser/${userId}`, 'get')
  return data
}

// 用户注册
export async function register(body: any): Promise<boolean> {
  const { data } = await createAPI('/learning/xcUser', 'post', undefined, body)
  return data
}
