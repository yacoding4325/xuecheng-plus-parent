/**
 * 课程-教师关系表
 */
export interface ICourseTeacherList {
  /**
   * 课程标识
   */
  courseId?: number
  coursePubId?: number
  /**
   * 主键
   */
  courseTeacherId?: number
  createDate?: Date
  /**
   * 教师简介
   */
  introduction?: string
  /**
   * 照片
   */
  photograph?: string
  /**
   * 教师职位
   */
  position?: string
  /**
   * 教师姓名
   */
  teacherName?: string
}
