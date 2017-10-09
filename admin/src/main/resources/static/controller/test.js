/**
 * Created by Administrator on 2017/4/28.
 */
var myapp=angular.module("MyApp",[])
myapp.controller("testController",function($scope){
    var goods={
        price:"88",
        name:"苹果6"
    };
    var fn=function(arg){
        console.log(this.name+"的价钱是："+this.price+arg)
    }
    var one=angular.bind(goods,fn,"太好了")
    angular.bind(goods,fn,"太棒了")

})