package com.example.demo.controller;
import com.example.demo.pojo.User;
import com.example.demo.util.MyException;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import javax.servlet.http.HttpSession;

/**
 * Created by Administrator on 2017/3/30.
 */
@Controller
@SessionAttributes("currentUser")
public class UserController {

    @Autowired
    private UserService userService;

    private User currentUser;
    String msg= null;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public String add(String username, String password){
        User user=new User();
        user.setPassword(password);
        user.setUsername(username);
        System.out.print(user.getUsername());
        userService.add(user);
        return "user";
    }

    /**登录方法
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(User currentUser,ModelMap model,HttpSession httpSession){
            try {
                currentUser = userService.login(currentUser);
            } catch (MyException e) {//捕获登录可能出现的错误情况，返回页面msg显示
                model.addAttribute("msg", e.getMessage());
                return "login2";
            }
            model.addAttribute("currentUser", currentUser);
            return  "redirect:/admin";

    }
    @RequestMapping(value = "/admin", method = RequestMethod.GET)
    public String admin(){
        return "index";

    }


    @RequestMapping("toadmin")
    public String toadmin(){
        return "index";
    }


    /** 对“/”,"/tologin"路径进行转发去登录界面
     *
     * @param
     * @return
     */
    @RequestMapping(value = {"/","/tologin"},method = RequestMethod.GET)
        public String index(ModelMap modelMap,String msg) {
            if(msg!=null&&msg.equals("1")){
                modelMap.addAttribute("msg","请先登录");
            }
            return "login2";
        }

    @RequestMapping("/loginOut")
    public String loginOut(@ModelAttribute("currentUser") User currentUser, SessionStatus sessionStatus){
        //@ModelAttribute("User")相当于将session中名为"User"的对象注入user对象中
        //sessionStatus中的setComplete方法可以将session中的内容全部清空
        sessionStatus.setComplete();
        return "redirect:/";
    }

    @RequestMapping("/admin/user")
    public String toSelff(HttpSession httpSession,ModelMap modelMap){
        modelMap.addAttribute("user",httpSession.getAttribute("currentUser"));
        return "/user/myInfo";
    }
    @RequestMapping("/admin/user/edit")
    public String userEdit(User user, ModelMap modelMap){
        try {
            userService.save(user);
        } catch (MyException e) {
            modelMap.addAttribute("msg",e.getMessage());
            modelMap.addAttribute("user",user);
            return "/user/myInfo";
        }
        modelMap.addAttribute("currentUser",user);
        modelMap.addAttribute("user",user);
         return "/user/myInfo";
    }
    @RequestMapping("/admin/report")
    public String report(HttpSession httpSession,ModelMap modelMap){
        modelMap.addAttribute("user",httpSession.getAttribute("currentUser"));
        return "report";
    }
}


