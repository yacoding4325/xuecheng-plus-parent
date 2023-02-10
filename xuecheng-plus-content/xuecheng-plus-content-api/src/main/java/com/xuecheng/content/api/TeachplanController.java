package com.xuecheng.content.api;

import com.xuecheng.content.model.dto.SaveTeachplanDto;
import com.xuecheng.content.service.TeachplanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author yaCoding
 * @create 2023-02-10 下午 1:52
 */

@RestController
public class TeachplanController {

    @Autowired
    private TeachplanService teachplanService;

//    @GetMapping("/teachplan/{courseId}/tree-nodes")
//    public List<TeachplanDto> getTreeNodes(@PathVariable Long courseId){
//        return teachplanService.findTeachplayTree(courseId);
//    }

    @PostMapping("/teachplan")
    public void saveTeachplan(@RequestBody SaveTeachplanDto dto){
        teachplanService.saveTeachplan(dto);
    }

}
