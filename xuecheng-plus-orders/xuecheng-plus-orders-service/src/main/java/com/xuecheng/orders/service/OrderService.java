package com.xuecheng.orders.service;

import com.xuecheng.orders.model.dto.AddOrderDto;
import com.xuecheng.orders.model.dto.PayRecordDto;
import com.xuecheng.orders.model.dto.PayStatusDto;
import com.xuecheng.orders.model.po.XcPayRecord;

/**
 * @Author yaCoding
 * @create 2023-02-19 下午 10:16
 */
//订单服务接口
public interface OrderService {

    /***
     * 创建商品订单
     * @param userId
     * @param addOrderDto
     * @return
     */
    public PayRecordDto createOrder(String userId, AddOrderDto addOrderDto);

    /**
     * 查询支付交易记录
     *
     * @param payNo
     * @return
     */
    XcPayRecord getPayRecordByPayno(String payNo);

    /**
     * 保存支付宝支付结果
     * 支付结果信息
     * @param payStatusDto
     */
    void saveAliPayStatus(PayStatusDto payStatusDto);

}
