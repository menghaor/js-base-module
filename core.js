/**
 * Layuijs 模块实现原理
 * author： Haor
 * createTime: 2020-10-23
 * 
 */

;(function (win) {
    let instanceState = false;
    const __modules = {};
    class JsModule {
        constructor(config = {}) {
            //单例模式，只允许实例化一次
            if (instanceState) {
                throw new Error(`Singleton mode does not allow multiple instances to be initialized！`);
            } else {
                instanceState = true;
                this.__init(config);
            }
        }
        __modules = {}; //所有模块
        globelConf = null;
        MODULE_URL = "";
        useCbQueue = []; //使用回调队列----暂时未用
        defineCbQueue = []; //定义回调队列----暂时未用
    
        /**
         * 初始化
         */
        __init(conf) {
            this.globelConf = conf;
            this.MODULE_URL = conf.moduleBaseUrl || "";
        }
    
        /**
         * 使用模块
         * @param {String|Array} moduleList 
         * @param {Function} useCb 
         */
        use(moduleList, useCb) {
            let modules = Array.isArray(moduleList) ? moduleList : [moduleList];
            let _self = this;
            let loadIndex = 0;
            for (let k = 0; k < modules.length; k++) {
                loadIndex++
                let module = modules[k];
                let isRunUseCb = (loadIndex === modules.length && typeof useCb === "function");
                let isExist = this.checkModuleHasExist(module);
                //模块是否已经加载
                if (!isExist) {
                    let loadUrl = this.joinMoURL(module);
                    this.loadModuleScript(loadUrl, null, function () {
                        if (isRunUseCb) {
                            useCb(_self);
                            loadIndex = 0;
                        }
                    });
                } else {
                    console.log(module + "已加载了")
                    if (isRunUseCb) {
                        useCb(_self);
                        loadIndex = 0;
                    }
                }
            }
            return this;
        }
    
        /**
         * 定义模块
         * @param {String|Array|Function} moduleName 定义同时可以导入其他模块再地外暴露
         * @param {Function} exportCb 导入回调函数
         */
        define(moduleName, exportCb) {
            let handleCb = exportCb;
            let _self = this;
            let doDefineExportCb = this.doDefineExportCb.bind(_self);
            if (typeof moduleName === "function") {
                handleCb = moduleName;
                doDefineExportCb(handleCb);
            } else {
                _self.use(moduleName, () => {
                    doDefineExportCb(handleCb)
                });
            }
            return _self;
        }

        /**
         * 运行define export回调
         * @param {Function} exportCb 
         */
        doDefineExportCb(exportCb) {
            let _self = this;
            let moMap = _self.__modules;

            //调用export回调函数
            exportCb.call(_self, function (exportModuleName, exportData) {
                let moduleHasExist = _self.checkModuleHasExist(exportModuleName);
                if (moduleHasExist) {
                    console.log(exportModuleName + "模块已存在！")
                    return;
                }
                moMap[exportModuleName] = exportData || null;
            })
        }

        /**
         * 检查模块是否存在
         * @param {String} moName
         * @returns {Boolean}
         */
        checkModuleHasExist(moName) {
            return Object.prototype.hasOwnProperty.call(this.__modules, moName);
        }

        /**
         * 模块内容包装
         * @param content 内容
         * @returns {Object}
         */
        moduleContentWrap(content) {
            return {
                content,
                createTime: Date.now(),
                updateTime: null
            }
        }
    
        /**
         * 拼接模块地址
         * @param {String} moduleName 模块名称
         * @returns {String}
         */
        joinMoURL(moduleName) {
            return this.MODULE_URL + moduleName + '.js';
        }
        
        /**
         * 加载模块脚本
         * @param {String} url
         * @param {Object} attrs
         * @param {Function} loadedCb
         */
        loadModuleScript(url, attrs, loadedCb) {
            let el = document.createElement("script");
            let doc = document.body;
            el.src = url;
            this.setScriptAttr(el, attrs)
            doc.appendChild(el);
            el.onload = function () {
                setTimeout(function () {
                    doc.removeChild(el)
                }, 0)
                typeof loadedCb === "function" && loadedCb.call(this);
            };
            return this;
        }

        /**
         * 设置脚本属性
         * @param {*} el 
         * @param {*} attrs 
         */
        setScriptAttr(el, attrs = {}) {
            for (let key in attrs) {
                el.setAttribute(key, attrs[key]);
            }
        }
    }

    //检测此类是否挂载在window中
    win.JsModule = win.JsModule ? win.JsModule : JsModule;
})(window);


//采用单例模式，避免一个项目中出现多个实例
JsModule.create = (function () {
    let instace = null;
    return function (conf) {
        if (!instace) {
            instace = new JsModule(conf)
        }
        return instace;
    }
})();