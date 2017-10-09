package com.example.demo.service;
import com.example.demo.CartDao;
import com.example.demo.GoodsDao;
import com.example.demo.pojo.Cart;
import com.example.demo.pojo.Goods;
import com.example.demo.util.MyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017/4/18.
 */
@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private CartDao cartDao;
    @Autowired
    private GoodsDao goodsDao;

    @Override
    public List<Cart> getCarts(String cid) throws MyException {
        List<Cart> list=cartDao.findByCid(cid);
        if(list==null){
           throw new MyException("购物车为空！");
        }
        Goods g;
        for(int i=0;i<list.size();i++){
            g=goodsDao.findOne(list.get(i).getGoodsId());
            list.get(i).setGoods(g);
        }
        return list;
    }
    @Override
    public List<Cart> report(String start,String end){
        return cartDao.findByAddDateBetween(start,end);
    }


    @Override
    public void add(Cart cart){
        Cart ca=cartDao.findByCidAndGoodsId(cart.getCid(),cart.getGoodsId());
        if(ca!=null){
            ca.setNum(cart.getNum()+ca.getNum());
            ca.setAddDate(cart.getAddDate());
            cartDao.save(ca);
        }else {
            cartDao.save(cart);
        }
    }
    @Override
    public void delOne(String id) {
        cartDao.delete(id);
    }
    @Override
    public void delAll(String cid){
        List<Cart> li=cartDao.findByCid(cid);
        for(int i=0;i<li.size();i++) {
            cartDao.delete(li.get(i).getId());
        }
    }
    @Override
    public void edit(String itemId, Double num) {
        Cart ccc=cartDao.findOne(itemId);
        ccc.setNum(num);
        cartDao.save(ccc);
    }
}
