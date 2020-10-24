# JS 实现简单模块化

## 1.介绍

> 你的传统开发项目是不是还存在于这种方式来引入模块呢？
>
> 本项目借助于Layui模块化的原理来实现



### 1.1例子：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div class="content">
        内容
    </div>

    <!-- 引入的模块 -->
    <script src="module1.js"></script>
    <script src="module2.js"></script>
    <script src="module3.js"></script>
    <script src="module4.js"></script>
    <script src="module3n.js"></script>
</body>
</html>
```





### 1.2更改后

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./core.js"></script>
</head>
<body>
    <button id="add-inner-btn">添加Inner模块</button>
    <button id="add-outter-btn">添加Outter模块</button>
    <script>
         /**
         * 使用说明：
         * const $mo = JsModule.create({
         *      moduleBaseUrl: "./js-modules/"
         * });
         * 
         * 1.定义模块
         * $mo.define(function (exports) {
         *      exports(模块名，模块内容);
         * });
         * 
         * 
         * 2.使用模块
         * $mo.use(模块名，function () {
         *      do sth...
         * });
         */

        
        //创建一个实例
        const $mo = LayuiJsModule.create({
            moduleBaseUrl: "./js-modules/"
        });

        //分别使用了，inner、bind-event模块
        $mo.use(["inner", "bind-event"], function ($) {
            console.log($)
            console.log("我已经加载好了模块了")
        });
    </script>
</body>
</html>
```



## 2.使用说明

#### 2.1 引入核心文件

```javascript
<script src="./core.js"></script>
```



#### 2.2创建一个模块实例

```javascript
//创建一个实例
const $mo = JsModule.create({
  	moduleBaseUrl: "./js-modules/" //模块对应的跟地址
});
```



#### 2.3创建一个模块

```javascript
//定义模块
$mo.define(function(exports) {
    let exportData = {
        name: "Outter Module",
        create: "2020-10-23",
        methods: {
            getUserTableList() {
                return [1, 2, 3, 4, 5]
            }
        }
    }

    //模块名称， 模块内容
    exports("outter", exportData)
});
```



#### 2.4使用模块

```javascript
//分别使用了outter模块
$mo.use(["outter"], function ($) {
  	console.log($); //导入的模块
  	console.log("我已经加载好了模块了")
});
```

