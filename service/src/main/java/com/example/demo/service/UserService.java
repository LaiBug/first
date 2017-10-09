package com.example.demo.service;

import com.example.demo.pojo.User;
import com.example.demo.util.MyException;

/**
 * Created by LTL on 2017/8/18.
 */
public interface UserService {
    User login(User user) throws MyException;
    void add(User user);
    void save(User user) throws MyException;
}
