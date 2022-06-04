---
title: nodejs
date: 2022-6-3
author: jiojiochou
keys:
 - '83553175@qq.com'
---
## nodejs

##### fs 模块(文件操作系统):

```js
//										 文件系统 --------> 都是错误先行
```

###### 1.**==读文件==**:

```js
const fs = require('fs')
fs.readFile('./url','utf8',(err,data) => {
    if(err) return console.log('读取文件失败: ' + err.message)
    //读取到的是 buff格式的 可以 toString()
    console.log(data)
})
```

###### 2.**==写文件==**:

```js
const fs = require('fs')
fs.wirteFile('./url','内容',err => {
    if(err) return console.log('写入失败: ' + err.message)
    console.log('写入成功')
})
```

###### 3.**==删除文件==**:

```js
const fs = require('fs')
fs.unlink('./url',err => {
    if(err) return console.log('删除失败' + err.message)
    console.log('删除成功')
})
```

###### 4.**==改文件名称==**:

```js
const fs = require('fs')
fs.rename('./oldUrl','./newUrl',err => {
    if(err) return console.log('修改失败' + err.message)
    console.log('修改成功')
})
```

###### 5.**==查找文件是否存在==**:

```js
const fs = require('fs')
fs.exists('./url',whether => {
    if(whether) return console.log('有')
    console.log('没有')
})
```

###### 6.**==创建目录==**:

```js
const fs = require('fs')
fs.mkdir('./url',err => {
    if(err) return console.log('创建目录失败' + err.message)
    console.log('创建目录成功')
})
```

###### 7.**==删除目录==**:

```js
const fs = require('fs')
fs.rmdir('./url',err => {
    if(err) return console.log('删除目录失败' + err.message)
    console.log('删除目录成功')
})
```

##### path 模块(路径操作)

```js
//	__dirname  代表当前文件所处的目录
```

###### 1.join方法:

```js
const path = require('path')
// 	 只有 ../ 会抵消紧挨着前面的一层路径
//	 获得完整的路径
path.join(__dirname,'/a','/b','./c','../','./d','e')
```

###### 2.在路径中获取文件名:

```js
path.basename()

let pathStr = '/a/b/c/d/e/index.html'
let fileName = path.basename(pathStr) //index.html
//不要拓展名
let fileName = path.basename(pathStr,'.html') // index
```

###### 3.获取文件扩展名:

```js
path.extname()

let fileName = path.extname(pathStr) // .html
```

##### querystring 模块

```js
// 专门处理查询字符串
```

###### 1.把查询字符串解析为对象:

```js
const qs = require('querystring')

let obj = qs.parse(str) // {name: zs, age: 18, sex: 男}
```



##### http 模块(web服务)

###### 1.创建基本的服务器:

```js
const http = require('http')
// 创建实例服务
const server = http.createServer()
// 监听客户端的 请求事件 
server.on('request',(req,res) => {
    req.url // 客户端请求的 路径 默认 '/' (/index,/user.....)
    req.method // 客户端请求的方法 "GET" or "POST"
    req.on('data',()=> {}) // 客户端的数据
    req.on('end',()=> {}) //客户端数据发送完毕
    
    res.setHead('Content-Type','text/html; charset=utf-8') //防止中文乱码
    res.end() // 相应给客户端的方法 
})

//绑定端口号
server.listen(80,() => {
    console.log('server runnig at http://127.0.0.1')
})
```

##### 模块化

```js
// require 引入
// exports 暴露
// module.exports 暴露
```

```js
// exports 和 module.exports 指向的是同一个对象
// 但永远暴露的是 module.exports 所指定的对象
```

##### 模块的加载机制

```js
1.查找指定文件 (指定什么文件,就查找什么文件)
2.如果找不到会在文件后面 依次拼接上后缀 分别为 (.js/.json/.node)的文件,如果是目录会查看 有没有 package.json 文件里面有没有"main"属性所指定要加载的文件,没有默认加载 'index.js'

3.不指定 ./ 或者 ../ 这样的路径 node会认为是内置模块 或者 第三方模块 内置模块和第三方模块名字一样,优先加载内置模块.加载第三方模块的时候,会在当前引入的文件的父级找文件名为 node_modules 的文件夹里面去找所指定的模块,找到指定模块后找 package.json 里面的"main"所指定的文件名进行加载,没有默认加载 'index.js',如果找不到会一层层向上查找直到根目录报错为止
4.多次引入同一个模块,会运行第一次引入的是否, 因为有缓存
```

##### express 第三方模块(web构建)

###### 1.get请求和post请求:

```js
const express = require('express')
const app = express()

app.get('/',(req,res) => {
    req.query
    req.parmes
    req.body
    
    res.send()
})
app.post('/',(req,res) => {
    //....
})

app.listen(80,()=> {
	console.log('express server running at http://127.0.0.1')
})
```

###### 2.静态资源访问

```js
app.use(express.static('public')) //指定静态资源文件夹

app.use('public',express.static('public')) // 访问时必须加上 /public 前缀才能访问 静态资源
```

###### 3.中间件

```js
//给函数添加 next 就成为了 中间件
// 请求 / 的时候 触发的中间件
app.get('/',(req,res,next) => {
    req.name = 'zs'
    //放行操作,不调用它程序不会往下执行
    next()
})
// 上游中间件的 req,res 下游的中间件和路由 是共享的
app.get('/',(req,res) => {
    console.log(req.name) // zs
})
```

###### 4.app.use() 中间件

```js
//全局中间件
app.use((req,res,next) => {
    //....
})

app.use('/index',(req,res,next) => {
    //...
})
```

###### 4.1错误处理中间件

```js
//定义在后面的中间件,用于捕捉错误,防止因为错误造成页面崩溃
app.use((err, req, res, next) => {
    res.status(500).send('服务器发生错误');
})
```



###### 5.解决跨域问题

```js
npm i cors
const cors = require('cors')
//	在路由之前调用

app.use(cors())
```

###### 5.urlcoded

```js
//用于解析 请求体 urlcoded格式的中间件
app.use(express.urlcoded({exxxxx: true}))
```

###### 6.项目与mysql建立关联,操作数据库:

```js
// n
const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',		//数据库的IP 地址
    user: 'root',			//登录数据库的账号
    password: '123456',		//登录数据库的密码
    database: 'my_db'		//指定要操作那个数据库
})
```

###### 7.select语句查找数据库数据:

```js
db.query('select * from users',(err,rlt) => {
	if(err) return console.log(err.message)
    console.log(rlt)
})
```















## Mysql

##### 1.DataType 数据类型:

```js
1. int 整形
2. varchar(len) 字符串
3. tinyint(1) 布尔值
```

##### 2.字段的特殊标识:

```js
1. PK (Primary Key) 主键.唯一标识
2. NN (Not Null) 值不允许为空
3. UQ (Unique) 值唯一
4. AI (Auto Increment) 值自动增长
```















## 业务实例

##### 1.web开发模式:

```js
1. 服务端直接渲染页面
2. 前后端分离
3. 两者混合
```

##### 2.身份认证的概念:

```js
// 又称 身份认证,身份鉴权, 通过一定手段对用户身份的确认

// 确认当前所声称为某种身份的用户, 确实是所声称的用户

// 服务端渲染 推荐使用 session 认证机制

// 前后端分离 推荐使用 JWT认证机制
```

##### 3.cookie:

```js
1. 存储在用户的浏览器中的一段不超过 4KB 的字符串, 它是由一个 key value组成

// Cookie 的特点
. 不同域名下的 Cookie 各自独立 // 域名独立
. 每当客户端发起请求的时候, 会自动把当前域名下所有未过期的 Cookie 一同发送到服务器 // 自动发送,前提未过期的所用的
. 有过期时限
. 4 KB


// 客户端第一次请求的时候,服务端 通过响应头的形式, 向客户端发送一个身份认证的 Cookie,客户端会自动将 Cookie 保存在浏览器中
//客户端每次请求的时候,会自动将身份认证相关的 Cookie ,通过请求头的形式发送给服务端,服务端进行验证
```