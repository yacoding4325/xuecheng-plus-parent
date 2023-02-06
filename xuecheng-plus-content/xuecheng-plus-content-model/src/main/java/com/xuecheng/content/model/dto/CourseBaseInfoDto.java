package com.xuecheng.content.model.dto;

/**
 * @Author yaCoding
 * @create 2023-02-06 下午 12:04
 */

import com.xuecheng.content.model.po.CourseBase;
import lombok.Data;

/*** @description 课程基本信息dto*/
@Data
public class CourseBaseInfoDto extends CourseBase {

    /**
     * 收费规则 对应数据字典
     */
    private String charge;

    /**
     * 价格
     */
    private Float price;


    /**
     * 原价
     */
    private Float originalPrice;

    /**
     * 咨询qq
     */
    private String qq;

    /**
     * 微信
     */
    private String wechat;

    /**
     * 电话
     */
    private String phone;

    /**
     * 有效期天数
     */
    private Integer validDays;

    /**
     * 大分类名称
     */
    private String mtName;

    /**
     * 小分类名称
     */
    private String stName;

}
