import { createAPI } from '@/utils/request'
import { IMyCoursePageList } from '@/entity/my-course'

// 分页列表
export async function getMyCoursePageList(parame: any): Promise<IMyCoursePageList> {
  const { data } = await createAPI('/learning/learnedRecords/list', 'post', parame)
  return data
}
