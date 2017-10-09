package com.example.demo.service;

import com.example.demo.pojo.Customer;
import com.example.demo.util.MyException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

/**
 * Created by LTL on 2017/8/18.
 */
public interface CustomerService {
    Page<Customer> find(String name, PageRequest pageRequest);
    void add(Customer customer) throws MyException;
    Customer findOne(String id);
    void del(String itemId);
    void edit(Customer customer) throws MyException ;
    Customer login(Customer customer) throws MyException;
}
