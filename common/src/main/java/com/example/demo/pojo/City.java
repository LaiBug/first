package com.example.demo.pojo;

import org.springframework.data.annotation.Id;

/**
 * Created by Administrator on 2017/5/4.
 */
public class City {
    @Id
    private  String id;
    private String item_code;
    private  String item_name;

    public City() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getItem_code() {
        return item_code;
    }

    public void setItem_code(String item_code) {
        this.item_code = item_code;
    }

    public String getItem_name() {
        return item_name;
    }

    public void setItem_name(String item_name) {
        this.item_name = item_name;
    }
}

