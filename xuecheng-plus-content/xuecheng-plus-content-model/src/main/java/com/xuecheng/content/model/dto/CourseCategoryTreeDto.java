package com.xuecheng.content.model.dto;

import com.xuecheng.content.model.po.CourseCategory;
import lombok.Data;

import java.util.List;


@Data
//课程类别
public class CourseCategoryTreeDto extends CourseCategory {
 List childrenTreeNodes;
}
