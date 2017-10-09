package com.example.demo;


import com.example.demo.pojo.City;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Administrator on 2017/5/4.
 */
@Repository
public interface CityDao extends MongoRepository<City,String> {

}
