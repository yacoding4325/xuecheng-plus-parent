/**
 * 课程计划
 */
export interface ICourseOutlineTreeNode {
  /**
   * 修改时间
   */
  changeDate?: Date
  /**
   * 课程标识
   */
  courseId: number
  /**
   * 课程发布标识
   */
  cousePubId?: number
  /**
   * 创建时间
   */
  createDate?: Date
  /**
   * 开始直播时间(仅限直播类型,直播时不能为空)
   */
  endTime?: Date
  /**
   * 层级，分为1、2、3级
   */
  grade?: number
  /**
   * 是否支持试学或预览, 1是免费，0或空是收费
   */
  isPreview?: string
  /**
   * 课程计划资源类型
   */
  mediaType: string
  /**
   * 排序字段
   */
  orderby?: number
  /**
   * 课程计划父级Id
   */
  parentid?: number
  /**
   * 课程计划名称
   */
  pname: string
  /**
   * 开始直播时间(仅限直播类型,直播时不能为空)
   */
  startTime?: Date
  /**
   * 发布状态
   */
  status?: string
  /**
   * 课程计划Id
   */
  teachPlanId?: number
  /**
   * 课程计划子级树形结构集合
   */
  teachPlanTreeNodes?: ICourseOutlineTreeNode[]
  /**
   * 课程计划媒体
   */
  teachplanMedia?: ITeachplanMediaDTO
  /**
   * 时长，单位时:分:秒
   */
  timelength?: string
  /**
   * 作业
   */
  work?: IWorkDTO

  /**
   * 修改标题
   */
  ctlEditTitle?: boolean
  /**
   * 显示bar
   */
  ctlBarShow?: boolean
}

/**
 * 课程计划媒体
 */
export interface ITeachplanMediaDTO {
  /**
   * 课程标识
   */
  courseId: number
  /**
   * 课程发布标识
   */
  coursePubId?: number
  /**
   * 媒资文件原始名称
   */
  mediaFileName?: string
  /**
   * 媒资信息标识
   */
  mediaId?: number
  /**
   * 课程计划标识
   */
  teachplanId?: number
  /**
   * 主键
   */
  teachplanMediaId?: number
}

/**
 * 作业
 */
export interface IWorkDTO {
  /**
   * 主键
   */
  teachplanWorkId?: number
  /**
   * 作业标题
   */
  workTitle?: string
  /**
   * 修改时间
   */
  changeDate?: Date
  /**
   * 课程标识
   */
  courseId: number
  /**
   * 课程发布标识
   */
  coursePubId?: number
  /**
   * 创建时间
   */
  createDate?: Date
  /**
   * 内容
   */
  question: string
  /**
   * 状态:使用态--1，删除态--0
   */
  status?: number
  /**
   * 课程计划标识
   */
  teachplanId: number
  /**
   * 标题
   */
  title: string
  /**
   * 创建人
   */
  username?: string
  /**
   * 作业Id值
   */
  workId?: number
}
