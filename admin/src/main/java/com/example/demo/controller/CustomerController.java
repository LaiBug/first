package com.example.demo.controller;
import com.example.demo.CityDao;
import com.example.demo.pojo.City;
import com.example.demo.pojo.Customer;
import com.example.demo.util.MyException;
import com.example.demo.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by Administrator on 2017/4/1.
 */
@Controller
@SessionAttributes("currentCustomer")

public class CustomerController {
    @Autowired
    private CustomerService customerServiceImpl;
    @Autowired
    private CityDao cityDao;

    @RequestMapping(value={"/admin/customer","/admin/customer/"})
    public String CustHtml(){
        return "/customer/showCust";
    }


    @RequestMapping("/admin/customer/showCust")
    @ResponseBody
    public Page<Customer> findAll(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "-1") String name, @RequestParam(defaultValue = "5")int count){
        Sort sort=new Sort(Sort.Direction.DESC, "addDate");
        return customerServiceImpl.find(name, new PageRequest(pageNo - 1, count, sort));
    }
    @RequestMapping("/admin/customer/getCity")
    @ResponseBody
    public List<City> getCity(){
        return cityDao.findAll();

    }

    @RequestMapping("/admin/customer/toadd")
    public String toAdd(){
        return "/customer/addCust";
    }



    @RequestMapping(value = "/admin/customer/add",method = RequestMethod.POST)
    public String add(Customer customer,ModelMap model,@RequestParam("pic") MultipartFile pic) {

        if (!pic.isEmpty()) {
            customer.setPics(this.upload(pic, customer));
        }else {
            customer.setPics("-1");
        }
        try {
            customerServiceImpl.add(customer);
        } catch (MyException e) {
            model.addAttribute("msg",e.getMessage());
            model.addAttribute("customer",customer);
            return "/customer/addCust";
        }
        return this.CustHtml();
    }

    @RequestMapping("/admin/customer/toEdit")
    public String toEdit(ModelMap modelMap,String id){
        modelMap.addAttribute("customer", customerServiceImpl.findOne(id));
        return "/customer/editCust";
    }
    @RequestMapping("/admin/customer/edit")
    public String edit(ModelMap modelMap,Customer customer,@RequestParam("pic") MultipartFile pic){
        if (!pic.isEmpty()) {
            customer.setPics(this.upload(pic, customer));
        }else {
            customer.setPics("-1");
        }
        try {
            customerServiceImpl.edit(customer);
        } catch (MyException e) {
            modelMap.addAttribute("msg",e.getMessage());
            modelMap.addAttribute("customer",customer);
            return "/customer/editCust";
        }
        return "/customer/showCust";
    }

    @RequestMapping("/admin/customer/del")
    public String del(String itemId,String pic){
        String filePath1=System.getProperty("user.dir")+"/admin/target/classes/static/pics/customer/";
        String filePath="C:/Users/Administrator/Desktop/BOMAMO2/admin/src/main/resources/static/pics/customer/";
        File folder = new File(filePath+pic);
        folder.delete();
        folder= new File(filePath1+pic);
        folder.delete();
        customerServiceImpl.del(itemId);
        return "/customer/showCust";
    }

    @RequestMapping("/clogin")
    public String login(Customer currentCustomer,ModelMap model,HttpSession httpSession){
        try {
            currentCustomer = customerServiceImpl.login(currentCustomer);
        } catch (MyException e) {//捕获登录可能出现的错误情况，返回页面msg显示
            model.addAttribute("msg", e.getMessage());
            return "redirect:/shop";
        }
        model.addAttribute("currentCustomer", currentCustomer);
        return "redirect:/shop";

    }

    @RequestMapping("/cclogin")
    @ResponseBody
    public Customer clogin(String nnnn,String password ,HttpSession httpSession){
        try {
            Customer c=new Customer();
            c.setName(nnnn);c.setPassword(password);
            return   customerServiceImpl.login(c);
        } catch (MyException e) {//捕获登录可能出现的错误情况，返回页面msg显示


        }
        return null;

    }



    public String upload(MultipartFile pic,Customer customer){
        String fileName = pic.getOriginalFilename();
        // 获取文件名

        // 获取文件的后缀名
        String suffixName = fileName.substring(fileName.lastIndexOf("."));

        // 文件上传后的路径
//            String filePath=System.getProperty("user.dir")+"/src/main/resources/static";
        String filePath1=System.getProperty("user.dir")+"/admin/target/classes/static/pics/customer/";
        String filePath="C:/Users/Administrator/Desktop/BOMAMO2/admin/src/main/resources/static/pics/customer/";
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
