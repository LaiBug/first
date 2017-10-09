var app = angular.module('myApp', []);
app.controller("BulletinController", function($scope, $http) {
    $scope.onload = function(items) {
        alert(items);
        $scope.itemss = angular.copy(items);
    };
    $scope.items = [];
    $scope.total = 0;
    $scope.pageNo = 1;
    $scope.totalPage = 0;
    $scope.query = {};

    $scope.keyWords=[];
    $scope.actionType = "";         //批量操作的操作类型
    $scope.editItem={};
    $scope.remote = {
        listUrl: "/admin/bulletin/getBulletin",
        removeUrl: "/admin/bulletin/del",
        addUrl: "/admin/bulletin/add",
        updateUrl: "/admin/bulletin/edit",
    };

    $scope.onRemoveItem = function(item) {
        layer.confirm("是否删除\"" + item.title + "\"?", {icon: 4, title:"删除"}, function(index) {
            layer.close(index);
            $http.get($scope.remote.removeUrl, {params: {itemId: item.id}})
                .success(function (data, status, headers, config) {
                    $scope.items=data.data;
                    layer.alert("删除成功");
                    $scope.refresh();

                });
        });
    };



    $scope.onEditItem = function(item) {
        $http.get("/admin/goods/toEdit")
    }






    //必须手动加载页面一次
    $scope.toPage = function(pageNo, callback) {
        $scope.query.pageNo = pageNo;
        if ($scope.onBeforeQuery) {
            $scope.onBeforeQuery();
        }
        $http.get($scope.remote.listUrl, {params:$scope.query})
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

});
