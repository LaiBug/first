package com.example.demo;


import com.example.demo.pojo.Bulletin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Administrator on 2017/4/24.
 */
@Repository
public interface BulletinDao extends MongoRepository<Bulletin,String> {


    Page<Bulletin> findByTitleLike(String keyWord, Pageable pageRequest);
}
