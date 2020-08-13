# 数据类型检测

1. `typeof`

   原理：直接在计算机底层基于类型的值（二进制）进行检测

   ```javascript
   typeof null 				 // object
   typeof /^1/					 // object
   typeof new Date()		 // object
   typeof function(){}  // function
   ```

   弊端：

   - typeof 不能区别 普通对象/数组对象/正则对象/日期对象
   - 会错误的将 null 检测为 object

2. `instanceof` 

   原理：检测当前实例是否属于这个类，只要当前类出现在实例的原型链上，结果都是 true，能够区分对象到底是哪种对象

   ```javascript
   arr instanceof Object						// true
   1 instanceof Number							// false
   new Number(1) instanceof Number	// true
   "a" instanceof String						// false
   ```

   弊端：

   - 由于我们可以随意修改原型的指向，所以检测的结果可能不准确

   - 不能检测基本类型
   - null 和 undefined 使用 instanceof 时会抛出异常

   源码：

   ```javascript
   function instance_of(instance, classFunc){
     let classFuncPrototype = classFunc.prototype
     // Object.getPrototypeOf(obj) === obj.__proto__
     // IE 下不兼容 __proto__ 使用 getPrototypeOf
     proto = Object.getPrototypeOf(instance)
     while(true){
       if(proto === null){
         return false
       }
       if(proto === classFuncPrototype){
         return true
       }
       proto = Object.getPrototypeOf(proto)
     }
   }
   ```

3. `constructor`

   ```javascript
   arr.constructor === Array		// true
   (1).constructor === Number	// true
   arr.constructor === Object	// false
   ```

   原理：通过构造函数检测

   弊端：

   - 能够解决 instancof 不能检测基本类型的缺点，但是 constructor 可以随意更改，所以不准确
   - null 和 undefined 是无效对象，因此不存在 constructor，故不能对这两个作出判断

4. `Object.prototype.toString.call([value])`

   ```javascript
   Object.prototype.toString.call(1)		  // "[object Number]"
   Object.prototype.toString.call(NaN)	  // "[object Number]"
   Object.prototype.toString.call(true)	// "[object Boolean]"
   Object.prototype.toString.call([])		// "[object Array]"
   Object.prototype.toString.call({})		// "[object Object]"
   Object.prototype.toString.call(function(){})	// "[object Function]"
   Object.prototype.toString.call(null)	// "[object Null]"
   Object.prototype.toString.call(undefined)	// "[object Undefined]"
   ```

5. `jquery` 检测方法

   ```javascript
   const class2type = {},
         toString = class2type.toString, // 等价于 Object.prototype.toString
         typeList = "Boolean Number String Function Array Date RegExp Object Error".split(" "); 
   
   // 设定数据类型的映射表
   typeList.forEach(name => {
     class2type[`[object ${name}]`] = name.toLowerCase()
   })
   
   function toType(obj){
     if(obj == null){  // 如果传入的是 null 或者 undefined，返回对应的字符串
       return obj + ""
     }
     return typeof obj === "object" || typeof obj === "function" ?
       class2type[toString.call(obj)] || 'object':
     typeof obj
   }
   ```

   