/**
 * Created by Administrator on 2016/10/10.
 */

function BaseController($scope, $http) {
    $scope.items = [];
    $scope.total = 0;
    $scope.pageNo = 1;
    $scope.totalPage = 0;
    $scope.query = {};
    $scope.blankItem = {
        name:""
    };
    $scope.editItem = angular.copy($scope.blankItem);
    $scope.workMachineType = {1:"PC", 2:"Phone"}
    $scope.onAddItem = function() {
        $scope.editItem = angular.copy($scope.blankItem);
        var w = 600;
        var h = 400;
        if ($scope.editDialogWidth)
            w = $scope.editDialogWidth;
        if ($scope.editDialogHeight)
            h = $scope.editDialogHeight;
        layer.open({
            type : 1,
            title :'<i class="icon-pencil bigger-130"></i>添加',
            page : '#operWindow',
            area : [w + 'px', h + 'px',600+'px',+600+'px'+1],
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
        layer.confirm("是否删除\"" + item.name + "\"?", {icon: 4, title:"删除"}, function(index) {
            layer.close(index);
            $http.get($scope.remote.removeUrl, {params: {itemId: item.id}})
                .success(function (data, status, headers, config) {

                    layer.alert("删除成功");
                    $scope.refresh();

                });
        });
    };
    $scope.onEditItem = function(item) {
        $scope.editItem = angular.copy(item);
        if ($scope.onEditBefore) {
            $scope.onEditBefore(item);
        }
        var w = 600;
        var h = 400;
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
                        layer.close(index);
                        angular.copy(data.extra, item);
                    }).error(function(data, status, headers, config){

                });
            }
        });
    };
    //$scope.timeOffset = 0;
    //$http.get("/current_time.api")
    //    .success(function (data, status, headers, config) {
    //        if (data.status == 0) {
    //            $scope.timeOffset = data.extra - new Date().getTime();
    //        }
    //    });
    $scope.getServerTime = function() {
        return new Date().getTime() + $scope.timeOffset;
    };
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
    $scope.firstPage();

    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };


    /*批量操作时使用的删除方法
     * 参数为id
     * */
    $scope.deleteItem = function(id) {
        $http.get($scope.remote.removeUrl, {params: {itemId: id}})
            .success(function (data, status, headers, config) {
                $scope.items=data.data;
                $scope.refresh();
            });
    };
}
