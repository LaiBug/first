package com.example.demo.util;

public class Msg {
    private String message;
    private boolean result;
    private Object data;
    private Object mydata;      //新增mydata

    public Msg() {
        this.result = true;
    }

    public Msg(Object data) {
        this.message = "success";
        this.data = data;
        this.result = true;
    }

    public Msg(String message, Object data) {
        this.message = message;
        this.data = data;
        this.result = true;
    }

    public Msg(String message, boolean result, Object data) {
        this.message = message;
        this.result = result;
        this.data = data;
    }

    /*新增mydata*/
    public Msg(String message, boolean result, Object data, Object mydata) {
        this.message = message;
        this.result = result;
        this.data = data;
        this.mydata = mydata;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }


    /*新增mydata*/
    public Object getMydata() {
        return mydata;
    }

    public void setMydata(Object mydata) {
        this.mydata = mydata;
    }
}
