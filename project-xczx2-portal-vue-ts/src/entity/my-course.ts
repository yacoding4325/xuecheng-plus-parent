/**
 * 分页结果集
 */
export interface IMyCoursePageList {
  /**
   * 数据记录总数
   */
  counts?: number
  first?: boolean
  /**
   * 数据列表
   */
  items?: ICourseRecordDTO[]
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
 * 选课记录
 */
export interface ICourseRecordDTO {
  changeDate?: string
  /**
   * 课程所属机构标识
   */
  companyId?: number
  /**
   * 课程标识
   */
  courseId?: number
  /**
   * 课程发布ID
   */
  coursePubId?: number
  /**
   * 课程名称
   */
  coursePubName?: string
  /**
   * 主键
   */
  courseRecordId?: number
  /**
   * 创建时间
   */
  createDate?: string
  /**
   * 该课程用户是否已支付
   */
  paid?: number
  /**
   * 教育模式
   */
  teachmode?: string
  /**
   * 正在学习的课程计划章节Id
   */
  teachplanId?: number
  /**
   * 正在学习的课程计划章节名称
   */
  teachplanName?: string
  userId?: number
  /**
   * 选课人
   */
  userName?: string
}
