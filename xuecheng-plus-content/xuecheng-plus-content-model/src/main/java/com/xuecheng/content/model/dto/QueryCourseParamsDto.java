package com.xuecheng.content.model.dto;

import lombok.Data;

@Data
public class QueryCourseParamsDto {//课程查询 条件模型类

    //审核状态
    private String auditStatus;

    //课程名称
    private String courseName;

    //发布状态
    private String publishStatus;

}
