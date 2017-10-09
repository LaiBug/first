package com.example.demo;

import com.example.demo.pojo.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Administrator on 2017/4/18.
 */
@Repository
public interface CartDao extends MongoRepository<Cart,String> {

    List<Cart> findByCid(String cid);
    Cart findByCidAndGoodsId(String cid, String goodsId);
   List<Cart> findByAddDateBetween(String start, String end);


}
