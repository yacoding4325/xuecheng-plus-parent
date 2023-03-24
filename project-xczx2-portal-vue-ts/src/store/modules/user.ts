import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators'
import { login } from '@/api/users'
import { IUserLogin } from '@/entity/user-login'
import {
  getToken,
  setToken,
  removeToken,
  getName,
  setName,
  removeName
} from '@/utils/cookies'
import store from '@/store'

export interface IUserState {
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
  userId: number
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public name = getName() || ''
  public avatar = ''
  public introduction = ''
  public roles: string[] = []
  public userId = 0

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }

  @Mutation
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }

  @Mutation
  private SET_USER_ID(userId: number) {
    this.userId = userId
  }

  @Action
  public async Login(userInfo: { username: string; password: string }) {
    let { username, password } = userInfo
    username = username.trim()
    const data: IUserLogin = await login(username, password)

    // TODO: 当登录失败时，应该直接返回错误消息，不应该继续执行了
    setToken(data.access_token)
    setName(username)
    this.SET_TOKEN(data.access_token)
    this.SET_NAME(username)
    this.SET_AVATAR('')
  }

  @Action
  public LogOut() {
    removeToken()
    removeName()
    window.location.href = `${process.env.VUE_APP_CLIENT_PORTAL_URL}/pages/learing-index.html`
  }
}

export const UserModule = getModule(User)
