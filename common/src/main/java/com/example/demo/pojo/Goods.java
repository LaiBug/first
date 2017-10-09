package com.example.demo.pojo;

import org.springframework.data.annotation.Id;

import java.util.Date;
import java.util.List;

/**
 * Created by Administrator on 2017/4/7.
 */
public class Goods {
    @Id
    private String id;
    private String goodsName;
    private double stock;
    private String unit;
    private double num;
    private String remark;
    private double price;
    private String keyWord;
    private Date addDate;
    private List<String > types;
    private String pics;

    private double discount=10.0;
    public String getPics() {
        return pics;
    }

    public void setPics(String pics) {
        this.pics = pics;
    }



    public List<String> getTypes() {
        return types;
    }

    public void setTypes(List<String> types) {
        this.types = types;
    }

    public Date getAddDate() {
        return addDate;
    }

    public void setAddDate(Date addDate) {
        this.addDate = addDate;
    }

    public String getKeyWord() {
        return keyWord;
    }

    public void setKeyWord(String keyWord) {
        this.keyWord = keyWord;
    }



    public Goods(
    ) { this.addDate=new Date();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public double getStock() {
        return stock;
    }

    public void setStock(double stock) {
        this.stock = stock;
    }

    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }

    public double getNum() {
        return num;
    }

    public void setNum(double num) {
        this.num = num;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }
}
