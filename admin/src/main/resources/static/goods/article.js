/**
 * Created by Administrator on 2016/9/29.
 */

function deleteItem(id) {
    angular.element(document.getElementById('app')).scope().deleteItem(id);         //有参数的话一定要传参数
}
function pushItem(ids) {
    angular.element(document.getElementById('app')).scope().pushItem(ids);
   /* console.log(ids);
    $.ajax({
        type: "POST",
        contentType: 'application/json;charset=UTF-8',
        //headers: {'Content-Type': ''},
        url: "http://192.168.10.203:8080/article/push",
        dataType: "json",
        data: JSON.stringify(ids),
        success: function(data) {
            console.log("data:" + data);
        }
    });*/
}

function batchAction(){
    //var action = $("#actionType").val();
    var action =$('#actionType option:selected') .val();//选中的值
    if("delete"==action){
        var dataItems=document.getElementsByName("dataItem");
        for(var i=1;i<dataItems.length;i++){            //这个不要直接放在article.html，不然  ;i<..; 会报错
            if(dataItems[i].checked) {
                var id=dataItems[i].value;
                deleteItem(id);
            }
        }
    }else if("push"==action){
        var dataItems=document.getElementsByName("dataItem");
        var ids = [];// 创建数组
        for(var i=1;i<dataItems.length;i++){
            if(dataItems[i].checked) {
                var id=dataItems[i].value;
                ids.push(id); // 添加到最后
                //ids.unshift(); // 添加到第一个位置
            }
        }
        pushItem(ids);
        $("#pullDiv").css("display","block");
    }
}


$(function(){
    $("#hide1").click(function(){
        $(".hidden1").toggleClass("hidden");
        var h1=$("#hide1").text();
        if(h1.indexOf("隐藏")>=0){
            $("#hide1").text("显示");
        }else{
            $("#hide1").text("隐藏");
        }
    });
    $("#hide2").click(function(){
        $(".hidden2").toggleClass("hidden");
        var h2=$("#hide2").text();
        if(h2.indexOf("隐藏")>=0){
            $("#hide2").text("显示");
        }else{
            $("#hide2").text("隐藏");
        }
    });
})