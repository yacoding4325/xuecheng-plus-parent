/**
 * 分页结果集
 */
export interface ILearningMemberPageList {
  /**
   * 数据记录总数
   */
  counts?: number
  first?: boolean
  /**
   * 数据列表
   */
  items?: IMemberDTO[]
  itemsSize?: number
  /**
   * 当前页码
   */
  page?: number
  /**
   * 总页数
   */
  pages?: number
  /**
   * 一页数据数
   */
  pageSize?: number
}

/**
 * 用户查询对象
 */
export interface IMemberDTO {
  /**
   * 出生日期
   */
  birthday?: string
  changeDate?: string
  /**
   * 机构Id
   */
  companyId?: number
  /**
   * 确认密码
   */
  confirmPwd?: string
  createDate?: string
  /**
   * 电子信箱
   */
  email?: string
  /**
   * 个人简介
   */
  intro?: string
  /**
   * 成员Id
   */
  memberId?: number
  /**
   * 称呼/昵称
   */
  name: string
  /**
   * 密码
   */
  password?: string
  /**
   * 手机号
   */
  phone: string
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
   * 用户Id
   */
  userId?: number
  /**
   * 用户名
   */
  username: string
  /**
   * 用户照片
   */
  userpic?: string
  utype?: string
  /**
   * 手机验证码
   */
  verifyCode: string
  /**
   * 手机验证标识符
   */
  verifyKey: string
}
