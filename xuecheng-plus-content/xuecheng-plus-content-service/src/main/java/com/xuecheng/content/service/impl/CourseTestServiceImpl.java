package com.xuecheng.content.service.impl;

import com.xuecheng.content.mapper.CourseTestMapper;
import com.xuecheng.content.model.po.CourseTest;
import com.xuecheng.content.service.CourseTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

 @Service
public class CourseTestServiceImpl implements CourseTestService {

  @Autowired
 CourseTestMapper courseTestMapper;

 @Override
   public CourseTest addCourseTest(CourseTest courseTest) {
    int insert = courseTestMapper.insert(courseTest);
    return courseTest;
   }


}
