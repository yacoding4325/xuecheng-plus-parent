package com.xuecheng.content.api;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @Author yaCoding
 * @create 2023-02-17 下午 4:01
 */

@Controller//因为freemarker返回页面不是json这里使用 @Controller
public class FreemarkerController {

    @GetMapping("/testfreemarker")
    public ModelAndView test() {

        ModelAndView modelAndView = new ModelAndView();
        //准备模型数据
        modelAndView.addObject("name","小明");
        //设置视图的名称，就是模板文件的名称(去掉扩展名)
        modelAndView.setViewName("test");

        return modelAndView;

    }
}

