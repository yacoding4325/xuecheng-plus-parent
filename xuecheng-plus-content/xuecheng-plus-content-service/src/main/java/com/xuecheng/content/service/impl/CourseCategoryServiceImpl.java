package com.xuecheng.content.service.impl;

import com.xuecheng.content.mapper.CourseCategoryMapper;
import com.xuecheng.content.model.dto.CourseCategoryTreeDto;
import com.xuecheng.content.service.CourseCategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


@Slf4j
@Service
public class CourseCategoryServiceImpl implements CourseCategoryService {

    @Autowired
    CourseCategoryMapper courseCategoryMapper;


    @Override
    public List<CourseCategoryTreeDto> queryTreeNodes(String id) {
        //得到了根结点下边的所有子结点
        List<CourseCategoryTreeDto> categoryTreeDtos = courseCategoryMapper.selectTreeNodes(id);

        //定义 一个List作为最终返回的数据
        List<CourseCategoryTreeDto> courseCategoryTreeDtos = new ArrayList<>();
        //为了方便找子结点的父结点，定义 一个map
        HashMap<String,CourseCategoryTreeDto> nodeMap = new HashMap<>();
        //将数据封装到List中，只包括了根结点的直接下属结点
        categoryTreeDtos.stream().forEach(item->{
            nodeMap.put(item.getId(),item);
            if(item.getParentid().equals(id)){
                courseCategoryTreeDtos.add(item);
            }
            //找到该结点的父结点
            String parentid = item.getParentid();
            //找到该结点的父结点对象
            CourseCategoryTreeDto parentNode = nodeMap.get(parentid);
            if(parentNode!=null){
                List childrenTreeNodes = parentNode.getChildrenTreeNodes();
                if(childrenTreeNodes == null){
                    parentNode.setChildrenTreeNodes(new ArrayList<CourseCategoryTreeDto>());
                }
                //找到子结点，放到它的父结点的childrenTreeNodes属性中
                parentNode.getChildrenTreeNodes().add(item);
            }

        });

        //返回的list中只包括了根结点的直接下属结点
        return courseCategoryTreeDtos;
    }
}
