package com.example.demo.pojo;

import org.springframework.data.annotation.Id;

import java.util.Date;

/**
 * Created by Administrator on 2017/4/18.
 */
public class Cart {
    @Id
    private String id;
    private String cid;//会员的ID
    private double num; //购买数量
    private String goodsId; //商品的ID
    private Goods goods;

    private Date addDate; //添加进购物车的时间


    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
    }

    public String getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(String goodsId) {
        this.goodsId = goodsId;
    }

    public double getNum() {
        return num;
    }

    public void setNum(double num) {
        this.num = num;
    }

    public Cart() {
        this.addDate=new Date();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getAddDate() {
        return addDate;
    }

    public void setAddDate(Date addDate) {
        this.addDate = addDate;
    }


    public Goods getGoods() {
        return goods;
    }

    public void setGoods(Goods goods) {
        this.goods = goods;
    }
}
