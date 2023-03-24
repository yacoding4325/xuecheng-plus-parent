/**
 * 分页结果集
 */
export interface IMediaPageList {
  /**
   * 数据记录总数
   */
  counts?: number
  first?: boolean
  /**
   * 数据列表
   */
  items?: IMediaBaseDTO[]
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
 *
 * 媒资DTO
 */
export interface IMediaBaseDTO {
  /**
   * 审核意见
   */
  auditMind?: string
  /**
   * 审核状态
   */
  auditStatus?: string
  /**
   * 存储空间
   */
  bucket: string
  /**
   * 修改时间
   */
  changeDate?: string
  /**
   * 机构ID
   */
  companyId?: number
  /**
   * 机构名称
   */
  companyName?: string
  /**
   * 上传时间
   */
  createDate?: string
  /**
   * 文件标识， 七牛的key,视频的videoId
   */
  fileId: string
  /**
   * 文件名称
   */
  filename: string
  /**
   * 主键
   */
  id?: number
  /**
   * 备注
   */
  remark?: string
  /**
   * 状态
   */
  status?: number
  /**
   * 标签
   */
  tags?: string
  timelength?: string
  /**
   * 文件类型（文档，音频，视频）
   */
  type: string
  /**
   * 媒资文件访问地址
   */
  url?: string
  /**
   * 上传人
   */
  username?: string
  /**
   * 获取七牛云参数时返回的，用于验证file key
   */
  xc_key: string
}

/**
 * 七牛云上传需要的参数
 */
export interface IQnParamsDTO {
  scope: string
  key: string
  qnToken: string
  xc_key: string
  up_region: string
  domain: string
}

/**
 * 获取视频上传凭证
 */
export interface IVodTokenDTO {
  requestId?: string
  uploadAddress?: string
  uploadAuth?: string
  videoId?: string
  userId?: string
}
