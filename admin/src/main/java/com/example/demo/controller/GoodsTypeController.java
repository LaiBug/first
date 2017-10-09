package com.example.demo.controller;

import com.example.demo.pojo.GoodsType;
import com.example.demo.util.MyException;
import com.example.demo.service.GoodsTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by Administrator on 2017/4/7.
 */

@Controller
@RequestMapping("/admin/goodsType")
public class GoodsTypeController {
    @Autowired
    private GoodsTypeService goodsTypeServiceImpl;


    @RequestMapping(value={"","/"})
    public String GoodsTypeHtml(){
        return "/goods/showType";
    }


    @RequestMapping("/getGoodsType")
    @ResponseBody
    public Page<GoodsType> findAll(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "-1") String name, @RequestParam(defaultValue = "5")int count){
        Sort sort=new Sort(Sort.Direction.DESC, "addDate");
         return goodsTypeServiceImpl.find(name,new PageRequest(pageNo - 1,count, sort));
    }
    @RequestMapping("/toadd")
    public String toAdd(ModelMap map){
        map.addAttribute("typeName","");
        return "/goods/addGoodsType";
    }

    @RequestMapping(value = "/add",method = RequestMethod.POST)
    public String add(GoodsType goodsType, ModelMap map){
        try {
            goodsTypeServiceImpl.add(goodsType);
        } catch (MyException e) {
            map.addAttribute("msg",e.getMessage());
            map.addAttribute("typeName",goodsType.getTypeName());
            return "/goods/addGoodsType";
        }
        map.addAttribute("msg","添加成功");
        return "/goods/showType";
    }
    @RequestMapping("/del")
    public String del(String itemId){
        goodsTypeServiceImpl.del(itemId);
        return "/goods/showType";
    }

    @RequestMapping("/getGoodsType2")
    @ResponseBody
    public List<GoodsType> findForoGoodsHtml(){
        return goodsTypeServiceImpl.findAll();
    }

    @RequestMapping("/toEdit")
    public String toEdit(String id,ModelMap model){
        GoodsType g= goodsTypeServiceImpl.findById(id);
        model.addAttribute("type", goodsTypeServiceImpl.findById(id));
        return "/goods/editGoodsType";
    }
    @RequestMapping("/edit")
    public String edit(GoodsType goodsType,ModelMap modelMap){
        try {
            GoodsType g= goodsTypeServiceImpl.findById(goodsType.getId());
            goodsType.setAddDate(g.getAddDate());
            goodsTypeServiceImpl.edit(goodsType);

        } catch (MyException e) {
            modelMap.addAttribute("msg",e.getMessage());
            modelMap.addAttribute("type",goodsType);
            return "/goods/editGoodsType";
        }
        modelMap.addAttribute("msg","修改成功");
        return "/goods/showType";
    }
}
