package com.xuecheng.content.model.dto;

import com.xuecheng.content.model.po.CourseCategory;
import lombok.Data;

import java.util.List;

/**
 * @Author yaCoding
 * @create 2023-02-06 上午 11:19
 */

@Data
public class CourseCategoryTreeDto extends CourseCategory {
    List childrenTreeNodes;
}
