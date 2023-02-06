package com.xuecheng.content.api;

import com.xuecheng.content.model.dto.CourseCategoryTreeDto;
import com.xuecheng.content.service.CourseCategoryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @Author yaCoding
 * @create 2023-02-06 下午 2:51
 */
@Slf4j
@RestController
@Api(value = "课程分类相关接口",tags = "课程分类相关接口")
public class CourseCategoryController {

    @Autowired
    CourseCategoryService courseCategoryService;

    @ApiOperation("课程分  类查询接口")
    @GetMapping("/course-category/tree-nodes")
    public List<CourseCategoryTreeDto> queryTreeNodes(){
        List<CourseCategoryTreeDto> courseCategoryTreeDtos = courseCategoryService.queryTreeNodes("1");
        return courseCategoryTreeDtos;
    }

}
