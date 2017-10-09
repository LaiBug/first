/**
 * Created by Administrator on 2016/10/11.
 */

var app = angular.module("myApp", []);
app.controller("BaseController", function($scope, $http) {
    //$scope.editDialogWidth=600;
    // $scope.editDialogHeight=400;
    $scope.remote = {
        listUrl: "/admin/user/getUsers",
        removeUrl: "/admin/user/del",
        addUrl: " /admin/user/edit",
        updateUrl: "/admin/user/edit"
    };
    BaseController($scope, $http);

    /*获取全部分类*/
    $http.get("/admin/role/rolesInfo.api")
        .success(function (data, status, headers, config) {
            $scope.roleMap = data;
        }).error(function (data, status, headers, config) {

    });
});