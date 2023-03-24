/**
 * 个人机构
 */
export interface ITeachingPersonalOrgDTO {
  /**
   * 学历证照片
   */
  eduCertImg?: string
  /**
   * 学历证号码
   */
  eduCertNo?: string
  /**
   * 电子邮箱
   */
  email: string
  /**
   * 身份证号
   */
  idCard: string
  /**
   * 个人简介
   */
  intro: string
  /**
   * 头像
   */
  logo: string
  /**
   * 主营类目
   */
  mainCategory: string
  /**
   * 专业证件照片
   */
  majorCertImg?: string
  /**
   * 专业证件号码
   */
  majorCertNo?: string
  /**
   * 真实名称
   */
  name: string
  personalOrgId?: number
  /**
   * 联系方式
   */
  phone: string
  /**
   * 承诺书
   */
  promiseLetter: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 教师资格证照片
   */
  teacherCertImg: string
  /**
   * 教师资格证号码
   */
  teacherCertNo?: string
  /**
   * 手机验证码
   */
  verifyCode: string
  /**
   * 手机验证标识符
   */
  verifyKey: string
  /**
   * 教学工作经历
   */
  workExperience?: string
  /**
   * 教学工作成果
   */
  workResults?: string
}
