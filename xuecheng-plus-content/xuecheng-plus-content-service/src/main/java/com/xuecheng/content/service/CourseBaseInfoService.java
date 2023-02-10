package com.xuecheng.content.service;

import com.xuecheng.base.model.PageParams;
import com.xuecheng.base.model.PageResult;
import com.xuecheng.content.model.dto.AddCourseDto;
import com.xuecheng.content.model.dto.CourseBaseInfoDto;
import com.xuecheng.content.model.dto.EditCourseDto;
import com.xuecheng.content.model.dto.QueryCourseParamsDto;
import com.xuecheng.content.model.po.CourseBase;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * @description 课程管理service
 * @author Mr.M
 * @date 2022/10/8 9:44
 * @version 1.0
 */
public interface CourseBaseInfoService {


 /**
  * @description 课程查询
  * @param params 分页参数
  * @param queryCourseParamsDto 查询条件
  * @return com.xuecheng.base.model.PageResult<com.xuecheng.content.model.po.CourseBase>
 */
  public PageResult<CourseBase>  queryCourseBaseList(PageParams params, QueryCourseParamsDto queryCourseParamsDto);

 /**
  * 新增课程
  * @param companyId 培训机构id
  * @param addCourseDto 新增课程的信息
  * @return 课程信息包括基本信息、营销信息
  */
  public CourseBaseInfoDto createCourseBase(Long companyId,AddCourseDto addCourseDto);

 /**
  * @description 修改课程信息
  * @param companyId  机构id，要校验本机构只能修改本机构的课程
  * @param dto  课程信息
  * @return com.xuecheng.content.model.dto.CourseBaseInfoDto
  */
 CourseBaseInfoDto updateCourseBase(Long companyId, EditCourseDto dto);

}
