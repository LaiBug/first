package com.example.demo.service;

import com.example.demo.UserDao;
import com.example.demo.pojo.User;
import com.example.demo.util.MyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Administrator on 2017/3/30.
 */
@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserDao userDao;
   private User u;


    public User login(User user) throws MyException {
        u= userDao.findByUsername(user.getUsername());
        if (u==null){
            throw new MyException("登录失败");//自定义异常类 MyException 针对不同错误情况抛出异常返回上一级
        }
        if (!u.getPassword().equals(user.getPassword())){
            throw new MyException("登录失败");//自定义异常类 MyException 针对不同错误情况抛出异常返回上一级
        }
        return u;
    }
    public void add(User user){
        userDao.insert(user);
    }

    public void save(User user) throws MyException {
        User u2=userDao.findByUsername(user.getUsername());
        if (u2 != null) {
            if(!u2.getId().equals(user.getId())){
                throw new MyException("用户名已存在！");
            }
        }
        User u1=userDao.findOne(user.getId());
        user.setAddDate(u1.getAddDate());
        userDao.save(user);
    }
}
