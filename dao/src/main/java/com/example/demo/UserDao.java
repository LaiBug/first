package com.example.demo;

import com.example.demo.pojo.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Administrator on 2017/3/30.
 */
@Repository
public interface UserDao extends MongoRepository<User,String> {
    User findByUsername(String name);
}
