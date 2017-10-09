package com.example.demo.util;

/**
 * Created by Administrator on 2017/4/1.
 */
public class MyException extends Exception {

    private static final long serialVersionUID = 1L;
    private Throwable e;
    private String message = "系统出错，如再次出错，请与系统管理员联系!";

    public MyException() {
    }

    public MyException(Throwable e, String message) {
        this.e = e;
        this.message = message;
    }

    public MyException(Throwable e) {
        this.e = e;
    }

    public MyException(String message) {
        this.message = message;
    }

    public Throwable getE() {
        return e;
    }

    public void setE(Throwable e) {
        this.e = e;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
