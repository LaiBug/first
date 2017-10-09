package com.example.demo.pojo;

import org.springframework.data.annotation.Id;

/**
 * Created by Administrator on 2017/4/18.
 */
public class Brand {

    @Id
    private String id;
    private String brandName;
}
