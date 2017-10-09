package com.example.demo.service;

import com.example.demo.GoodsTypeDao;
import com.example.demo.pojo.GoodsType;
import com.example.demo.util.MyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017/4/7.
 */
@Service
public class GoodsTypeServiceImpl implements GoodsTypeService{
    @Autowired
    private GoodsTypeDao goodsTypeDao;


    public Page<GoodsType> find(String name , PageRequest pageRequest){
        if(name.equals("-1")){
            return goodsTypeDao.findAll(pageRequest);
        }else{
            return goodsTypeDao.findByTypeNameLike(name,pageRequest);
        }
    }
    public void add(GoodsType g) throws MyException {
        GoodsType gg=goodsTypeDao.findByTypeName(g.getTypeName());
        if(gg==null){
            goodsTypeDao.insert(g);
        }else{
            throw new MyException("该类别已存在");
        }
    }

    /**
     * 添加商品时获取全部类别的方法
     * @return
     */
    public List<GoodsType> findAll() {
        return goodsTypeDao.findAll();
    }

    public void del(String id) {
        goodsTypeDao.delete(id);
    }

    public GoodsType findById(String id) {
        GoodsType g=goodsTypeDao.findOne(id);
        return goodsTypeDao.findOne(id);
    }

    public void edit(GoodsType g) throws MyException {
        GoodsType gg=goodsTypeDao.findByTypeName(g.getTypeName());
        if(gg!=null){
            if(gg.getId().equals(g.getId())) {
                throw new MyException("请编辑类别名称!");
            }else {
                throw new MyException("该类别已存在!");
            }
        }else {
            goodsTypeDao.save(g);
        }
    }
}
