package com.xuecheng.content.model.dto;

import com.xuecheng.content.model.po.Teachplan;
import com.xuecheng.content.model.po.TeachplanMedia;
import lombok.Data;

import java.util.List;

/** 教学计划的 dto
 */
@Data
public class TeachplanDto extends Teachplan {

   //课程计划关联的媒资信息
   TeachplanMedia teachplanMedia;

    //子目录
   List<TeachplanDto> teachPlanTreeNodes;

}
