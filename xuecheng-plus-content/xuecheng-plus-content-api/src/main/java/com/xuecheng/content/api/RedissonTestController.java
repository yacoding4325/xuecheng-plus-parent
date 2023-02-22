package com.xuecheng.content.api;

import org.redisson.api.RQueue;
import org.redisson.api.RedissonClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Queue;

/**
 * @Author yaCoding
 * @create 2023-02-22 下午 1:47
 */
@RestController
@RequestMapping("/redisson")
public class RedissonTestController {

    @Autowired
    RedissonClient redissonClient;

    /**
     * 入队
     */
    @GetMapping("/joinqueue")
    public Queue<String> joinqueue(String queuer) {
        //这个队列是否存在，如果不存在在redis中 创建
        RQueue<String> queue001 = redissonClient.getQueue("queue001");
        queue001.add(queuer);
        return queue001;
    }

    /**
     * 出队
     */
    @GetMapping("/removequeue")
    public String removequeue() {
        RQueue<String> queue001 = redissonClient.getQueue("queue001");
        String remove = queue001.remove();
        return remove;
    }

}
