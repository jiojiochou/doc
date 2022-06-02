## typescript 秘籍
## try { } catch(err){ } finally{ }

```ts
//可以用来判断，你可控的错误，就是说，你清楚知道这里可能出错，并且在什么前提下会出错，你就是故意利用报错信息来区分错误，后续的程序会解决所有的出错，让程序继续执行。
```

不使用try...catch出现异常后，后面的代码都不会运行了 

##### 语法示例：

![image-20220601095701525](daydayup.assets/image-20220601095701525.png)

##### 运行流程：

```ts
//1.try/catch/finally 语句用于处理代码中可能出现的错误信息
//2.try语句允许我们定义在执行时进行错误测试的代码块，
//3.catch 语句允许我们定义当 try 代码块发生错误时，所执行的代码块			try 代码块发生错误时 catch 代码块会自动捕获
//4.finally 语句在 try 和 catch 之后无论有无异常都会执行
//5.注意： catch 和 finally 语句都是可选的，但你在使用 try 语句时必须至少使用一个
//提示： 当错误发生时， JavaScript 会停止执行，并生成一个错误信息。使用 throw 语句 来创建自定义消息(抛出异常)。如果你将 throw 和 try 、 catch一起使用，就可以控制程序输出的错误信息,  try{...}包含块中的代码有错误，则运行catch（err）{...}内的代码，否则不运行catch{...}内的代码
```

## Promise

```ts
//解决回调地狱
```

``` ts
//定义: 是一个包裹异步操作的容器, 装一下就包装成 then 的写法了,主要意思就是转变一下回调函数的写法
```

```js
let p = new Promise(resolve => {
    setTimeout(() => {
        let x = 10
		resolve(x)			//setTimeout 中的回调函数(异步操作)中的操作,拎出来,到 then 里面写
    },2000)
})

p.then(res => {			//对应当前Promise 的 resolve,第二个函数对应 reject
    console.log('2s之后',x)
    return x			//返回给下一层用
})
//没有异步操作的话会立马打印
.then(res => {
    console.log(res) //res 上一层的返回值 x
})
.catch(() => {
    console.log('加载失败')
})
.finally(() => {
    log('成功或者失败都会执行')
})
```

##### 1.promise对象:

###### 	图片示例:

![image-20220411225537448](C:\Users\三岁大佬梦\AppData\Roaming\Typora\typora-user-images\image-20220411225537448.png)



```ts
//上层return 的如果是promise实例,则下一层对应的是promise 的 resolve
```

###### 图片代码示例:

![image-20220412090632858](C:\Users\三岁大佬梦\AppData\Roaming\Typora\typora-user-images\image-20220412090632858.png)

##### promise方法

![image-20220414120418722](C:\Users\三岁大佬梦\AppData\Roaming\Typora\typora-user-images\image-20220414120418722.png)

![5H0U{%DWIZZFJ$TNG92RS_4](C:\Users\三岁大佬梦\Desktop\5H0U{%DWIZZFJ$TNG92RS_4.png)

```ts
//请求多个接口,必须都成功

let p1 = setTime(2000,10)
let p2 = setTime(1000,5)

let [p1,p2] = Promise.all([p1,p2])
```



## mixins混入

1.是一个js对象

2.包含script选中的任意功能选项 如：（data、components、methods、created、computed）

3.将共用的功能以对象的方式传入mixins选项中，当组件使用mixins对象时所有mixins对象的选项都将被混入该组件本身的选项中来。

4.提高代码的重用性，是代码干净和易于维护。

5.多个组件中的数据或者功能很相近时，利用mixins将公共部分提取出来

![](E:\Typora\img\20200805173501551.png)

6.如何使用Mixins

```js
import { myMixins } from "@/Mixins/myMixins.js";
export default {
	mixins: [myMixins]
}
```

7.注意

Mixins.age = 18

组件1： 

```js
import { myMixins } from "@/Mixins/myMixins.js"
export default {
	mixins: [myMixins],
    data(){
        return{}
    },
    created(){this.age++}
}
//19
```

组件2： 

```js
export default {
  mixins: [myMixins],
  data() {
    return {}
  },
}
//18
```

总结： 组件1改变的值，组件2初始值

Mixins有合并冲突

**值为对象(components、methods 、computed、data)的选项，混入组件时选项会被合并，键冲突时优先组件，组件中的键会覆盖混入对象的**

**值为函数(created、mounted)的选项，混入组件时选项会被合并调用，混合对象里的钩子函数在组件里的钩子函数之前调用**

## 装饰器

```js
const tempclass = (val) => {
	val.test = '123'
}
@tempclass
class Test {}
Test.text;	//'123'
```

1.可以向一个现有的对象添加新的功能，同时又不改变其结构，是作为对现有类的一个包装。

2.不修改代码，就实现某些功能

## provide,inject组件通信

provide是一个js对象，inject（注入）类似于（props）

示例：

```js
//父组件提供 ‘num’
var Father = {
	provide: {
        num: 123
    }
}

var child = {
	inject: ['num'],
    created() {
        console.log(this.num)
    }
}
```

修饰符示例：

![image-20220314150217050](C:\Users\三岁大佬梦\AppData\Roaming\Typora\typora-user-images\image-20220314150217050.png)

1.名字要对应，且要注册对应的组件

## 布尔类型

```ts
//使用 boolean 来声明布尔类型的数据
//他的值只能是 true，false
let bool: boolean = true
```

##### 1.错误注意小点：

```ts
//使用Boolean构造函数来赋值
//使用Boolean构造函数创建时是一个对象，不是一个布尔值，实际上Boolean构造函数返回的是一个对象
let bool: boolean = new Boolean(1)
//不要使用 new 关键字来创建
//是可以的
let bool: boolean = Boolean(1)
```

##### 1.1图片示例：

![image-20220322202919350](C:\Users\三岁大佬梦\AppData\Roaming\Typora\typora-user-images\image-20220322202919350.png)

## 数值类型

```ts
//使用 number 来声明数值类型的数据
let num: number = 100
let num: number = 0xff00d
let num: number = NaN
let num: number = Infinity
```

## 字符串类型

```ts
//使用 string 来声明字符串类型的数据
let str: string = 'bobodi'
let str: string = `我是${name},我的年龄是${age}`
```

## Null、undefined

```ts
//是所有类型的子类型
//它可以赋值给任何类型
undefined 是连变量都没有 null 是右变量但没有值
let n: null = null
let u: undefined = undefined
let num: number = undefined
let num: number = null
```

## void

```ts
//js 没有空值（void）的概念
//可以用 void 表示没有任何返回值的函数
//没有实际意义，他的值只能是 undefined、null
let v: void = undefined
```



## interface 接口

```tsx
//接口是一个类型，不是一个真正的值,只能为对象指定类型
```

##### 1.定义行为和规范的

###### 1.1 一般写法示例：

```tsx
function person(obj:{ name:string }){
    console.log( obj.name );
}
//传参时必须要有 name 这个属性，属性值必须是：string
let myObj={ name: '张三' };
person(myObj);
```

###### 1.2 interface写法示例：

```tsx
//定义一个接口（相当于定义一个规范）里面的属性必须要有
interface info{
    name: string,
    //属性后面加上 ？ 此参数可有可无，接口定义的属性不能多也不能少
    age?: number
}
//描述一个函数，或者是定义一个函数的形状
interface fun {
    (name: string,age: number): void
}
function person(obj: info){
	console.log( obj.name );
}
let myobj = {name: '李四'}
person(myobj)
```

##### 2.定义对象接口规范

```tsx
interface obj{
    //key必须是字符串类型的，值是任何类型
	[key: string]: any
}
```

###### 2.1定义数组接口规范

```tsx
interface arr{
    //key必须是number类型的，值是任何类型
	[index: number]: any
}
```

###### 2.2interface	继承 	interface

```ts
interface Name {
    name: string
}

interface User extends Name {
	age: number
}
```

###### 2.3interface	继承	type

```ts
type Name = {
    name: string
}

interface User extends Name {
    age: number
}
```

## type

```ts
//定义对象的形状和函数的形状
//可以描述一个对象或者函数
//可以为任何类型指定别名
```

```ts
// 用  type  定义对象的形状 
// 描述一个对象
type user = {
    name: string,
    age: number
}
// 用  type  定义函数的规范
// 描述一个函数，或者是定义一个函数的形状
type fun = (name: string,age: number): void


```

##### 1.type	继承	type

```ts
type Name = {
    name: string
}
//用交叉类型来继承
type User = Name & {age: number}
```

##### 1.1type	继承	interface

```ts
interface Name {
	name: string
}

//利用  交叉类型  type 继承 interface
type User = Name & {age: number}
```

## Symbol类型

1.Symbol示例：

```tsx
const sym = Symbol()
let obj = {
    [sym]: 'bobodi'
};
console.log(obj[sym]) //'bobodi'
```



## Enum类型

##### 1.数字枚举示例：

```tsx
enum test {
	one, //0
    two, //1
    three, //2
    four //3
}
let temp: test = test.one // 0
```

##### 1.1枚举内类型也可以设置初始值示例：

```js
/* 当一个成员设置初始值，后面的成员紧跟着前一个成员的初始值往后递增 */
```

```tsx
enum test {
    one = 97, //设置初始值
    two,  //98
    three,  //99
    four  //100
}
let temp: test = test.four
console.log(temp) //100
```

##### 1.2**从成员名称到成员值**的普通映射,**从成员值到成员名称**的反向映射示例： 

```tsx
enum test{
	one,
    two,
    three,
    four
}
let temp = test[0] // 'one'
let temp = tes['one'] // 0
```

##### 2.字符串枚举示例：

```js
/* 字符串枚举的类型中，成员都必须是初始化字符串字面量 除了初始number字面量的时候，后面的成语不用初始化字面量*/
```

```tsx
enum test {
  one = 'one',
  two = 'two',
  three = 'three',
  four = 'four'
}

let temp: test = test.one
console.log(temp); //'one'
```

##### 3.异构枚举示例：

```js
enum yimeiju {
  A,
  B,
  C = 'xiaobaga',
  D = 'xiaoxiba',
  E = 9,
  F
}
```

## Any 类型

##### 1.使用时不会报错，无法使用TS提供的大量保护机制

```ts
//any 类型，可以被赋值任何类型
//访问它身上的任何未定义的属性，方法是不会报错的
```

##### 2.Unknown 类型

```js
//所用类型都可以赋值给Any类型，unknown也可以被赋值任何类型
```

```js
//Unknown 只能赋值给自己，或者Any类型，赋值给确定类型的变量会报错
```

## Tuple 类型

```js
//可以储存不同类型的值,可以使用元组
//元素的数量，类型都要匹配上，否则会报错
```

## 泛型

```ts
//用它来实现API，不仅支持现在的数据类型，也能支持未来的数据类型
```

![image-20220319221457326](C:\Users\三岁大佬梦\AppData\Roaming\Typora\typora-user-images\image-20220319221457326.png)

```ts
//图中尖括号 <T> 中的 T 被称为类型变量，它是我们希望传递给identity函数的类型的占位符，同时它被分配给value参数，用来代替它的类型，此时 T 充当的是类型，而不是特定的 Number 类型
```



## 类型断言

```js
//当我们需要在联合类型上访问其中一个的属性或者方法的时候需要类型断言
```

```tsx
//语法，第一种
值 as 类型
//语法，第二种
<类型>值 //不适合 jsx，<> 尖括号也有可能是 泛型
```

##### 1.类型断言中的错误示例示例：

```tsx
interface Cat {
    name: string;
    run(): void;
}
inertface Fish {
    name: string;
    you(): void;
}

function isFish(animal: Cat | Fish){
    if(typeof animal.you === 'function'){
        return true
    }
    return false
}
isFish()
```

###### 1.1图片示例：

![image-20220317222923353](C:\Users\三岁大佬梦\AppData\Roaming\Typora\typora-user-images\image-20220317222923353.png)

###### 1.2报错示例：

![image-20220317223212104](C:\Users\三岁大佬梦\AppData\Roaming\Typora\typora-user-images\image-20220317223212104.png)

```ts
//因为是联合类型所以报错了
//类型 Cat | Fish 上是没有这个属性或者方法的
//接口 Cat没有you()这个属性或者方法的
```

##### 2.非空断言

```ts
//语法
//具体而言，x!将从x值域中排除null 和 undefined。
!
```

###### 2.1非空断言示例：

```ts
let x: number | undefined = undefined
//排除null undefined ，可以赋值给y
let y: number = x!
console.log(typeof y) // undefined
```

###### 2.2确定赋值断言

```tsx
//加上！告诉ts变量z会被明确赋值
let z!: number;
setZvalue();
console.log(2 * z) // 在赋值前使用了变量

function setZvalue() {
    z = 10
}
```

![image-20220318114659951](C:\Users\三岁大佬梦\AppData\Roaming\Typora\typora-user-images\image-20220318114659951.png)

## 联合类型

```tsx
//它可以是指定类型中的任意一个
```

##### 1.联合类型示例

```tsx
//允许union的类型是 srting 或者是 number，但不能是其他类型
let union: string | number;
union = '张三';
union = 100
```

###### 1.1联合类型访问共同的方法或者属性示例： 

```tsx
//联合类型没有确定下来类型的是否，访问属性或者方法时会报错的
function getstr(temp: string | number){
    //console.log(temp.length) //sting 上有length 这个方法。number上是没有风格方法的 //会报类型的错误的
    return temp.toString() //这个方法string 和 number 都有不会报错
}
```

## 交叉类型

```tsx
//将多个类型合并为一个类型
```

```tsx
语法 & 运算符 可以将现有的类型叠加到一个类型上
```

###### 1.交叉类型示例：

```tsx
type PointX = { x: number }
type Point = PointX & { y:number }

//初始化值
let cross: Point = {
    x: 100,
    y: 100
}
```

## 类型守卫

```ts
//目前主要有四种的方式来实现类型保护
```

```ts
// in 关键字
// typeof 关键字
// instanceof 关键字
// 自定义类型保护的类型谓词('x is number')
```

## 声明文件

```ts
index.js  index.d.ts 一一对应

一般使用 declare 声明文件中的 已有变量的类型
像 'interface,type' ts 中特殊的 类型      不用在前面加上 declare 关键字进行再次声明
```



## 函数

```tsx
//ts 中函数的形参不能缺省 或者 超出
```

![image-20220318160459100](C:\Users\三岁大佬梦\AppData\Roaming\Typora\typora-user-images\image-20220318160459100.png)

##### 1.可选参数

```ts
参数名 + ？
```

##### 2.参数默认值

```ts
//参数有默认值的话，会变成可选参数，这时候就不受可选参数后面不能是必要参数的限制了
```

##### 3.剩余参数: rest参数

```ts
//rest 参数 形式为（...rest）,用于获取函数的多余参数，可以使用数组方法
```

##### 函数重载

###### 相同函数，不同参数数量或者参数类型创建多个方法的能力

```ts
//重载允许一个函数接受不同参数或类型的参数时，作出不同处理
```

###### 1.函数重载示例：

```ts
//重复定义了多次函数，前几次时函数的定义，最后一次是函数的实现
function diandao(x: number):number;
function diandao(x: string):string;
function diandao(x: number | string): number | string | void{
  if(typeof x === 'number'){
    return Number(x.toString().split('').reverse().join(''))
  }else if (typeof x === 'string'){
    return x.split('').reverse().join('')
  }
}
//321
diandao(123)
//olleh
diandao('hello')
```

## Class

```ts
// 对象的模型,批量产生对象,new 关键字
// 他身上有 public(公共的,可以任意访问) private(私有的,不能访问) protected(受保护的,只能在父类以及子类访问)
// static(静态的) 不用 new 就可以直接访问 身上的方法
```

```ts
个人理解
class 是对象的模板 通过 new 关键字来创建对象.
对象与对象之间 不相等 也就是说没有对象类型的引用关系, 但是都拥有相同的 属性(值不一样而已), 相同的方法
```

```ts
为什么要用class
例子: 1.创建一个 'person',name 是 'zs' 这个对象,再创建一个 'ls' 这个对象

let person = {
    name: 'zs',
    age: 18,
    say() {
        log('Hi')
    }
}
let person1 = {
    name: 'ls',
    age: 22,
    say() {
        log('Hi')
    }
}
//所以为什么不用 class 呢
class person {
    constructor(name,age){
        this.name = name;
        this.age = age
    }
    say() {
        log('Hi')
    }
}
const zs = new person('zs',18)
const ls = new person('ls',22)
```



##### get & set:	(getter / setter)存取器

![image-20220512103846595](C:\Users\三岁大佬梦\AppData\Roaming\Typora\typora-user-images\image-20220512103846595.png)

```ts
name: string
//getter
get() {
    return this.name
}
//setter
set(name) {
    return this.name = name
}

//访问和设置值都要 经过 get() set()
```

## 抽象类

```ts
abstract 关键字 修饰的 class 只能被其他类继承,
被 abstract 关键字 修饰的 方法 不需要被实现(抽象方法只能在抽象方法里面声明)
```













## webpack

```ts
// webpack 打包时要使用的模块

module: {
    // 指定加载的规则
    rules: [
        {
            // 指定规则生效的文件
            test: /\.ts$/
            // 要使用的loader
            use: [
            	,
            	'ts-loader' //从下往上执行
            ],
            exclude: /node-modules/
        }
    ]
}
```