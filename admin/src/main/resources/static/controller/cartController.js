var app = angular.module('myApp', []);
app.controller("CartController", function($scope, $http) {

    $scope.cart = {};  //单条购物商品
    $scope.carts = []; //购物车

    $scope.remote = {
        getCartUrl: "/shop/getCart",
        listUrl: "/shop/getGoods",
        editCartUrl: "/shop/edit",
        removeUrl: "/shop/del",
        clearUrl:"/shop/delAll",
        addUrl:"/shop/add",

    };


    /*
        删除单条购物商品
     */
    $scope.onRemoveItem = function(item) {
        layer.confirm("是否删除\"" + item.goods.goodsName + "\"?", {icon: 4, title:"删除"}, function(index) {
            layer.close(index);
            $http.get($scope.remote.removeUrl, {params: {itemId: item.id}})
                .success(function (data, status, headers, config) {
                    $scope.items=data.data;
                    layer.msg('删除成功', {
                        icon: 1,
                        time: 1000 //2秒关闭（如果不配置，默认是3秒）
                    });
                   $scope.refresh();
                });
         });
    };

    /*
    添加购物商品
     */
    $scope.addCart=function(item) {
        $scope.cart.goodsId=item.id;
        layer.open({
            type: 1,
            closeBtn: false,
            title :'<i class="icon-pencil bigger-130"></i>加入购物车',
            shadeClose: true,
            btn: ['确定', '取消'],
            content:$("#editDiv"),
            yes: function(index){
                $http.post($scope.remote.addUrl, $scope.cart)
                    .success(function (data, status, headers, config) {

                        if(data.result===true) {
                            layer.close(index),
                                layer.msg(data.message, {
                                    icon: 1,
                                    time: 1000 //2秒关闭（如果不配置，默认是3秒）
                                })
                        }
                        else {
                            layer.open({
                                type: 1,
                                title: ['<i class="icon-pencil bigger-130" style="margin-bottom: 50px"></i>请先登录','font-size:18px; color:red;'],
                                content: $("#login").html(),

                            })
                            layer.close(index)
                        }
                        $scope.refresh();
                    })
            }});
        $scope.cart.num=1;
    }

    $scope.toShow = function(callback) {
        $http.get($scope.remote.getCartUrl)
            .success(function(data, status, headers, config){
                    $scope.carts = data.data;
            }).error(function(data, status, headers, config){

        });
    };
    /*
    首次进入页面时，默认执行一次加载页面的方法从而获得数据
     */
    $scope.toShow();

    /*
    刷新页面的方法
     */
    $scope.refresh = function(callback) {
        $scope.toShow(callback);
    };


    /*
    清空购物车的方法
    */
    $scope.clearCart = function() {
        layer.confirm("是否清空购物车？\"",{icon: 4, title:"清空"}, function(index) {
            $http.get($scope.remote.clearUrl)
                .success(function (data, status, headers, config) {
                    $scope.items = data.data;
                    layer.msg('清空成功', {
                        icon: 1,
                        time: 1000 //2秒关闭（如果不配置，默认是3秒）
                    })
                    $scope.refresh();
                });
        });
    };


    /*
    计算一种商品总价的方法
     */
    $scope.price=function(item){
        var price=item.goods.price * item.goods.discount*item.num/10;
        return price;
    }
    /*
    计算折后价的方法
     */
    $scope.discount=function(item){

        var discount=item.goods.price * item.goods.discount/10;
        return discount;
    }
    /*
    计算购物车有几种商品的方法
     */
    $scope.cartNum=function(){
        var cartNum=0;
        angular.forEach($scope.carts,function(item){
            cartNum=cartNum+1;
        })
        return cartNum;
    }
    /*
     计算欲购买商品总价的方法
     */
    $scope.totalPrice=function(){
        var totalPrice=0;
        angular.forEach($scope.carts,function(item){
            totalPrice+=item.goods.price * item.goods.discount*item.num/10;
        })
        return totalPrice;
    }
    /*
     计算总购买数量的方法
     */
    $scope.totalQuentity=function(){
        var total=0;
        angular.forEach($scope.carts,function(item){
            total+=item.num;
        })
        return total;
    }
    /*
    购买商品数量发生变化触发
     */
    $scope.changeNum=function(item){

        if(item.num>0){
            $http.get($scope.remote.editCartUrl, {params: {itemId: item.id, num : item.num}})
                .success(function (data, status, headers, config) {

                });
        }else {
            layer.msg('不能小于1', {
                time: 1000 //2秒关闭（如果不配置，默认是3秒）
            })
          item.num=1;
        }
    }

    $scope.add=function(item){
        ++item.num;
        $scope.changeNum(item);
    }
    $scope.reduce=function(item){
        --item.num;
        $scope.changeNum(item);
    }

    /*
     获取的session里面 用户信息
     的头像路径
     */
    $scope.toPic=function(){
        var pics=$("#picture").val();

        return pics;
    }
});
