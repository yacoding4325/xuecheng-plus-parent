/**
 * 分页结果集
 */
export interface ILivePageList {
  /**
   * 数据记录总数
   */
  counts?: number
  first?: boolean
  /**
   * 数据列表
   */
  items?: ILiveCourseDTO[]
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
 * 直播课程
 */
export interface ILiveCourseDTO {
  /**
   * 课程标识
   */
  courseId?: number
  /**
   * 课程名称
   */
  courseName?: string
  coursePubId?: number
  createDate?: string
  /**
   * 主键
   */
  id?: number
  /**
   * 1是免费，0或空是收费
   */
  isPreview?: string
  /**
   * 直播结束时间
   */
  liveEnd?: string
  /**
   * 直播开始时间
   */
  liveStart?: string
  /**
   * 播放地址
   */
  playUrl?: string
  /**
   * 推流地址
   */
  pushUrl?: string
  /**
   * 课程计划标识
   */
  teachplanId?: number
  /**
   * 课程大纲名称
   */
  teachplanName?: string
  /**
   * 直播人
   */
  username?: string
}

/**
 * 直播推流地址
 */
export interface IPushUrlDTO {
  message?: string
  playUrl?: string
  pushUrl?: string
  state?: number
}
