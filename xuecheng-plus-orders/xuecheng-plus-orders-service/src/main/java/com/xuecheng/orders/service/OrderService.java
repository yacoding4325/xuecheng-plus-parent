package com.xuecheng.orders.service;

import com.xuecheng.orders.model.dto.AddOrderDto;
import com.xuecheng.orders.model.dto.PayRecordDto;

/**
 * @Author yaCoding
 * @create 2023-02-19 下午 10:16
 */
//订单服务接口
public interface OrderService {

    public PayRecordDto createOrder(String userId, AddOrderDto addOrderDto);
}
