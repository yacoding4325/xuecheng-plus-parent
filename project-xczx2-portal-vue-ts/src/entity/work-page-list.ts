/**
 * 分页结果集
 */
export interface IWorkPageList {
  /**
   * 数据记录总数
   */
  counts?: number
  first?: boolean
  /**
   * 数据列表
   */
  items?: IWorkDTO[]
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
 * 作业DTO
 */
export interface IWorkDTO {
  /**
   * 绑定课程名称列表
   */
  bindCourses?: string[]
  /**
   * 修改时间
   */
  changeDate?: string
  /**
   * 创建时间
   */
  createDate?: string
  /**
   * 内容
   */
  question: string
  /**
   * 状态:使用态--1，删除态--0
   */
  status?: number
  /**
   * 标题
   */
  title: string
  /**
   * 创建人
   */
  username?: string
  /**
   * 答题人数
   */
  userNum?: number
  /**
   * 作业Id值
   */
  workId?: number
}

/**
 * 作业VO
 */
export interface IWorkVO {
  /**
   * 内容
   */
  question: string
  /**
   * 标题
   */
  title: string
  /**
   * 作业Id值
   */
  workId?: number
}
