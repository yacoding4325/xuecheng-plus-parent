package com.xuecheng.content.model.po;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 */
@Data
@TableName("course_test")
public class CourseTest implements Serializable {

 private Long id;

 private String name;

 private Float price;

 private String qq;

 private String wechat;

 private String phone;

 private String description;

 private LocalDateTime createdate;

}
