/**
 * 课程分类
 */
export interface ICourseCategory {
  /**
   * 课程分类子节点数据
   */
  categoryTreeNodes?: { [key: string]: any }[]
  /**
   * 主键
   */
  courseCategoryId?: string
  /**
   * 是否叶子
   */
  isLeaf?: number
  /**
   * 是否显示
   */
  isShow?: number
  /**
   * 分类标签默认和名称一样
   */
  label?: string
  /**
   * 分类名称
   */
  name?: string
  /**
   * 排序字段
   */
  orderby?: number
  /**
   * 父结点id
   */
  parentid?: string
}

/**
 * 课程基本信息
 */
export interface ICourseBaseInfo {
  /**
   * 审核时间
   */
  auditDate?: Date
  /**
   * 审核意见
   */
  auditMind?: string
  /**
   * 审核状态：CourseAuditEnum
   */
  auditStatus?: string
  changeDate?: Date
  /**
   * 更新人
   */
  changePeople?: string
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
  //courseBaseId?: number
  id?: number
  /**
   * 课程营销信息
   */
  courseMarket?: ICourseMarketDTO
  createDate?: Date
  /**
   * 创建人
   */
  createPeople?: string
  /**
   * 课程介绍
   */
  description?: string
  /**
   * 课程目标
   */
  objectives?: string
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
   * 原始价格
   */
   originalPrice?: number
  
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
  /**
   * qq
   */
   qq: string
  /**
   * wechat
   */
   wechat: string
     /**
   * phone
   */
      phone: string
        /**
   * 有效期天数
   */
         validDays: number 
  /**
   * UI 分类选中
   */
  uiCategoryTreeSelected?: string[]
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
