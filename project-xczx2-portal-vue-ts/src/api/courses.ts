import { createAPI } from '@/utils/request'

import { ICoursePageList } from '@/entity/course-page-list'
import { ICourseCategory, ICourseBaseInfo } from '@/entity/course-add-base'
import { ICourseOutlineTreeNode } from '@/entity/course-add-outline'
import { ICourseTeacherList } from '@/entity/course-add-teacher'
import { ICoursePubDTO } from '@/entity/course-publish'

// 课程分类列表
export async function category(): Promise<ICourseCategory[]> {
  const { data } = await createAPI('/content/course-category/tree-nodes')
  return data
}

// 课程列表
export async function list(
  params: any = undefined,
  body: any = undefined
): Promise<ICoursePageList> {
  const { data } = await createAPI('/content/course/list', 'post', params, body)
  return data
}

// 提交审核
export async function commitCourse(courseBaseId: number): Promise<void> {
  await createAPI(`/content/courseaudit/commit/${courseBaseId}`, 'post')
}

// 课程发布
export async function publishCourse(courseBaseId: number): Promise<void> {
  await createAPI(`/content/coursepublish/${courseBaseId}`, 'post')
}

// 课程下架
export async function offlineCourse(courseBaseId: number): Promise<void> {
  await createAPI(`/content/courseoffline/${courseBaseId}`, 'get')
}


// 课程删除
export async function removeCourse(courseBaseId: number): Promise<void> {
  await createAPI(`/content/course/${courseBaseId}`, 'delete')
}

////////////////////////////////////////////////
// 第一步 基本信息
////////////////////////////////////////////////

// 读取 基本信息
export async function getBaseInfo(
  courseBaseId: number
): Promise<ICourseBaseInfo> {
  const { data } = await createAPI(`/content/course/${courseBaseId}`)
  return data
}

// 更新 基本信息
export async function submitBaseInfo(
  body: ICourseBaseInfo
): Promise<ICourseBaseInfo> {
  if (body.id !== undefined) {
    const { data } = await createAPI('/content/course', 'put', undefined, body)
    return data
  } else {
    const { data } = await createAPI('/content/course', 'post', undefined, body)
    return data
  }
}

////////////////////////////////////////////////
// 第二步 课程大纲
////////////////////////////////////////////////

// 读取完整列表
export async function getOutline(
  courseBaseId: number
): Promise<ICourseOutlineTreeNode> {
  const { data } = await createAPI(
    `/content/teachplan/${courseBaseId}/tree-nodes`
  )
  return data
}

// 保存节点
export async function submitOutlineNode(
  body: ICourseOutlineTreeNode
): Promise<ICourseOutlineTreeNode> {
  const { data } = await createAPI(
    '/content/teachplan',
    'post',
    undefined,
    body
  )
  return data
}

// 删除节点
export async function deleteOutlineNode(teachPlanId: number) {
  await createAPI(`/content/teachplan/${teachPlanId}`, 'delete')
}

//上移节点
export async function moveUpSubmit(teachPlanId: number) {
  await createAPI(`/content/teachplan/moveup/${teachPlanId}`, 'post')
}
//下移节点
export async function moveDownSubmit(teachPlanId: number) {
  await createAPI(`/content/teachplan/movedown/${teachPlanId}`, 'post')
}

// 媒资绑定
export async function mediaAssociation(mediaId: string, fileName:string,teachplanId: number) {
  await createAPI(`/content/teachplan/association/media`, 'post', undefined, {
    mediaId,
    fileName,
    teachplanId
  })
}

// 作业绑定
export async function workAssociation(
  teachplanId: number,
  workId: number,
  workTitle: string
) {
  await createAPI(`/content/teachplan/work/association`, 'post', undefined, {
    teachplanId,
    workId,
    workTitle
  })
}

// 媒资解绑
export async function mediaUnAssociation(
  teachplanId: number,
  mediaId: string,
  courseBaseId: number
) {
  await createAPI(`/content/teachplan/association/media/${teachplanId}/${mediaId}`, 'delete', {
   
  })
}

// 作业绑定
export async function workUnAssociation(
  teachplanWorkId: number,
  courseBaseId: number
) {
  await createAPI(`/content/teachplan/work/${teachplanWorkId}`, 'delete', {
    courseBaseId
  })
}

////////////////////////////////////////////////
// 第三步 课程教师
////////////////////////////////////////////////

// 读取完整列表
export async function getTeachers(
  courseBaseId: number
): Promise<ICourseTeacherList[]> {
  const { data } = await createAPI(
    `/content/courseTeacher/list/${courseBaseId}`
  )
  for(let key in data){
    if(data[key].photograph){
      data[key].photograph = `${process.env.VUE_APP_SERVER_PICSERVER_URL}` + data[key].photograph
    }
  }


  return data
}

// 保存教师
export async function submitTeacher(
  body: ICourseTeacherList
): Promise<ICourseOutlineTreeNode> {
  const { data } = await createAPI(
    '/content/courseTeacher',
    'post',
    undefined,
    body
  )
  return data
}

// 删除教师
export async function deleteTeacher(
  courseBaseId: number,
  courseTeacherId?: number
) {
  await createAPI(
    `/content/courseTeacher/course/${courseBaseId}/${courseTeacherId}`,
    'delete'
  )
}
