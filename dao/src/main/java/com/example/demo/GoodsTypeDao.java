package com.example.demo;
import com.example.demo.pojo.GoodsType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Administrator on 2017/4/7.
 */
@Repository
public interface GoodsTypeDao extends MongoRepository<GoodsType,String> {
    Page<GoodsType> findAll(Pageable val);
    GoodsType findByTypeName(String goodsname);

    Page<GoodsType> findByTypeNameLike(String typeName, Pageable val);
}
