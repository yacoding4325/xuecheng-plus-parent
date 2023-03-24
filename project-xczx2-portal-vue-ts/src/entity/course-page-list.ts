/**
 * 分页结果集
 */
export interface ICoursePageList {
  /**
   * 数据记录总数
   */
  counts?: number
  first?: boolean
  /**
   * 数据列表
   */
  items?: ICourseBaseDTO[]
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
 * 课程基本信息
 */
export interface ICourseBaseDTO {
  /**
   * 审核时间
   */
  auditDate?: string
  /**
   * 审核意见
   */
  auditMind?: string
  /**
   * 审核状态：CourseAuditEnum
   */
  auditStatus?: string
  changeDate?: string
  /**
   * 收费规则，对应数据字典
   */
  charge: string
  /**
   * 机构ID
   */
  companyId?: number
  /**
   * 机构名称
   */
  companyName?: string
  courseBaseId?: number
  id?: number
  /**
   * 课程营销信息
   */
  courseMarket?: ICourseMarketDTO
  /**
   * 课程发布id
   */
  coursePubId?: number
  createDate?: string
  /**
   * 课程介绍
   */
  description?: string
  /**
   * 课程等级
   */
  grade?: string
  /**
   * 学习（报名）人数
   */
  learners?: number
  /**
   * 大分类
   */
  mt: string
  /**
   * 大分类名称
   */
  mtName?: string
  /**
   * 课程名称
   */
  name: string
  /**
   * 课程图片
   */
  pic: string
  /**
   * 价格
   */
  price?: number
  /**
   * 小分类
   */
  st: string
  /**
   * 小分类名称
   */
  stName?: string
  /**
   * 任务数
   */
  subsectionNum?: number
  /**
   * 课程标签
   */
  tags?: string
  /**
   * 教学模式（普通，录播，直播等）
   */
  teachmode: string
  /**
   * 适用人群
   */
  users: string
}

/**
 * 课程营销信息
 */
export interface ICourseMarketDTO {
  /**
   * 收费规则，对应数据字典
   */
  charge?: string
  /**
   * 价格
   */
  price?: number
}
