package com.xuecheng.content.model.dto;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.xuecheng.content.model.po.Teachplan;
import com.xuecheng.content.model.po.TeachplanMedia;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @description 保存课程计划dto，包括新增、修改
 */
@Data
@ToString
public class SaveTeachplanDto {

 /***
  * 教学计划id
  */
 private Long id;

 /**
  * 课程计划名称
  */
 private String pname;

 /**
  * 课程计划父级Id
  */
 private Long parentid;

 /**
  * 层级，分为1、2、3级
  */
 private Integer grade;

 /**
  * 课程类型:1视频、2文档
  */
 private String mediaType;


 /**
  * 课程标识
  */
 private Long courseId;

 /**
  * 课程发布标识
  */
 private Long coursePubId;


 /**
  * 是否支持试学或预览（试看）
  */
 private String isPreview;

}
