$mo.define(exports => {
    //动态添加模块
    ;(function (win, doc, $mo) {
        //添加inner
        function addInnerHandle(e) {
            $mo.use('inner', function () {
                console.log("已加载好了inner模块了")
            })
        };

        //添加outter
        function addOutterHandle() {
            $mo.use('outter', function () {
                console.log("已加载好了outter模块了")
            })
        }
        
        //绑定事件
        function bindEvent() {
            doc.getElementById('add-inner-btn').addEventListener('click', addInnerHandle, false);
            doc.getElementById('add-outter-btn').addEventListener('click', addOutterHandle, false);
        }
        
        //初始化
        function _init() {
            bindEvent();
        }

        _init();
    })(window, document, $mo);
    exports("bindEvent", {})
})