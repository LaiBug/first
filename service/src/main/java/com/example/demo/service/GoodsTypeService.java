package com.example.demo.service;

import com.example.demo.pojo.GoodsType;
import com.example.demo.util.MyException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

/**
 * Created by LTL on 2017/8/18.
 */
public interface GoodsTypeService {
    Page<GoodsType> find(String name , PageRequest pageRequest);
    void add(GoodsType g) throws MyException;
    List<GoodsType> findAll();
    void del(String id);
    GoodsType findById(String id);
    void edit(GoodsType g) throws MyException;
}
