import { createAPI, createFormAPI } from '@/utils/request'
import { IUserLogin, IUserInfo } from '@/entity/user-login'

// 登录
export async function login(
  username: string,
  password: string
): Promise<IUserLogin> {
  const { data } = await createFormAPI('/uaa/oauth/token', 'post', {
    client_id: 'XcWebApp',
    client_secret: 'XcWebApp',
    grant_type: 'password',
    username: JSON.stringify({
      username: username,
      authenticationType: 'mobile'
    }),
    password: password
  })
  return data
}
