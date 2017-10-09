var app = angular.module('myApp', []);
app.controller("ShopController", function($scope, $http) {
    $scope.onload = function(items) {
        alert(items);
        $scope.itemss = angular.copy(items);
    };
    $scope.list = {};           //商品
    $scope.carts = {};         //购物车（总）
    $scope.bulletin = {};       //公告
    $scope.cart={};             //购物车商品（单）
    $scope.dis={};
    $scope.cartdown=false;
    $scope.cartQuentity = 0;
    $scope.query = {};
    $scope.blankItem = {
        name:""
    };
    $scope.keyWords=[];
    $scope.actionType = "";         //批量操作的操作类型
    $scope.remote = {
        cartUrl: "/shop/getCart",
        listUrl: "/shop/getGoods",
        editCartUrl: "/shop/edit",
        removeUrl: "/shop/del",
        addUrl:"/shop/add",
        bulletinUrl:"/shop/getBulletin"
    };


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
                console.log("111")
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


    //必须手动加载页面一次
    $scope.toPage = function(callback) {
        //获取前台所需商品
        $http.get($scope.remote.listUrl, {params:$scope.query})
            .success(function(data, status, headers, config){
                    $scope.list = data.content;
            }).error(function(data, status, headers, config){
        });
        //获取登录后用户的购物车信息
        $http.get($scope.remote.cartUrl)
            .success(function(data, status, headers, config){
                    $scope.carts = data.data;
                    $scope.cartNum()
            }).error(function(data, status, headers, config){

        });
        //获取公告
        $http.get($scope.remote.bulletinUrl)
            .success(function(data, status, headers, config){
                $scope.bulletin = data.content;
            }).error(function(data, status, headers, config){
        });
        //获取特价商品
        $http.get("/shop/getDiscount")
            .success(function(data, status, headers, config){
                $scope.dis = data.content;
            }).error(function(data, status, headers, config){
        });
    };

    $scope.toPage(1);


    $scope.refresh = function(callback) {
        $scope.toPage($scope.pageNo, callback);
    };

    $scope.firstPage = function() {
        $scope.toPage();
    };
    $scope.lastPage = function() {
        $scope.toPage($scope.totalPage);
    };



    /*
    获取类别
     */
    $http({
        method: 'GET',
        url: '/admin/goodsType/getGoodsType2'
    }).then(function successCallback(response) {
        $scope.goodsTypeMap = response.data;
    })

    $scope.typeFind = function(type) {
        $scope.query.typeName=type;
        $scope.toPage(1);

    };
    $scope.cartNum=function(){
        var cartNum=0;
        angular.forEach($scope.carts,function(item){
            cartNum=cartNum+1;
        })
        return cartNum;
    }
    /*
     计算总价的方法
     */
    $scope.totalPrice=function(){
        var totalPrice=0;
        angular.forEach($scope.carts,function(item){
            totalPrice+=item.goods.price * item.goods.discount*item.num/10;
        })
        return totalPrice;
    }
    $scope.toPic=function(){
        var pics=$("#picture").val();

        return pics;
    }
});