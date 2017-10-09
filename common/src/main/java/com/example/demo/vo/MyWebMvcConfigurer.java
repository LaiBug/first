package com.example.demo.vo;

//import com.xp.dsp.intercepter.LoginInterceptor;

import com.example.demo.util.MyIntercepter;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by Skyline on 2016/6/11.
 */
@Configuration
public class MyWebMvcConfigurer extends WebMvcConfigurerAdapter {


    /**
     * 新增拦截器
     * addPathPatterns 用于添加拦截规则
     * excludePathPatterns 用户排除拦截
     * @param registry
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(new LoginInterceptor()).addPathPatterns("/**");
        registry.addInterceptor(new MyIntercepter()).addPathPatterns("/admin/**");
    }

}
