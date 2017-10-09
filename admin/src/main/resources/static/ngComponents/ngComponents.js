function RegisterDateRange1(app) {
    if (app.RegisterDateRange1) return;
    app.RegisterDateRange1 = true;
    app.directive("ccdaterange", function () {
        var directive = {};
        directive.restrict = 'E';
        directive.replace = true;
        directive.transclude = false;
        directive.templateUrl = "/ngComponents/daterange1.html";
        directive.scope = {
            model: "=ngModel"
        };
        function toComDate(v) {
            if (!v) return "";
            return v.split(' ')[0];
    }
        directive.controller = function($scope, $http, $sce, $element, $attrs) {
            var start = $element.find("[name=beginDate]")[0];
            var end = $element.find("[name=endDate]")[0];
            var fake = $element.find(".date-picker")[0];
            $(start).val(toComDate($scope.model.start));
            $(end).val(toComDate($scope.model.end));
            if ($(start).val() || $(end).val()) {
                $(fake).val($(start).val() + " - " + $(end).val());
            }
            var datepicker = new DatePicker({
                ele:$(fake),
                type:'dateRangePicker',
                titles:['请选择开始日期','请选择结束日期'],
                targets:[$(start),$(end)],
                earliest:'',
                latest:'',
                callback:{
                    onConfirm: function(start,end){
                        if (!start || !end) {
                            $(fake).val('');
                        }else{
                            $(fake).val(datepicker.format(start)+' - '+datepicker.format(end));
                        }
                        $scope.model.start = datepicker.format(start) + " 00:00:00";
                        $scope.model.end = datepicker.format(end) + " 00:00:00";
                        $(fake).trigger('change');
                    },
                    onchange: function(){
                    }
                }
            });
            datepicker.on('empty',function(){
                fake.val('');
            });
        };
        return directive;
    });
}
function RegisterDateRange2(app) {
    if (app.RegisterDateRange2) return;
    app.RegisterDateRange2 = true;
    app.directive("ccdaterange2", function () {
        var directive = {};
        directive.restrict = 'E';
        directive.replace = true;
        directive.transclude = false;
        directive.templateUrl = "/ngComponents/daterange2.html";
        directive.scope = {
            model: "=ngModel"
        };
        function toComDate(v) {
            if (!v) return "";
            return v.split(' ')[0];
        }
        directive.controller = function ($scope, $http, $sce, $element, $attrs) {

               var a  = daterangepicker({
                    timePicker: true,
                    singleDatePicker: true,
                    showDropdowns: true,
                    timePicker24Hour: true,
                    locale: {
                        format: 'YYYY/MM/DD HH:mm:ss'
                    }
                });

        }
        return a;
    });

}

function RegisterForm1(app) {
    if (app.RegisterForm1) return;
    app.RegisterForm1 = true;
    app.directive("ccform", function () {
        var directive = {};
        directive.restrict = 'E';
        directive.replace = true;
        directive.transclude = false;
        directive.templateUrl = "/ngComponents/form1.html";
        directive.scope = {
            model: "=ngModel"
        };

        directive.controller = function($scope, $http, $sce, $element,$attrs) {
            function render() {
                $scope.instance = angular.copy($scope.model.instance || {});
                $scope.model._model = $scope;
                $scope.multiselects = {};
                $scope.model.fieldMap = {};
                for (var i in $scope.model.fields) {
                    var field = $scope.model.fields[i];
                    $scope.model.fieldMap[field.field] = field;
                    if (field.onChange) {
                        (function() {
                            var tmpField = field;
                            $scope.$watch("instance." + field.field, function(){
                                tmpField.onChange($scope.instance);
                            });
                        })();
                    }

                    if (field.type == 'select') {
                        if (!field.defaultValue) {
                            field.defaultValue = "";
                        }
                    }
                    else if (field.type == 'daterange') {
                        $scope.instance[field.field] = {start:$scope.instance[field.startField], end:$scope.instance[field.endField]};
                    }
                    if (field.defaultValue != undefined) {
                        if (!$scope.instance[field.field]) {
                            $scope.instance[field.field] = field.defaultValue;
                        }
                    }
                    if (field.type == 'multiselect') {
                        (function(){
                            var tmpField = field;
                            $scope.$watch("model.fieldMap." + tmpField.field + ".selector", function() {
                                $scope.multiselects[tmpField.field].selector = tmpField.selector;
                            });
                            $scope.multiselects[tmpField.field] = {selector:tmpField.selector,value:$scope.instance[tmpField.field],
                                onChange:function(){
                                    $scope.instance[tmpField.field] = $scope.multiselects[tmpField.field].value;
                                    if (tmpField.onChange) {
                                        tmpField.onChange($scope.instance);
                                    }
                                }};
                        })();

                    }
                }
            }
            $scope.$watch("model.instance", function(){
                render();
            });


            $scope.getHtml = function(hml) {
                return $sce.trustAsHtml(hml);
            };
            $scope.onSave = function() {
                var instance = angular.copy($scope.instance);
                for (var i in $scope.model.fields) {
                    var field = $scope.model.fields[i];
                    if (field.type == "daterange") {
                        var v = instance[field.field];
                        instance[field.startField] = v.start;
                        instance[field.endField] = v.end;
                        delete instance[field.field];
                    }
                }
                if ($scope.model.onSave) {
                    $scope.model.onSave(instance, $scope);
                }
            };
            $scope.onCancel = function() {
                if ($scope.model.onCancel) {
                    $scope.model.onCancel($scope);
                }
            };
        };
        return directive;
    });
}
function RegisterSelector1(app) {
    if (app.RegisterSelector1) return;
    app.RegisterSelector1 = true;
    app.directive("ccselector", function () {
        var directive = {};
        directive.restrict = 'E';
        directive.replace = true;
        directive.transclude = false;
        directive.templateUrl = "/ngComponents/selector1.html";
        directive.scope = {
            model: "=ngModel"
        };
        directive.compile = function(element, attributes) {
            var linkFunction = function($scope, element, attributes) {
                $scope.name = "";
                $scope.showSelector = false;
                $scope.items = [];
                function render() {
                    var items = $scope.model.items;
                    $scope.items = [];
                    $scope.disable = false;//items.length <= 1;
                    for (var i in items) {
                        var item = items[i];
                        if (typeof(item) == "object") {
                            item.index = i;
                        } else {
                            item = {value: item, name: item + "", index: i};
                        }
                        if (item.value == $scope.model.value) {
                            $scope.name = item.name;
                        }
                        $scope.items.push(item);
                    }
                }
                $scope.$watch("model.items", function(){
                    render();
                });
                $scope.onSelect = function() {
                    if ($scope.disable) return;
                    $scope.showSelector = !$scope.showSelector;
                };
                $scope.onItemClick = function(item) {
                    if ($scope.disable) return;
                    $scope.showSelector = false;
                    $scope.model.value = item.value;
                    $scope.name = item.name;
                    if ($scope.model.onChange) {
                        $scope.model.onChange();
                    }
                };
            }
            return linkFunction;
        };

        return directive;
    });
}

function RegisterSwitch1(app) {
    if (app.RegisterSwitch1) return;
    app.RegisterSwitch1 = true;
    app.directive("ccswitch", function () {
        var directive = {};
        directive.restrict = 'E';
        directive.replace = false;
        directive.transclude = false;
        directive.templateUrl = "/ngComponents/switch1.html";
        directive.scope = {
            model: "=ngModel"
        };
        directive.controller = function($scope, $http, $sce, $element, $attrs) {
            $scope.status = 0;
            var ele = $element.find("input");
            $(ele).bootstrapSwitch({
                state:$scope.model.value,
                onColor:"success",
                offColor:"danger",
                onSwitchChange:function(event, state) {
                    $scope.model.value = state;
                    if ($scope.model.onChange) {
                        $scope.$apply(function() {
                            $scope.status = 1;
                        });
                        $scope.model.onChange(function() {
                            setTimeout(function() {
                                $scope.$apply(function () {
                                    $scope.status = 2;
                                });
                            }, 10);
                            setTimeout(function() {
                                $scope.$apply(function(){
                                    $scope.status = 0;
                                });
                            }, 2000);
                        });
                    }
                }
            });

        };
        return directive;
    });
}
function RegisterCombobox1(app) {
    if (app.RegisterCombobox1) return;
    app.RegisterCombobox1 = true;
    app.directive("cccombobox", function () {
        var directive = {};
        directive.restrict = 'E';
        directive.replace = false;
        directive.transclude = false;
        directive.templateUrl = "/ngComponents/combobox1.html";
        directive.scope = {
            model: "=ngModel"
        };
        directive.controller = function($scope, $http, $sce, $element, $attrs) {
            var ele = $element.find("select");
            function render() {
                var list = "";;
                for (var i in $scope.model.selector) {
                    var item = $scope.model.selector[i];
                    var name, value;
                    if (typeof(item) == "object") {
                        name = item.name;
                        value = item.value;
                    } else {
                        name = value = item;
                    }
                    if (typeof(item.value) == 'number') {
                        list += "<option value=" + value + ">" + name + "</option>";
                    } else {
                        list += "<option value='" + value + "'>" + name + "</option>";
                    }
                }
                $(ele).html(list);
                $(ele).combobox({
                    select:function() {
                        $scope.model.value = $(this).val();
                        if ($scope.model.onChange) {
                            $scope.model.onChange();
                        }
                    }});
                if ($scope.model.value) {
                    $(ele).val($scope.model.value);
                }
            }
            $scope.$watch("model.selector", function(){
                render();
            });

            //$(ele).change(function(){
            //    $scope.model.value = $(this).val();
            //    if ($scope.model.onChange) {
            //        $scope.model.onChange();
            //    }
            //});
        };
        return directive;
    });
}
function RegisterMultiSelector1(app) {
    if (app.RegisterMultiSelector1) return;
    app.RegisterMultiSelector1 = true;
    app.directive("ccmultiselector", function () {
        var directive = {};
        directive.restrict = 'E';
        directive.replace = false;
        directive.transclude = false;
        directive.templateUrl = "/ngComponents/multiselector1.html";
        directive.scope = {
            model: "=ngModel"
        };
        directive.controller = function($scope, $http, $sce, $element, $attrs) {
            var ele = $element.find("select");
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
                var list = "";
                for (var i in $scope.model.selector) {
                    var item = $scope.model.selector[i];
                    var name, value;
                    if (typeof(item) == "object") {
                        name = item.name;
                        value = item.value;
                    } else {
                        name = value = item;
                    }
                    if (typeof(item.value) == 'number') {
                        list += "<option value=" + value + ">" + name + "</option>";
                    } else {
                        list += "<option value='" + value + "'>" + name + "</option>";
                    }
                }
                $(ele).html(list);
                if ($scope.model.value) {
                    $(ele).val($scope.model.value);
                }
                $(ele).multiselect('refresh');
            }
            $scope.$watch("model", function(){
                render();
            });
            $scope.$watch("model.selector", function(){
                render();
            });

            $(ele).change(function(){
                $scope.model.value = $(this).val();
                if ($scope.model.onChange) {
                    $scope.model.onChange();
                }
            });
        };
        return directive;
    });
}

function RegisterTable1(app) {
    if (app.RegisterTable1) return;
    app.RegisterTable1 = true;
    app.directive("cctable", function () {
        var directive = {};
        directive.restrict = 'E';
        directive.replace = false;
        directive.transclude = false;
        directive.templateUrl = "/ngComponents/table1.html";
        directive.scope = {
            model:"=ngModel"
        };
        directive.controller = function($scope, $http, $element,$attrs) {
            $scope.model._model = $scope;
            $scope.cols = $scope.model.cols;
            $scope.remote = $scope.model.remote;
            $scope.onDelete = function(item) {
                var des = item.title || item.name || "当前项";
                layer.confirm("是否删除\"" + des + "\"?", {icon: 4, title:"删除"},
                    function(index) {
                        layer.close(index);
                        $scope.model.action.onDelete(item);
                    });
            }

            $scope.query = {};
            $scope.pageSizeSelector = {items:[10, 20, 50, 100, 200, 500], value:10,
                onChange:function(){
                    $scope.pageSize = $scope.pageSizeSelector.value;
                    $scope.refresh();
                }};
            $scope.total = 0;
            $scope.pageNo = 1;
            $scope.totalPage = 1;
            $scope.pageSize = 10;
            $scope.items = [];

            if ($scope.totalPage <= 1) $scope.totalPage = 1;
            $scope.pageNoSelector = {items:[], value:1, onChange:function(){
                $scope.pageNo = $scope.pageNoSelector.value;
                $scope.refresh();
            }};
            for (var i = $scope.pageNo; i <= $scope.totalPage; i++) {
                $scope.pageNoSelector.items.push(i);
            }
            $scope.getLink = function(col, item) {
                if (typeof(col.link) == "function") {
                    return col.link(item);
                } else {
                    return col.link;
                }
            };
            $scope.getFormat = function(value, col, item) {
                if (!col.formatter) {
                    return value || '';
                }
                if (value instanceof Array) {
                    var ret = "";
                    for (var i in value) {
                        var v = value[i];
                        v = $scope.getFormat(v, col, item);
                        if (ret) ret += ",";
                        ret += v;
                    }
                    return ret;
                }
                if (typeof(col.formatter) == "function") {
                    return col.formatter(value, col, item);
                }
                else if (typeof(col.formatter) == "object") {
                    if (col.formatter instanceof Array) {
                        for (var i in col.formatter) {
                            if (value == col.formatter[i].value) {
                                return col.formatter[i].name || '';
                            }
                        }
                    } else {
                        return col.formatter[value] || '';
                    }
                } else {
                    return value || '';
                }
            }
            function registerSwitch(item, col) {
                item['__' + col.field] = {
                    value: item[col.field],
                    onChange: function(callback) {
                        item[col.field] = item['__' + col.field].value;
                        if (col.onChange) {
                            col.onChange(item, callback);
                        } else {
                            callback();
                        }
                    }
                }
            }
            $scope.toPage = function(pageNo, callback) {
                $scope.query.pageNo = pageNo;
                $scope.query.pageSize = $scope.pageSize;
                if ($scope.model.onQueryBefore) {
                    $scope.model.onQueryBefore($scope);
                }
                $http.get($scope.remote.listUrl, {params:$scope.query})
                    .success(function(data, status, headers, config){
                        if ($scope.model.onDataFilter) {
                            data.datas = $scope.model.onDataFilter($scope, data.datas);
                        }
                        for (var i = 0; i < data.datas.length; i++) {
                            var item = data.datas[i];
                            for (var ci in $scope.model.cols) {
                                var col = $scope.model.cols[ci];
                                if (col.type == 'switch') {
                                    registerSwitch(item, col);
                                }
                            }
                        }
                        $scope.items = data.datas;
                        $scope.total = data.totalCount;
                        $scope.pageNo = data.pageNo;
                        $scope.totalPage = data.totalPage;
                        if ($scope.totalPage <= 1) $scope.totalPage = 1;
                        $scope.pageNoSelector.items = [];
                        for (var i = 1; i <= $scope.totalPage; i++) {
                            $scope.pageNoSelector.items.push(i);
                        }
                        $scope.pageNoSelector.value = $scope.pageNo;
                        if (callback) {
                            callback();
                        }
                        if ($scope.model.onDataFetch) {
                            $scope.model.onDataFetch($scope);
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
        };
        return directive;
    });
}

var initComboboxTag = false;
function initCombobox() {
    if (initComboboxTag) return;
    initComboboxTag = true;
    (function ($) {
        $.widget("custom.combobox", {
            _create: function () {
                this.wrapper = $("<span>")
                    .addClass("custom-combobox")
                    .insertAfter(this.element);

                this.element.hide();
                this._createAutocomplete();
                this._createShowAllButton();
            },

            _createAutocomplete: function () {
                var selected = this.element.children(":selected"),
                    value = selected.val() ? selected.text() : "";

                this.input = $("<input>")
                    .appendTo(this.wrapper)
                    .val(value)
                    .attr("title", "")
                    .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
                    .autocomplete({
                        delay: 0,
                        minLength: 0,
                        source: $.proxy(this, "_source")
                    })
                    .tooltip({
                        tooltipClass: "ui-state-highlight"
                    });

                this._on(this.input, {
                    autocompleteselect: function (event, ui) {
                        ui.item.option.selected = true;
                        this._trigger("select", event, {
                            item: ui.item.option
                        });
                    },

                    autocompletechange: "_removeIfInvalid"
                });
            },

            _createShowAllButton: function () {
                var input = this.input,
                    wasOpen = false;

                $("<a>")
                    .attr("tabIndex", -1)
                    .attr("title", "")
                    .tooltip()
                    .appendTo(this.wrapper)
                    .button({
                        icons: {
                            primary: "ui-icon-triangle-1-s"
                        },
                        text: false
                    })
                    .removeClass("ui-corner-all")
                    .addClass("custom-combobox-toggle ui-corner-right")
                    .mousedown(function () {
                        wasOpen = input.autocomplete("widget").is(":visible");
                    })
                    .click(function () {
                        input.focus();

                        // Close if already visible
                        if (wasOpen) {
                            return;
                        }

                        // Pass empty string as value to search for, displaying all results
                        input.autocomplete("search", "");
                    });
            },

            _source: function (request, response) {
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                response(this.element.children("option").map(function () {
                    var text = $(this).text();
                    if (this.value && ( !request.term || matcher.test(text) ))
                        return {
                            label: text,
                            value: text,
                            option: this
                        };
                }));
            },

            _removeIfInvalid: function (event, ui) {

                // Selected an item, nothing to do
                if (ui.item) {
                    return;
                }

                // Search for a match (case-insensitive)
                var value = this.input.val(),
                    valueLowerCase = value.toLowerCase(),
                    valid = false;
                this.element.children("option").each(function () {
                    if ($(this).text().toLowerCase() === valueLowerCase) {
                        this.selected = valid = true;
                        return false;
                    }
                });

                // Found a match, nothing to do
                if (valid) {
                    return;
                }

                // Remove invalid value
                //this.input
                //    .val( "" )
                //    .attr( "title", value + " didn't match any item" )
                //    .tooltip( "open" );
                this.element.val("");
                this._trigger("select", event, {});
                this._delay(function () {
                    this.input.tooltip("close").attr("title", "");
                }, 2500);
                //this.input.autocomplete( "instance" ).term = "";
            },

            _destroy: function () {
                this.wrapper.remove();
                this.element.show();
            }
        });
    })(jQuery);
}

