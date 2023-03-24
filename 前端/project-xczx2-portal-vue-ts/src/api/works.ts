import { createAPI } from '@/utils/request'
import { IWorkPageList, IWorkDTO, IWorkVO } from '@/entity/work-page-list'

export const defaultWork: IWorkVO = {
  question: '',
  title: ''
}

// 分页条件查询课程计划作业列表
export async function getWorkPageList(
  params: any = undefined,
  body: any = undefined
): Promise<IWorkPageList> {
  const { data } = await createAPI('/teaching/work/list', 'post', params, body)
  return data
}

// 添加或修改课程计划作业--教师
export async function addWork(body: any): Promise<IWorkDTO> {
  const { data } = await createAPI('/teaching/work', 'post', null, body)
  return data
}

// 删除课程计划的作业
export async function deleteWork(workId: number): Promise<IWorkDTO> {
  const { data } = await createAPI(`/teaching/work/${workId}`, 'delete')
  return data
}
