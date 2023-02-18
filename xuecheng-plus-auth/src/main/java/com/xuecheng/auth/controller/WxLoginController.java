package com.xuecheng.auth.controller;

import com.xuecheng.ucenter.model.po.XcUser;
import com.xuecheng.ucenter.service.impl.WxAuthServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;

/**
 * @Author yaCoding
 * @create 2023-02-18 下午 8:25
 */

@Controller
public class WxLoginController {

    @Autowired
    WxAuthServiceImpl wxAuthService;

    @RequestMapping("/wxLogin")
    public String wxLogin(String code , String state) throws IOException {
        //拿授权码申请令牌，查询用户
        XcUser xcUser = wxAuthService.wxAuth(code);
        if(xcUser == null){
            //重定向到一个错误页面
            return "redirect:http://www.xuecheng-plus.com/error.html";
        }else{
            String username = xcUser.getUsername();
            //重定向到登录页面，自动登录
            return "redirect:http://www.xuecheng-plus.com/sign.html?username="+username+"&authType=wx";
        }
    }

}
