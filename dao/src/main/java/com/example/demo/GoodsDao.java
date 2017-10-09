package com.example.demo;

import com.example.demo.pojo.Goods;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Administrator on 2017/4/7.
 */
@Repository
public interface GoodsDao extends MongoRepository<Goods,String> {
    Page<Goods> findAll(Pageable val);
    Page<Goods>  findByGoodsNameLike(String goodsName, Pageable var1);
    Goods findByGoodsName(String goodsname);

    Page<Goods> findByTypesContaining(String typeName, Pageable var1);

    Page<Goods> findByGoodsNameLikeAndTypesContaining(String keyWords, String typeName, Pageable var1);
}
