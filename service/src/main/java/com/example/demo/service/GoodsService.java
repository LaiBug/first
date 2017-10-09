package com.example.demo.service;

import com.example.demo.pojo.Goods;
import com.example.demo.util.MyException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

/**
 * Created by LTL on 2017/8/18.
 */
public interface GoodsService {
    Page<Goods> find(String keyWord , String typeName, PageRequest pageRequest);
    List<Goods> findAll();
    void add(Goods g) throws MyException;
    void del(String goodsId);
    Goods getById(String id);
    void edit(Goods g) throws MyException;
}
