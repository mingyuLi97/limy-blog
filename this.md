# JS 中 this 的五种情况

1. 元素的事件绑定，事件触发，方法执行，方法中的 `this` 一般指当前元素
2. 函数执行，看前面是否有点， 点前面是谁 `this` 就是谁， 没有点 this 就是 window
3. 构造函数的 this 是当前类的实例
4. 箭头函数没有自己的 this， 其 this 指向创建时的上下文
5. 基于 call / apply / bind 暴力改变 this