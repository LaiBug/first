package com.example.demo.pojo;

import org.springframework.data.annotation.Id;

import java.util.Date;

/**
 * Created by Administrator on 2017/4/7.
 */
public class GoodsType {

    @Id
    private String id;
    private String typeName;
    private String keyWord;

    public String getKeyWord() {

        return keyWord;
    }

    public void setKeyWord(String keyWord) {
        this.keyWord = keyWord;
    }

    private Date addDate;

    public GoodsType() {
        this.addDate=new Date();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public Date getAddDate() {
        return addDate;
    }

    public void setAddDate(Date addDate) {
        this.addDate = addDate;
    }
}
