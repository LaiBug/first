package com.example.demo.controller;

import com.example.demo.pojo.Goods;
import com.example.demo.util.MyException;
import com.example.demo.service.GoodsService;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;


/**
 * Created by Administrator on 2017/4/7.
 */

@Controller
@RequestMapping("/admin/goods")
public class GoodsController {
    @Autowired
    protected GoodsService goodsServiceImpl;

    @RequestMapping(value={"","/"})
    public String GoodsHtml(){
        return "/goods/showGoods";
    }

    @RequestMapping("/getGoods")
    @ResponseBody
    public Page<Goods> findAll(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "-1") String keyWord,
                               @RequestParam(defaultValue = "-1") String typeName, @RequestParam(defaultValue = "5")int count){
        Sort sort=new Sort(Sort.Direction.DESC, "addDate");


        return goodsServiceImpl.find(keyWord,typeName,new PageRequest(pageNo - 1,count, sort));
    }
    /*
    去添加商品界面
     */
    @RequestMapping("/toadd")
    public String toAdd(){
        return "/goods/addGoods";
    }
    /*
    添加商品的方法
     */
    @RequestMapping(value = "/add",method = RequestMethod.POST)
    public String add(Goods goods, ModelMap map, @RequestParam String types,@RequestParam("pic") MultipartFile pic){
        if (!pic.isEmpty()) {
            goods.setPics(this.upload(pic, goods));
        }else {
            goods.setPics("-1");
        }

        try {
            goodsServiceImpl.add(goods);
        } catch (MyException e) {
            map.addAttribute("msg",e.getMessage());
            return this.toAdd();
        }
        return this.GoodsHtml();
    }
    /*
    删除商品的方法
     */
    @RequestMapping("/del")
    public String del(String itemId){
        goodsServiceImpl.del(itemId);
        return this.GoodsHtml();
    }
    /*
    去编辑商品页面
     */
    @RequestMapping("/toEdit")
    public String toEdit(String id,ModelMap model){
       model.addAttribute("items", goodsServiceImpl.getById(id));
            return "/goods/editGoods";
    }
    /*
    编辑商品
     */
    @RequestMapping("/edit")
    public String Edit(Goods goods,ModelMap modelMap,@RequestParam("pic") MultipartFile pic){
        if (!pic.isEmpty()) {
            goods.setPics(this.upload(pic, goods));
        }else {
            goods.setPics("-1");
        }
        try {
            goods.setAddDate(goodsServiceImpl.getById(goods.getId()).getAddDate());
            goodsServiceImpl.edit(goods);
        } catch (MyException e) {
          modelMap.addAttribute("msg",e.getMessage());
            modelMap.addAttribute("items",goods);
            return "/goods/editGoods";
        }

        modelMap.addAttribute("msg","修改成功");
        return "/goods/showGoods";
    }
    public String upload(MultipartFile pic,Goods goods){
        String fileName = pic.getOriginalFilename();
        // 获取文件名

        // 获取文件的后缀名
        String suffixName = fileName.substring(fileName.lastIndexOf("."));

        // 文件上传后的路径
//            String filePath=System.getProperty("user.dir")+"/src/main/resources/static";
//        String filePath=System.getProperty("user.dir")+"/target/classes/static/pics/goods/";
        String filePath1=System.getProperty("user.dir")+"/admin/target/classes/static/pics/goods/";
        String filePath="C:/Users/Administrator/Desktop/BOMAMO2/admin/src/main/resources/static/pics/goods/";
        SimpleDateFormat myFmt2=new SimpleDateFormat("yyyyMMddHHmmss");
        fileName = myFmt2.format(new Date()) + suffixName;
        File dest1 = new File(filePath1 + fileName);
        File dest = new File(filePath + fileName);

        try {
            pic.transferTo(dest1);
        } catch (Exception e) {
            System.out.println("xxx");
        }
        FileInputStream ins = null;
        FileOutputStream out=null;
        try {
            ins = new FileInputStream(dest1);
            out = new FileOutputStream(dest);
            byte[] b = new byte[1024];
            int n=0;
            while( (n =ins.read(b))!=-1){
                out.write(b, 0, b.length);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            if(ins!=null)ins.close();
            if(out!=null) out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return fileName;
    }

}
