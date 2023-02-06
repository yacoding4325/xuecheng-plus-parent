package com.xuecheng.content.service;

import com.xuecheng.content.model.dto.CourseCategoryTreeDto;

import java.util.List;

/**
 * @version 1.0
 * @description 课程分类操作相关的service
 */
public interface CourseCategoryService {

    /**
     * 课程分类查询
     * @param id 根结点id
     * @return 根结点下边的所有子结点
     */
    List<CourseCategoryTreeDto>  queryTreeNodes(String id);
}
