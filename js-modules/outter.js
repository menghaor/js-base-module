//定义模块
$mo.define(function(exports) {
    let obj = {
        name: "Outter Module",
        create: "2020-10-23",

        methods: {
            getUserTableList() {
                return [1, 2, 3, 4, 5]
            }
        }
    }

    //模块名称， 模块内容
    exports("outter", obj)
});