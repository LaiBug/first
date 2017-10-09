package com.example.demo.service;

import com.example.demo.CustomerDao;
import com.example.demo.pojo.Customer;
import com.example.demo.util.MyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.io.File;

/**
 * Created by Administrator on 2017/4/1.
 */
@Service("customerService")
public class CustomerServiceImpl implements CustomerService{
    @Autowired
    private CustomerDao customerDao;
    private Customer cccccc;

    @Override
    public Page<Customer> find(String name, PageRequest pageRequest) {
        if (name.equals("-1")) {
            return customerDao.findAll(pageRequest);
        } else {
            return customerDao.findByNameLike(name, pageRequest);
        }
    }
    @Override
    public void add(Customer customer) throws MyException {
        cccccc = customerDao.findByName(customer.getName());
        if (cccccc == null) {
            customerDao.insert(customer);
        } else {
            throw new MyException("用户名已经存在");
        }
    }

    public Customer findOne(String id) {
        return customerDao.findOne(id);
    }

    public void del(String itemId) {
        customerDao.delete(itemId);
    }

    public void edit(Customer customer) throws MyException {
        Customer c1 = customerDao.findByName(customer.getName());
        if (c1 != null) {
            if (!c1.getId().equals(customer.getId())) {
                throw new MyException("该会员名已经被注册！");
            }
        }

        c1 = customerDao.findOne(customer.getId());
        if (customer.getPics().equals("-1")) {
            customer.setPics(c1.getPics());
        } else {

            String filePath = System.getProperty("user.dir") + "/admin/target/classes/static/pics/customer/";
            String filePath1="C:/Users/Administrator/Desktop/BOMAMO2/admin/src/main/resources/static/pics/customer/";

            File folder = new File(filePath + c1.getPics());
            folder.delete();
            folder = new File(filePath1 + c1.getPics());

            folder.delete();
        }
        customer.setPassword(c1.getPassword());
        customer.setAddDate(c1.getAddDate());
        customerDao.save(customer);
    }

    public Customer login(Customer customer) throws MyException {
        Customer u = customerDao.findByName(customer.getName());
        if (u == null) {
            throw new MyException("登录失败");//自定义异常类 MyException 针对不同错误情况抛出异常返回上一级
        }
        if (!u.getPassword().equals(customer.getPassword())) {
            throw new MyException("登录失败");//自定义异常类 MyException 针对不同错误情况抛出异常返回上一级
        }
        return u;
    }
}
