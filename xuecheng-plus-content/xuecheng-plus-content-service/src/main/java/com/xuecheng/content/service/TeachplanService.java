package com.xuecheng.content.service;

import com.xuecheng.content.model.dto.BindTeachplanMediaDto;
import com.xuecheng.content.model.dto.SaveTeachplanDto;
import com.xuecheng.content.model.dto.TeachplanDto;
import com.xuecheng.content.model.po.TeachplanMedia;

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

    /**
     * @description 教学计划绑定媒资
     * @param bindTeachplanMediaDto
     * @return com.xuecheng.content.model.po.TeachplanMedia
     */
    public TeachplanMedia associationMedia(BindTeachplanMediaDto bindTeachplanMediaDto);

    /**
     *
     * @param courseId
     * @return
     */
    List<TeachplanDto> findTeachplanTree(Long courseId);

}
