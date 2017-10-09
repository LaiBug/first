var loadJS = function(src){
	var script=document.createElement('script');
	script.setAttribute("type","text/javascript");
	script.setAttribute("src", src);
	script.setAttribute("charset", "utf-8");
	document.getElementsByTagName("head")[0].appendChild(script);
};
var loadCSS = function(src) {
    var script=document.createElement('link');
    script.setAttribute("href", src);
    script.setAttribute("type","text/css");
    script.setAttribute("rel", "stylesheet");
    document.getElementsByTagName("head")[0].appendChild(script);
};

function RegisterMultiSelector(app) {
    if (app.RegisterMultiSelector) return;
    app.RegisterMultiSelector = true;
    loadCSS("/jquery-ui-multiselect-widget/jquery.multiselect.css");
    loadCSS("/jquery-ui-multiselect-widget/jquery.multiselect.filter.css");
    loadJS("/jquery-ui-multiselect-widget/jquery.multiselect.js");
    loadJS("/jquery-ui-multiselect-widget/jquery.multiselect.filter.js");
    app.directive("ccmultiselector", function () {
        var directive = {};
        directive.restrict = 'E';
        directive.replace = false;
        directive.transclude = false;
        directive.template = '<select  multiple="multiple"></select>';
        directive.scope = {
            model: "=ngModel",
            selector: "&ngSelector"
        };
        directive.controller = function($scope, $http, $sce, $element, $attrs, $parse) {
            if (!$scope.selector) {
                $scope.selector = [];
            }
            if (typeof($scope.selector) == "function") {
                $scope.selector = $scope.selector();
            }
            var ele = $element.find("select");
            var origHtml = $(ele).html();
            $(ele).multiselect({
                noneSelectedText: "==请选择==",
                checkAllText: "全选",
                uncheckAllText: '全不选',
                selectedList:6
            }).multiselectfilter({
                label:"",
                placeholder:"查找.."
            });
            function render() {
                var list = origHtml;
                for (var i in $scope.selector) {
                    var item = $scope.selector[i];
                    var name, value;
                    if (typeof(item) == "object") {
                        name = item.name;
                        value = item.value;
                    } else {
                        name = value = item;
                    }
                    list += "<option value='" + value + "'>" + name + "</option>";
                }
                $(ele).html(list);
                if ($scope.model) {
                    $(ele).val($scope.model);
                }
                $(ele).multiselect('refresh');
            }
            $scope.$watch("model", function(){
                render();
            });
            $scope.$watch("selector", function(){
                render();
            });

            $(ele).change(function(){
                var v = $(this).val();
                $scope.$apply(function(){
                    $scope.model = v;
                });
            });
        };
        return directive;
    });
}
function RegisterSwitch(app) {
    if (app.RegisterSwitch1) return;
    app.RegisterSwitch1 = true;
    loadCSS("/bootstrap-switch/css/bootstrap3/bootstrap-switch.min.css");
    loadJS("/bootstrap-switch/js/bootstrap-switch.min.js");
    app.directive("ccswitch", function () {
        var directive = {};
        directive.restrict = 'E';
        directive.replace = false;
        directive.transclude = false;
        directive.template = '<input type="checkbox"><span ng-show="status()==1" title="提交中..." style="color:red;"><i class="fa fa-exclamation"></i></span><span ng-show="status()==2" title="成功" style="color:green"><i class="fa fa-check"></i></span>';
        directive.scope = {
            model: "=ngModel",
            change: "&ngChange",
            status: "&ngStatus"
        };
        directive.controller = function($scope, $http, $sce, $element, $attrs) {
            var ele = $element.find("input");
            $(ele).bootstrapSwitch({
                state:$scope.model,
                onColor:"success",
                offColor:"danger",
                onSwitchChange:function(event, state) {
                    $scope.$apply(function(){
                        $scope.model = state;
                        $scope.change();
                    });
                }
            });

        };
        return directive;
    });
}

function PatchUploader($scope, FileUploader, uploadPath, successCallback) {
    var uploader = $scope.uploader = new FileUploader({
            url: uploadPath
    });
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 2;
        }
    });
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        $scope.uploader.clearQueue();
        if (response.status != 0) {
            swal("上传失败!", response.message, "error");
            return;
        }
        successCallback(response.extra);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        swal("上传失败!", "HTTP错误:" + status, "error");
        $scope.uploader.clearQueue();
    };
}

function RegisterPage(app) {
    if (app.RegisterPage) return;
    app.RegisterPage= true;
    loadCSS("/angular-1.3.9/cusFile/ccpage.css");
    app.directive("ccpage", function () {
        var directive = {};
        directive.restrict = 'E';
        directive.replace = true;
        directive.transclude = false;
        directive.templateUrl = "/angular-1.3.9/cusFile/ccpage.html";
        directive.scope = {
            model: "=ngModel"
        };
        directive.controller = function($scope, $http) {
            //$scope.model.reload = $scope.reload;
            $scope.model.ccpage = $scope;
            $scope.pageNumbers = [1];
            $scope.reload = function() {
                $scope.query = $scope.model.query || {};
                //if (!$scope.query) $scope.query = {};
                if (!$scope.query.pageNo) {
                    $scope.query.pageNo = 1;
                }
                if (!$scope.query.pageSize) {
                    $scope.query.pageSize = 50;
                }
                $http.get($scope.model.dataUrl, {params:$scope.query}).success(function(data){
                    $scope.model.res = data;
                    $scope.pagination = data;
                    $scope.pageNumbers = [];
                    if ($scope.pagination.hasPrevious) {
                        $scope.pageNumbers.push($scope.pagination.pageNo - 1);
                    }
                    $scope.pageNumbers.push($scope.pagination.pageNo);
                    if ($scope.pagination.hasNext) {
                        $scope.pageNumbers.push($scope.pagination.pageNo+ 1);
                    }
                });
            };
            $scope.toFirst = function() {
                $scope.query.pageNo = 1;
                $scope.reload();
            };
            $scope.toLast = function() {
                $scope.query.pageNo = $scope.items.totalPages;
                $scope.reload();
            };
            $scope.toNext = function() {
                $scope.query.pageNo += 1;
                $scope.reload();
            };
            $scope.toPrevious = function() {
                $scope.query.pageNo -= 1;
                $scope.reload();
            };
            $scope.toPage = function(page) {
                $scope.query.pageNo = parseInt(page);
                $scope.reload();
            };

            $scope.reload();

        };
        return directive;
    });
}