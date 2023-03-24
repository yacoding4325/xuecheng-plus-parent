/**
 * 登录
 */
export interface IUserLogin {
  access_token: string
  token_type?: string
  refresh_token?: string
  expires_in?: string
  scope?: string
  jti?: string
}

/**
 * 用户信息
 */
export interface IUserInfo {
  /**
   * 出生日期
   */
  birthday?: Date
  changeDate?: Date
  /**
   * 确认密码
   */
  confirmPwd?: string
  createDate?: Date
  /**
   * 电子信箱
   */
  email?: string
  /**
   * 个人简介
   */
  intro?: string
  /**
   * 称呼/昵称
   */
  name?: string
  /**
   * 密码
   */
  password?: string
  /**
   * 手机号
   */
  phone?: string
  /**
   * QQ号
   */
  qq?: string
  /**
   * 备注(描述)
   */
  remark?: string
  /**
   * 性别 M/F
   */
  sex?: string
  status?: number
  /**
   * 主键
   */
  userId?: number
  /**
   * 用户名
   */
  username?: string
  /**
   * 用户照片
   */
  userpic?: string
  utype?: string
  /**
   * 手机验证码
   */
  verifyCode?: string
  /**
   * 手机验证标识符
   */
  verifyKey?: string
}
