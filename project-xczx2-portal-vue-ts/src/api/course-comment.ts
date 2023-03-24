import { createAPI } from '@/utils/request'
import {
  ICourseCommentPageVO,
  ICommentReplyDTO
} from '@/entity/course-comment-page-list'

// 课程的评论列表
export async function getCourseCommentPageList(
  params: any,
  body: any
): Promise<ICourseCommentPageVO> {
  const { data } = await createAPI(
    '/teaching/course-comment/list',
    'post',
    params,
    body
  )
  return data
}

// 课程评论回复
export async function replyCourseComment(body: any): Promise<ICommentReplyDTO> {
  const { data } = await createAPI(
    '/teaching/course-comment-reply',
    'post',
    null,
    body
  )
  return data
}
