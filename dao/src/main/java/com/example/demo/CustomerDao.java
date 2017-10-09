package com.example.demo;

import com.example.demo.pojo.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Administrator on 2017/4/1.
 */
@Repository
public interface CustomerDao extends MongoRepository<Customer,String> {
    Customer findByName(String name);
    Page<Customer> findByNameLike(String name, Pageable var1);
    Customer findById(String id);
//    Page<Customer> findByCateIdListContaining(String cateId, Pageable var1);
}
