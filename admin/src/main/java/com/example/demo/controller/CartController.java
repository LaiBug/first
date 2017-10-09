package com.example.demo.controller;


import com.example.demo.GoodsDao;
import com.example.demo.admin.AdminMsg;
import com.example.demo.pojo.Cart;
import com.example.demo.pojo.Customer;
import com.example.demo.pojo.Goods;
import com.example.demo.util.MyException;
import com.example.demo.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by Administrator on 2017/4/18.
 */
@Controller
@RequestMapping("/shop")
public class CartController {

    @Autowired
    private CartService cartServiceImpl;
    @Autowired
    private GoodsDao goodsDao;

    @RequestMapping("/toCart")
    public String toShow(){
        return "/shop/cart";
    }


    @RequestMapping("/getCart")
    @ResponseBody
    public AdminMsg getCart(HttpSession httpSession){
        Customer u=(Customer)httpSession.getAttribute("currentCustomer");
        if(isLogin(u)) {
            try {
                return new AdminMsg(null,true, cartServiceImpl.getCarts(u.getId()));
            } catch (MyException e) {
                e.printStackTrace();
                return null;
            }
        }
        return null;
    }
    @RequestMapping("/cart")
    @ResponseBody
    public List<Goods> report(@RequestParam(defaultValue = "1") String end, @RequestParam(defaultValue = "-1") String start,
                              @RequestParam(defaultValue = "1") String id){

            return  goodsDao.findAll();
    }





    @RequestMapping("/add")
    @ResponseBody
    public AdminMsg add(@RequestBody Cart cart, HttpSession httpSession){
        Customer u=(Customer)httpSession.getAttribute("currentCustomer");
        if(isLogin(u)) {
            cart.setCid(u.getId());
            cartServiceImpl.add(cart);
            return new AdminMsg("添加成功",true,null);
        }
        return new AdminMsg("请先登录",false,null);
    }
    @RequestMapping("/del")
    @ResponseBody
    public  List<Cart> del(String itemId,HttpSession httpSession){
        cartServiceImpl.delOne(itemId);
        return null;
    }

    @RequestMapping("/delAll")
    @ResponseBody
    public  List<Cart> delAll(HttpSession httpSession){
        Customer u=(Customer)httpSession.getAttribute("currentCustomer");
        cartServiceImpl.delAll(u.getId());
        return null;
    }
    @RequestMapping("/edit")
    @ResponseBody
    public  List<Cart> edit(String itemId,Double num){
        cartServiceImpl.edit(itemId,num);
        return null;
    }

    //判断是否已经登录
    private boolean isLogin(Customer u) {
      if(u==null){
       return false;
      }else {
          return true;
         }
    }
}
