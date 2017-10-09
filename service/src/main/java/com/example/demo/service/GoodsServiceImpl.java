package com.example.demo.service;

import com.example.demo.GoodsDao;
import com.example.demo.pojo.Goods;
import com.example.demo.util.MyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;

/**
 * Created by Administrator on 2017/4/7.
 */
@Service
public class GoodsServiceImpl implements GoodsService {
    @Autowired
    private GoodsDao goodsDao;


    public Page<Goods> find(String keyWord , String typeName, PageRequest pageRequest){
        if(keyWord.equals("-1")&&typeName.equals("-1")){
            return goodsDao.findAll(pageRequest);
        }else if(!keyWord.equals("-1")&&typeName.equals("-1")){
            return goodsDao.findByGoodsNameLike(keyWord,pageRequest);
        }else if(keyWord.equals("-1")&&!typeName.equals("-1")){
            return goodsDao.findByTypesContaining(typeName,pageRequest);
        }else{
             return  goodsDao.findByGoodsNameLikeAndTypesContaining(keyWord, typeName, pageRequest);
        }
    }

    public List<Goods> findAll(){
      return   goodsDao.findAll();
    }



    public void add(Goods g) throws MyException {
        Goods gg=goodsDao.findByGoodsName(g.getGoodsName());
        if(gg==null){
            goodsDao.insert(g);
        }else{
            throw new MyException("商品已存在");
        }
    }

    public void del(String goodsId) {
        Goods goods=goodsDao.findOne(goodsId);
        String filePath1=System.getProperty("user.dir")+"/admin/target/classes/static/pics/goods/";
        String filePath="C:/Users/Administrator/Desktop/BOMAMO2/admin/src/main/resources/static/pics/goods/";
        File file=new File(filePath+goods.getPics());
        file.delete();
        file=new File(filePath1+goods.getPics());
        file.delete();
        goodsDao.delete(goodsId);
    }

    public Goods getById(String id) {
        return goodsDao.findOne(id);
    }

    public void edit(Goods g) throws MyException {
        Goods gg=goodsDao.findByGoodsName(g.getGoodsName());
        if(gg!=null){
            if(!gg.getId().equals(g.getId())) {
                throw new MyException("该商品名已存在！");
            }
        }

        gg=goodsDao.findOne(g.getId());
        if(g.getPics().equals("-1")){
            g.setPics(gg.getPics());
        }else{


            String filePath=System.getProperty("user.dir")+"/target/classes/static/pics/goods/";
            String filePath1="C:/Users/Administrator/Desktop/BOMAMO2/src/main/resources/static/pics/goods/";
            File folder = new File(filePath+gg.getPics());
            File folder1 = new File(filePath1+gg.getPics());
            folder.delete();
            folder1.delete();
        }
        goodsDao.save(g);

    }
}
