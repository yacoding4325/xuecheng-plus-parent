/**
 * 分页结果集
 */
export interface ICourseCommentPageVO {
  /**
   * 数据记录总数
   */
  counts?: number
  first?: boolean
  /**
   * 数据列表
   */
  items?: ICommentDTO[]
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
 * 对象评论DTO
 */
export interface ICommentDTO {
  belongTo?: number
  comeFrom?: string
  /**
   * 评论时间
   */
  commentDate?: string
  commentId?: number
  /**
   * 评论内容
   */
  commentText?: string
  /**
   * 是否禁止回复  1禁止 0允许
   */
  forbidReply?: number
  /**
   * 用户昵称
   */
  nickName?: string
  /**
   * 点赞数量
   */
  praiseNum?: number
  replyDTOList?: ICommentReplyDTO[]
  /**
   * 用户评分0-5
   */
  starRank?: number
  /**
   * 评论对象ID
   */
  targetId?: number
  /**
   * 评论对象名称
   */
  targetName?: string
  /**
   * 评论对象类型
   */
  targetType?: string
  /**
   * 用户头像
   */
  userHead?: string
  /**
   * 用户ID
   */
  userId?: number
  /**
   * 用户名
   */
  userName?: string
}

/**
 * 回复评论DTO
 */
export interface ICommentReplyDTO {
  /**
   * 评论记录ID
   */
  commentId?: number
  /**
   * 是否禁止回复  1禁止 0允许
   */
  forbidReply?: number
  /**
   * 用户昵称
   */
  nickName?: string
  parentId?: number
  /**
   * 点赞数量
   */
  praiseNum?: number
  /**
   * 回复时间
   */
  replyDate?: string
  replyId?: number
  replyText?: string
  userId?: number
  /**
   * 用户名
   */
  userName?: string
}
