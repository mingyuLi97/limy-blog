# 预备知识

#### 语法

>  target.addEventListener(type, listener, useCapture);

#### 参数

- **type**

  表示监听[事件类型](https://developer.mozilla.org/zh-CN/docs/Web/Events)的字符串。

- **listener**

  回调函数

- **useCapture**
  - true - 事件捕获模式
  - false - 事件冒泡模式

#### 详细文档 -  [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

# 完整代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div{
            text-align: center;
        }
        #a{
            width: 300px;
            height: 300px;
            background-color: pink;
        }
        #b{
            width: 200px;
            height: 200px;
            background-color: skyblue;
            margin: 25px auto;
        }
        #c{
            width: 100px;
            height: 100px;
            background-color: olivedrab;
            margin: 25px auto;
        }
    </style>
</head>
<body>
    <div id="a">    a
        <div id="b">    b
            <div id="c">    c
            </div>
        </div>
    </div>
    <script>
        a.addEventListener('click', () => {console.log("冒泡----a")})
        c.addEventListener('click', () => {console.log("冒泡----c")})

        a.addEventListener('click', () => {console.log("捕获----a")}, true)
        b.addEventListener('click', () => {console.log('捕获----b')}, true)
        c.addEventListener('click', () => {console.log("捕获----c")}, true)

        b.addEventListener('click', () => {console.log('冒泡----b')})
    </script>
</body>
</html>
```

# 运行截图

点击c																	点击b

![image-20200826163313355](/Users/limingyu/Library/Application Support/typora-user-images/image-20200826163313355.png)![image-20200826163333278](/Users/limingyu/Library/Application Support/typora-user-images/image-20200826163333278.png)

![image-20200826163709371](/Users/limingyu/Library/Application Support/typora-user-images/image-20200826163709371.png)

# 结论

1. DOM 事件流的3个阶段 (假定点击了盒子c)
   - 捕获阶段 - 向内传播
     - a => b => c
   - 目标阶段
     - c
   - 冒泡阶段 - 向外传播
     - c => b => a
2. 执行顺序
   - 先捕获后冒泡
   - 在执行目标阶段时，执行顺序按照注册顺序执行