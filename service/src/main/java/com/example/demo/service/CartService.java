package com.example.demo.service;

import com.example.demo.pojo.Cart;
import com.example.demo.util.MyException;

import java.util.List;

/**
 * Created by LTL on 2017/8/18.
 */
public interface CartService {
    List<Cart> getCarts(String cid) throws MyException;
     List<Cart> report(String start,String end);
     void add(Cart cart);
     void delOne(String id);
    void delAll(String cid);
     void edit(String itemId, Double num);
}
