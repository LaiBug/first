/**
 * Created by Administrator on 2016/10/11.
 */

var app = angular.module("myApp", []);
app.controller("BaseController", function($scope, $http) {
    //$scope.editDialogWidth=600;
    // $scope.editDialogHeight=400;
    $scope.remote = {
        listUrl: "/admin/role/getRole",
        removeUrl: "/admin/role/del",
        addUrl: " /admin/role/edit",
        updateUrl: "/admin/role/edit"
    };
    BaseController($scope, $http);

});




