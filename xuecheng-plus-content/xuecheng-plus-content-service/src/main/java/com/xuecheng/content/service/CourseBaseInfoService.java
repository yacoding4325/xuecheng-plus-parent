package com.xuecheng.content.service;

import com.xuecheng.base.model.PageParams;
import com.xuecheng.base.model.PageResult;
import com.xuecheng.content.model.dto.AddCourseDto;
import com.xuecheng.content.model.dto.CourseBaseInfoDto;
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
}
