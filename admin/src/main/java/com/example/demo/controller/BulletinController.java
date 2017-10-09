package com.example.demo.controller;


import com.example.demo.pojo.Bulletin;
import com.example.demo.pojo.User;
import com.example.demo.util.MyException;
import com.example.demo.service.BulletinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by Administrator on 2017/4/24.
 */
@Controller
@RequestMapping("/admin/bulletin")
public class BulletinController {

    @Autowired
    private BulletinService bulletinServiceImpl;

    @RequestMapping("")
    public String bulletin(){
        return "/bulletin/showBulletin";
    }

    @RequestMapping("/getBulletin")
    @ResponseBody
    public Page<Bulletin> getBulletin(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "-1") String keyWord,
                                      @RequestParam(defaultValue = "5")int count){
        Sort sort=new Sort(Sort.Direction.DESC, "addDate");

        return    bulletinServiceImpl.find(keyWord, new PageRequest(pageNo - 1, count, sort));
    }

    @RequestMapping("/toAdd")
    public String toAdd(){
        return "bulletin/addBulletin";
    }

    @RequestMapping("/add")
    public String add(Bulletin bulletin, ModelMap model, @RequestParam("pic") MultipartFile pic,HttpSession httpSession) {
        User u=(User)httpSession.getAttribute("currentUser");

        if (!pic.isEmpty()) {
            bulletin.setPics(this.upload(pic));
        }else {
            bulletin.setPics("-1");
        }
        bulletin.setUid(u.getId());
        bulletinServiceImpl.add(bulletin);
        return "bulletin/showBulletin";
    }

    @RequestMapping("/toEdit")
    public String toEdit(ModelMap modelMap, String id){

        Bulletin b= bulletinServiceImpl.findOne(id);
        modelMap.addAttribute("bulletin", bulletinServiceImpl.findOne(id));
        return "bulletin/editBulletin";
    }
    @RequestMapping("/edit")
    public String edit(Bulletin bulletin,ModelMap modelMap,@RequestParam("pic") MultipartFile pic){

        if (!pic.isEmpty()) {
            bulletin.setPics(this.upload(pic));
        }else {
            bulletin.setPics("-1");
        }
        try {
            bulletinServiceImpl.edit(bulletin);
        } catch (MyException e) {
            modelMap.addAttribute("msg",e.getMessage());
            modelMap.addAttribute("items",bulletin);
            return "/bulletin/editBulletin";
        }

        modelMap.addAttribute("msg","修改成功");
        return "/bulletin/showBulletin";
    }
    @RequestMapping("/del")
    public String del(String itemId){
        bulletinServiceImpl.del(itemId);
        return "bulletin/showBulletin";
    }

    public String upload(MultipartFile pic)  {
        String fileName = pic.getOriginalFilename();
        // 获取文件名

        // 获取文件的后缀名
        String suffixName = fileName.substring(fileName.lastIndexOf("."));

        // 文件上传后的路径
//            String filePath=System.getProperty("user.dir")+"/src/main/resources/static";
        String filePath1=System.getProperty("user.dir")+"/admin/target/classes/static/pics/bulletin/";
        String filePath="C:/Users/Administrator/Desktop/BOMAMO2/admin/src/main/resources/static/pics/bulletin/";
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
