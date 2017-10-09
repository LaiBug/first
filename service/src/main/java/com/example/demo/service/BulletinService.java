package com.example.demo.service;

import com.example.demo.pojo.Bulletin;
import com.example.demo.util.MyException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

/**
 * Created by LTL on 2017/8/18.
 */
public interface BulletinService {
     Page<Bulletin> find(String keyWord, PageRequest pageRequest);
     Bulletin findOne(String id);
     void edit(Bulletin bulletin) throws MyException;
     void add(Bulletin bulletin);
     void del(String id);

}
