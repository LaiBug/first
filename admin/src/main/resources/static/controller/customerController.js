var app = angular.module('myApp', []);
app.controller("CustomerController", function($scope, $http,$filter) {
    $scope.onload = function(items) {
        alert(items);
        $scope.itemss = angular.copy(items);
    };
    $scope.uppic="";
    $scope.items = [];
    $scope.city="";
    $scope.qu="";
    $scope.citys=[];

    $scope.pulls = [];
    $scope.total = 0;
    $scope.pageNo = 1;
    $scope.totalPage = 0;
    $scope.query = {};
    $scope.blankItem = {
        name:""
    };
    $scope.keyWords=[];
    $scope.actionType = "";         //批量操作的操作类型
    $scope.editItem={};

    $scope.onAddItem = function(){
        $scope.editItem ={};            //这里要重置editItem，不然会用之前的editItem
        layer.open({
            type : 1,
            title :'<i class="icon-pencil bigger-130"></i>添加',
            page : '#opegWindow',
            area : [600 + 'px', 400 + 'px',600+'px',+400+'px'+1],
            shadeClose : false, // 点击遮罩关闭
            moveOut : false,
            zIndex : 1,
            btn: ['确定', '取消'],
            content : $("#editDiv"),
            yes: function(index){
                if ($scope.onEditAfter) {
                    var c = $scope.onEditAfter();
                    if (c) {
                        layer.alert(c.error );
                        return;
                    }
                }
                $http.post($scope.remote.addUrl, $scope.editItem)
                    .success(function(data, status, headers, config){
                        if (data.status != 0) {
                            layer.alert(data.message,function(){
                                var index2 = layer.alert();
                                layer.close(index2);
                                layer.close(index);
                                $scope.items=data.data;
                                $scope.refresh();
                            });
                            return;
                        }
                        layer.close(index);
                        if ($scope.onAddAfter) {
                            $scope.onAddAfter(data.extra);
                        }
                        $scope.items.unshift(data.extra);
                    }).error(function(data, status, headers, config){

                });
            }
        });
    };

    $scope.onRemoveItem = function(item) {
        layer.confirm("是否删除\"" + item.name+ "\"?", {icon: 4, title:"删除"}, function(index) {
            layer.close(index);
            $http.get("/admin/customer/del", {params: {itemId: item.id,pic:item.pics}})
                .success(function (data, status, headers, config) {
                    $scope.items=data.data;
                    layer.alert("删除成功");
                    $scope.refresh();
                });
        });
    };

    $scope.onEditItem = function(item) {
        console.info(item);
        $scope.editItem = angular.copy(item);
        console.info($scope.editItem);
        if ($scope.onEditBefore) {
            $scope.onEditBefore(item);
        }
        var w = 1000;
        var h = 700;
        if ($scope.editDialogWidth)
            w = $scope.editDialogWidth;
        if ($scope.editDialogHeight)
            h = $scope.editDialogHeight;
        layer.open({
            type : 1,
            title :'<i class="icon-pencil bigger-130"></i>编辑',
            page : '#operWindow',
            area : [w + 'px', h + 'px' ,0],
            zIndex : 1,
            shadeClose : false, // 点击遮罩关闭
            moveOut : false,
            btn: ['确定', '取消'],
            content : $("#editDiv"),
            yes: function(index){
                if ($scope.onEditAfter) {
                    var c = $scope.onEditAfter();
                    if (c && c.error) {
                        layer.alert("错误: " + c.error);
                        return;
                    }
                }
                $http.post($scope.remote.updateUrl, $scope.editItem)
                    .success(function(data, status, headers, config){
                        if (data.status != 0) {
                            layer.alert(data.message,function(){
                                var index2 = layer.alert();
                                layer.close(index2);
                                layer.close(index);
                                $scope.items=data.data;
                                $scope.refresh();
                            });
                            return;
                        }
                        angular.copy(data.extra, item);
                    }).error(function(data, status, headers, config){

                });
            }
        });
    };


    //必须手动加载页面一次
    $scope.toPage = function(pageNo, callback) {
        $scope.query.pageNo = pageNo;
        if ($scope.onBeforeQuery) {
            $scope.onBeforeQuery();
        }
        $http.get("/admin/customer/showCust",{params:$scope.query})
            .success(function(data, status, headers, config){
                if(data.datas){
                    if ($scope.onDataFilter) {
                        data.datas = $scope.onDataFilter(data.datas);
                    }
                    $scope.items = data.datas;
                    $scope.total = data.totalCount;
                    $scope.pageNo = data.pageNo;
                    $scope.totalPage = data.totalPage;
                }else{
                    if ($scope.onDataFilter) {
                        data.content = $scope.onDataFilter(data.content);
                    }
                    $scope.items = data.content;
                    $scope.total = data.totalElements;
                    $scope.pageNo = data.number+1;
                    $scope.totalPage = data.totalPages;
                }
                if (callback) {
                    callback();
                }
                if ($scope.onDataFetch) {
                    $scope.onDataFetch();
                }
            }).error(function(data, status, headers, config){

        });
        $http.get("/admin/customer/getCity")
            .success(function(data, status, headers, config){
                $scope.citys=data;
            }).error(function(data, status, headers, config){

        });
    };
    $scope.toPage(1);





    $scope.refresh = function(callback) {
        $scope.toPage($scope.pageNo, callback);
    };
    $scope.nextPage = function() {
        if ($scope.pageNo < $scope.totalPage) {
            $scope.toPage($scope.pageNo + 1);
        }
    };
    $scope.prevPage = function() {
        if ($scope.pageNo > 1) {
            $scope.toPage($scope.pageNo - 1);
        }
    };
    $scope.firstPage = function() {
        $scope.toPage(1);
    };
    $scope.lastPage = function() {
        $scope.toPage($scope.totalPage);
    };



    /*批量操作时使用的删除方法
    * 参数为id
    * */
    $scope.deleteItem = function(id) {
            $http.get($scope.remote.removeUrl, {params: {itemId: id}})
                .success(function (data, status, headers, config) {
                    $scope.items=data.data;
                    //layer.alert("删除成功");
                    $scope.refresh();
                });
    };

    $scope.cityFilter=function(city){
            if(city.item_code.substring(0,2)==$scope.city.item_code.substring(0,2)) {
                if (city.item_code.substring(4, 6) == "00"&& city.item_code.substring(2,4)!="00") {
                    return true;
                }
                else{
                  return false;
                }
            }else{
                return false;
            }
    };

    $scope.xianFilter=function(city){
        if(city.item_code.substring(0,4)==$scope.qu.item_code.substring(0,4)&&$scope.qu.item_code!==city.item_code){
                return true;

        }else{
            return false;
        }
    };
    $scope.$watch('city', function(country) {
        $scope.qu = '';
    });
    // 更换省的时候清空城市
    $scope.$watch('qu', function(province) {
        $scope.xian = '';
    });
});


