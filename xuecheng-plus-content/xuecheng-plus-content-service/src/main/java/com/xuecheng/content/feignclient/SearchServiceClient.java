package com.xuecheng.content.feignclient;

/**
 * @Author yaCoding
 * @create 2023-02-17 下午 3:18
 */

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

/*** @description 搜索服务远程调用接口*/
@FeignClient(value = "search",fallbackFactory = SearchServiceClientFallbackFactory.class)
@RequestMapping("/search")
public interface SearchServiceClient {

    @PostMapping("/index/course")
    public Boolean add(@RequestBody CourseIndex courseIndex);

}
