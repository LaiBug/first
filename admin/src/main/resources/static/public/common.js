/**
 * Created by Administrator on 2016/9/29.
 */

function checkAll(checkbox) {
    var items = document.getElementsByName("dataItem");
    for (var i = 0; i < items.length; i++) {
        items[i].checked = checkbox.checked;
    }
}

/*菜单显示与隐藏*/
$(function(){
    $(".f-click").click(function(){
        $(this).siblings(".s-show").toggleClass("hidden");
    });
});

