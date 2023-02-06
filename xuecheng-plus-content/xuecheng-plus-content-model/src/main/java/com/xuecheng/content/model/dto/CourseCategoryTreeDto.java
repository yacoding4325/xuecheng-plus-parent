package com.xuecheng.content.model.dto;

import com.xuecheng.content.model.po.CourseCategory;
import lombok.Data;

import java.util.List;

/**
 * @author mrt
 * @version 1.0
 * @description TODO
 * @date 2022/12/10 10:08
 */
@Data
public class CourseCategoryTreeDto extends CourseCategory {
 List childrenTreeNodes;
}
