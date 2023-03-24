/**
 * 教育机构
 */
export interface ITeachingCompany {
  /**
   * 机构地址
   */
  address: string
  /**
   * 审批意见
   */
  approvalComment?: string
  /**
   * 审批日期
   */
  approvalDate?: string
  /**
   * 审批状态
   */
  approvalStatus?: string
  /**
   * 一句话简介
   */
  briefIntro?: string
  /**
   * 营业执照
   */
  businessPic?: string
  /**
   * 营业执照注册号
   */
  businessRegistNo?: string
  /**
   * 营业执照有效期
   */
  businessTerm?: string
  changeDate?: string
  /**
   * 公司Id值
   */
  companyId?: number
  createDate?: string
  /**
   * 教育资质证照片
   */
  eduCertImg?: string
  /**
   * 教育资质证书注册号
   */
  eduCertNo?: string
  /**
   * 教育资质证书有效期
   */
  eduCertTerm?: string
  /**
   * 邮箱
   */
  email?: string
  /**
   * 手持身份证照片
   */
  handPhotos?: string
  /**
   * 身份证照片
   */
  identityPic?: string
  /**
   * 机构简介
   */
  intro?: string
  /**
   * 申请人名称
   */
  linkname?: string
  /**
   * 机构logo
   */
  logo?: string
  mainCategory?: string
  /**
   * 名称
   */
  name: string
  /**
   * 联系方式
   */
  phone: string
  /**
   * 承诺书
   */
  promiseLetter?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 状态
   */
  status?: string
  /**
   * 机构名称
   */
  title: string
  /**
   * 商标注册证
   */
  trademarkPic?: string
  /**
   * 手机验证码
   */
  verifyCode: string
  /**
   * 手机验证标识符
   */
  verifyKey: string
}
