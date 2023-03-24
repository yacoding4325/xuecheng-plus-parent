/**
 * 课程发布
 */
export interface ICoursePubDTO {
  /**
   * 修改时间
   */
  changeDate?: string;
  /**
   * 收费规则，对应数据字典--203
   */
  charge?: string;
  /**
   * 机构ID
   */
  companyId?: number;
  /**
   * 公司名称
   */
  companyName?: string;
  /**
   * 课程标识
   */
  courseId?: number;
  /**
   * 课程营销信息
   */
  courseMark?: ICourseMarketDTO;
  /**
   * 主键
   */
  coursePubId?: number;
  /**
   * 发布时间
   */
  createDate?: string;
  /**
   * 课程介绍
   */
  description?: string;
  /**
   * 课程等级
   */
  grade?: string;
  /**
   * 是否最新课程
   */
  isLatest?: number;
  /**
   * 是否发布(1发布 0取消发布)
   */
  isPub?: number;
  /**
   * 大分类
   */
  mt?:     string;
  mtName?: string;
  /**
   * 课程名称
   */
  name?: string;
  /**
   * 课程图片
   */
  pic?: string;
  /**
   * 现价
   */
  price?: number;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 小分类
   */
  st?:     string;
  stName?: string;
  /**
   * 标签
   */
  tags?: string;
  /**
   * 课程的教师信息
   */
  teacherList?: ICourseTeacherDTO[];
  /**
   * 教育模式(common普通，record 录播，live直播等）
   */
  teachmode?: string;
  /**
   * 课程计划
   */
  teachPlans?: ITeachplanDTO;
  /**
   * 创建人
   */
  username?: string;
  /**
   * 适用人群
   */
  users?: string;
  /**
   * 有效性，对应数据字典--204
   */
  valid?: string;
}

/**
 * 课程营销信息
 */
export interface ICourseMarketDTO {
  /**
   * 收费规则，对应数据字典
   */
  charge?: string;
  /**
   * 价格
   */
  price?: number;
}

/**
 * 课程计划
 */
export interface ITeachplanDTO {
  /**
   * 修改时间
   */
  changeDate?: string;
  /**
   * 课程标识
   */
  courseId: number;
  /**
   * 课程发布标识
   */
  cousePubId?: number;
  /**
   * 创建时间
   */
  createDate?: string;
  /**
   * 开始直播时间(仅限直播类型,直播时不能为空)
   */
  endTime?: string;
  /**
   * 层级，分为1、2、3级
   */
  grade?: number;
  /**
   * 是否支持试学或预览, 1是免费，0或空是收费
   */
  isPreview?: string;
  /**
   * 课程计划资源类型
   */
  mediaType: string;
  /**
   * 排序字段
   */
  orderby?: number;
  /**
   * 课程计划父级Id
   */
  parentid?: number;
  /**
   * 课程计划名称
   */
  pname: string;
  /**
   * 开始直播时间(仅限直播类型,直播时不能为空)
   */
  startTime?: string;
  /**
   * 发布状态
   */
  status?: string;
  /**
   * 课程计划Id
   */
  teachPlanId?:    number;
  teachplanMedia?: ITeachplanMediaDTO;
  /**
   * 课程计划子级树形结构集合
   */
  teachPlanTreeNodes?: { [key: string]: any }[];
  /**
   * 时长，单位时:分:秒
   */
  timelength?: string;
  /**
   * 课程大纲-作业绑定
   */
  work?: ITeachplanWorkDTO;
}

export interface ITeachplanMediaDTO {
  /**
   * 课程标识
   */
  courseId: number;
  /**
   * 课程发布标识
   */
  coursePubId?: number;
  /**
   * 媒资文件原始名称
   */
  mediaFileName: string;
  /**
   * 媒资信息标识
   */
  mediaId: number;
  /**
   * 课程计划标识
   */
  teachplanId: number;
  /**
   * 主键
   */
  teachplanMediaId?: number;
}

/**
 * 课程大纲-作业绑定
 */
export interface ITeachplanWorkDTO {
  /**
   * 课程标识
   */
  courseId: number;
  /**
   * 课程发布标识
   */
  coursePubId?: number;
  /**
   * 课程计划标识
   */
  teachplanId: number;
  /**
   * 主键
   */
  teachplanWorkId?: number;
  /**
   * 作业标识
   */
  workId: number;
  /**
   * 作业标题
   */
  workTitle: string;
}

/**
 * 课程-教师关系表
 */
export interface ICourseTeacherDTO {
  /**
   * 课程标识
   */
  courseId:     number;
  coursePubId?: number;
  /**
   * 主键
   */
  courseTeacherId?: number;
  createDate?:      string;
  /**
   * 教师简介
   */
  introduction?: string;
  /**
   * 照片
   */
  photograph: string;
  /**
   * 教师职位
   */
  position: string;
  /**
   * 教师姓名
   */
  teacherName: string;
}
