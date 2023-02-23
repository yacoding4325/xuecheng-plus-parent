package com.xuecheng.learning.service;

import com.xuecheng.base.model.RestResponse;

/**
 * @Author yaCoding
 * @create 2023-02-20 下午 8:19
 */

//在线学习的service接口
public interface LearningService {


    /**
     * @description 获取教学视频
     * @param courseId 课程id
     * @param teachplanId 课程计划id
     * @param mediaId 视频文件id
     * @return com.xuecheng.base.model.RestResponse<java.lang.String>
     */
    public RestResponse<String> getVideo(String userId, Long courseId, Long teachplanId, String mediaId);

}
