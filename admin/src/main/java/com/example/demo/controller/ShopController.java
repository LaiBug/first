package com.example.demo.controller;


import com.example.demo.pojo.Bulletin;
import com.example.demo.pojo.Goods;
import com.example.demo.service.BulletinService;
import com.example.demo.service.GoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Administrator on 2017/4/21.
 */
@Controller
@SessionAttributes("uuid")
@RequestMapping("/shop")
public class ShopController {

    @Autowired
    private GoodsService goodsServiceImpl;
    @Autowired
    private BulletinService bulletinServiceImpl;

    @RequestMapping("")
    public String toShop(ModelMap modelMap){
        modelMap.addAttribute("uuid", "123456");
        return "shop/index";
    }

    @PostMapping("/toTest/{appKey}")
    @ResponseBody
    public String tossss( @RequestBody String body,@PathVariable("appKey") String appKey){
        System.out.println(body);
        return null;
    }


    @RequestMapping("/getGoods")
    @ResponseBody
    public Page<Goods>  getGoods(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "-1") String keyWord,
                                 @RequestParam(defaultValue = "-1") String typeName, @RequestParam(defaultValue = "6")int count){
        Sort sort=new Sort(Sort.Direction.DESC, "addDate");
        return goodsServiceImpl.find(keyWord,typeName,new PageRequest(pageNo - 1,count, sort));
    }
    @RequestMapping("/getBulletin")
    @ResponseBody
    public Page<Bulletin> getBulletin(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "-1") String keyWord,
                                      @RequestParam(defaultValue = "5")int count){
        Sort sort=new Sort(Sort.Direction.DESC, "addDate");

        return   bulletinServiceImpl.find(keyWord, new PageRequest(pageNo - 1, count, sort));
    }
    @RequestMapping("/getDiscount")
    @ResponseBody
    public Page<Goods>  getDiscount(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "-1") String keyWord,
                                 @RequestParam(defaultValue = "-1") String typeName, @RequestParam(defaultValue = "8")int count){
        Sort sort=new Sort(Sort.Direction.ASC , "discount");
        return goodsServiceImpl.find(keyWord,typeName,new PageRequest(pageNo - 1,count, sort));
    }
}
