package com.xuecheng.checkcode.model;

import lombok.Data;

import java.util.Map;

/**
 * @description 验证码生成参数类
 */
@Data
public class CheckCodeParamsDto {

    /**
     * 验证码类型:pic、sms、email等
     */
    private String checkCodeType;

    /**
     * 业务携带参数
     */
    private String param1;

    private String param2;

    private String param3;

}
