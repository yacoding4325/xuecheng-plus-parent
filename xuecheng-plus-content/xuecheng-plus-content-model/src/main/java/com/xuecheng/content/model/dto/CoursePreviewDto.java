package com.xuecheng.content.model.dto;

import lombok.Data;

import java.util.List;

/**
 * @description 课程预览模型类

 */
@Data
public class CoursePreviewDto {

 //课程基本信息，营销信息
 private CourseBaseInfoDto courseBase;

 //课程计划信息
 private List<TeachplanDto> teachplans;

 //课程师资信息...

}
