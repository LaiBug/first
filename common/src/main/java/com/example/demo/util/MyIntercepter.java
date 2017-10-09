package com.example.demo.util;


import com.example.demo.pojo.User;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by Administrator on 2017/5/12.
 */

public class MyIntercepter implements HandlerInterceptor {


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {
        System.out.print("preHandle");
        Object obj=request.getSession().getAttribute("currentUser");
        if (obj != null ) {
            User u=(User)obj;
            System.out.print("登录名为："+u.getUsername());
            return  true;
        }
        System.out.print("开始重定向");
        response.sendRedirect("/?msg=1");
        return false;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {
        System.out.print("postHandle");

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {
        System.out.print("afterCompletion");

    }
}
