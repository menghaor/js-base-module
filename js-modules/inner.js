/**
 * 定义一个模块名为： inner
 * 默认导入了  other、outter、utils 模块使用
 * 最后导出 inner模块出去
 * 
 */

$mo.define(["other", "outter", "utils", "org-list"], function(exports) {
    //这里就可以使用other、outter模块内容
    let $ = $mo,
        modules = $mo.__modules;
    let { other, outter, utils } = modules; //导入对应的模块
    console.log(modules)
    console.log(other, outter, utils);

    let exportData = {
        name: "Innser Module",
        create: "2020-10-23"
    }

    //模块名称， 模块内容
    exports("inner", exportData)
});