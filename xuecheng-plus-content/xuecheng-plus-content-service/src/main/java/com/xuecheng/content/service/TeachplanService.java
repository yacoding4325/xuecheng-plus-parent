package com.xuecheng.content.service;

import com.xuecheng.content.model.dto.SaveTeachplanDto;
import com.xuecheng.content.model.dto.TeachplanDto;

import java.util.List;


/**
 * @Author yaCoding
 * @create 2023-02-10 下午 1:52
 */

public interface TeachplanService {

    List<TeachplanDto> findTeachplayTree(Long courseId);
    /**
     * 保存课程计划(新增/修改)
     * @param dto
     */
    void saveTeachplan(SaveTeachplanDto dto);

}
