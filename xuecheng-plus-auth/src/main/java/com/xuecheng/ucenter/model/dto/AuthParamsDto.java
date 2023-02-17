package com.xuecheng.ucenter.model.dto;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

/**
 * @description 认证用户请求参数
 */
@Data
public class AuthParamsDto {

    private String username; //用户名

    private String password; //域  用于扩展

    private String cellphone;//手机号

    private String checkcode;//验证码

    private String checkcodekey;//验证码key

    private String authType; // 认证的类型   password:用户名密码模式类型    sms:短信模式类型

    private Map<String, Object> payload = new HashMap<>();
    //附加数据，作为扩展，不同认证类型可拥有不同的附加数据。
    // 如认证类型为短信时包含smsKey : sms:3d21042d054548b08477142bbca95cfa;
    // 所有情况下都包含clientId

}
