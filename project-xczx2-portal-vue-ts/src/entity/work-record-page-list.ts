/**
 * 分页结果集
 */
export interface IWorkRecordPageVO {
  /**
   * 数据记录总数
   */
  counts?: number
  first?: boolean
  /**
   * 数据列表
   */
  items?: ICourseWorkDTO[]
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

export interface ICourseWorkDTO {
  /**
   * 最后提交时间
   */
  commitedTime?: string
  /**
   * 机构ID
   */
  companyId?: number
  /**
   * 机构名称
   */
  companyName?: string
  /**
   * 课程名称
   */
  courseName?: string
  /**
   * 课程发布ID
   */
  coursePubId?: number
  courseWorkId?: number
  /**
   * 创建时间
   */
  createDate?: string
  /**
   * 最后批阅时间
   */
  reviewedTime?: string
  /**
   * 待批阅数
   */
  tobeReviewed?: number
  /**
   * 答题总人数
   */
  totalUsers?: number
  /**
   * 作业总数
   */
  workNumber?: number
}

/**
 * 作业批阅详情
 */
export interface IWorkRecOverallDTO {
  /**
   * 答题总数[作业数]
   */
  answerNumber?: number
  /**
   * 最后提交时间
   */
  commitedTime?: string
  /**
   * 提交作业总人数
   */
  committerNumber?: number
  /**
   * 机构ID
   */
  companyId?: number
  /**
   * 机构名称
   */
  companyName?: string
  /**
   * 课程名称
   */
  courseName?: string
  /**
   * 课程发布ID
   */
  coursePubId?: number
  courseWorkId?: number
  /**
   * 课程学习总人数
   */
  learnerNumber?: number
  recGroupDTOList?: IWorkRecGroupDTO[]
  /**
   * 最后批阅时间
   */
  reviewedTime?: string
  /**
   * 待批阅数
   */
  tobeReviewed?: number
  /**
   * 答题总人数
   */
  totalUsers?: number
  /**
   * 作业总数
   */
  workNumber?: number
}

/**
 * 作业提交记录, 按照课程章节分组
 */
export interface IWorkRecGroupDTO {
  /**
   * 课程发布标识
   */
  coursePubId?: number
  /**
   * 课程计划标识
   */
  teachplanId?: number
  /**
   * 课程计划名称
   */
  teachplanName?: string
  workRecordList?: IWorkRecordDTO[]
}

/**
 * 作业提交记录
 */
export interface IWorkRecordDTO {
  /**
   * 完成内容
   */
  answer?: string
  /**
   * 评语
   */
  correctComment?: string
  /**
   * 批改时间
   */
  correctionDate?: string
  /**
   * 课程发布标识
   */
  coursePubId: number
  /**
   * 提交时间
   */
  createDate?: string
  /**
   * 作业内容
   */
  question?: string
  /**
   * 状态
   */
  status?: string
  /**
   * 课程计划标识
   */
  teachplanId: number
  /**
   * 课程计划名称
   */
  teachplanName: string
  /**
   * 类型(文字，文件等)
   */
  type?: string
  /**
   * 作业提交人
   */
  username?: string
  /**
   * 作业标识
   */
  workId: number
  /**
   * 作业记录Id
   */
  workRecordId?: number
}
