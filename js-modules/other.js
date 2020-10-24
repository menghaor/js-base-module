//定义模块
$mo.define(function(exports) {
    let obj = {
        name: "Other Module",
        create: "2020-10-23"
    }

    //模块名称， 模块内容
    exports("other", obj)
});