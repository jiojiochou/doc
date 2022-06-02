## vue3

##### 1.setup组件注册

```ts
import Index from './view/Index.vue'
import { defineComponent } from 'vue'
export default defineComponent({
    //注册组件关键字
	components: {
		//组件名称
        //相当于 Idnex：Index
         Index
	},
    setup() {
        
    }
})
//or
export default {
    //注册组件关键字
	components: {
		//组件名称
        //相当于 Idnex：Index
         Index
	},
    setup() {
        
    }
}
```

##### 2.setup语法糖注册组件写法

```ts
<script setup>
    //import 引入组件即可，不需要注册
    import Index from './view/Index.vue'
</script>
```

##### 2.1setup语法糖props,emit（接收参数）写法

```ts
//defineProps()
//defineEmits()
let prop = defineProps()
let emit = defineEmits()
```

##### 3.props 组件通信：父传子,子接收用Props

```ts
//指定props值的类型，如：String，Boolean，Number

//可以写成配置项:
props: {
    name: {
        //传过来的参数的类型
    	type: String,
    	//传过来的参数的默认值
    	default: 'zs',
        //name 是 必要的,上面配置过 默认值 就不需要 required
        //required: true
    } or
    name: String
}
:fun = "function() {}"
父组件可以传任何数据(对象,数字,字符串,布尔,函数,数组), 子组件都可以接收
```

###### 3.1props  使用实例：

![image-20220321163914798](C:\Users\三岁大佬梦\AppData\Roaming\Typora\typora-user-images\image-20220321163914798.png)

![image-20220321163935299](C:\Users\三岁大佬梦\AppData\Roaming\Typora\typora-user-images\image-20220321163935299.png)



```ts
export default {
    props: {
        //指定传过来的类型
		str: String
    }
    //props:['str'],也行
	setup(props) {
        //使用箭头函数
        let tip = ()=> {
            console.log(props.str) // 'bobodi'
        },
        return {
			tip
        }
    }
}
```

##### 4.emit：子传父

示例：

![image-20220322232041654](C:\Users\三岁大佬梦\AppData\Roaming\Typora\typora-user-images\image-20220322232041654.png)

```ts
// @bbb 监听父组件的方法
//setnum 父组件的方法
```

![image-20220322232600149](C:\Users\三岁大佬梦\AppData\Roaming\Typora\typora-user-images\image-20220322232600149.png)

##### 5.provide、inject

示例：

![image-20220323220940759](C:\Users\三岁大佬梦\AppData\Roaming\Typora\typora-user-images\image-20220323220940759.png)

###### 按需引入后，但未使用注意小点：

![image-20220324104956449](C:\Users\三岁大佬梦\AppData\Roaming\Typora\typora-user-images\image-20220324104956449.png)

## 生命周期

##### 1.图片示例：

![image-20220323093016402](C:\Users\三岁大佬梦\AppData\Roaming\Typora\typora-user-images\image-20220323093016402.png)

```ts
//要按需引入
//你可以通过在生命周期钩子前面加上 “on” 来访问组件的生命周期钩子
```

## route参数的获取

##### 注意要点：

```ts
//按需引入
//动态路由，加上 路由配置项里面加上 props：true		就可以以 props['val']接收参数一样
```

图片示例：

![image-20220323093444197](C:\Users\三岁大佬梦\AppData\Roaming\Typora\typora-user-images\image-20220323093444197.png)

## 监听路由的变化

```ts
// 解决组件复用，生命周期等方法不调用问题。  监听新老路由的变化来解决
```

![image-20220327210730668](C:\Users\三岁大佬梦\AppData\Roaming\Typora\typora-user-images\image-20220327210730668.png)![image-20220327210929155](C:\Users\三岁大佬梦\AppData\Roaming\Typora\typora-user-images\image-20220327210929155.png)![image-20220327211015761](C:\Users\三岁大佬梦\AppData\Roaming\Typora\typora-user-images\image-20220327211015761.png)

## 给组件命名的用处

```ts
// 当使用keep-alive的时候，可搭配组件name进行缓存过滤
```

## 路由 router

Url 路径传参示例：

```tsx
<router-link to="/">首页</router-link> 
<router-link to="/user/bobodi">用户</router-link> // 路由名称 + / + 参数值
```

​	路由配置：

```tsx
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/home.vue')
  },
  {
    path: '/user/:id',  // ：+ 参数名
    name: 'user',
    component: () => import('../views/user.vue')
  }
]
```

​	暴露形式：

```tsx
//模板中
<template>
    <span>{{$route.params}}</span>
</template>
//script中
this.$route.params
```

​	图片示例：

![image-20220315093919179](C:\Users\三岁大佬梦\AppData\Roaming\Typora\typora-user-images\image-20220315093919179.png)

## 嵌套路由

```tsx
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: 'profile',
        component: UserProfile,
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 将被渲染到 User 的 <router-view> 内部
        path: 'posts',
        component: UserPosts,
      },
    ],
  },
]
```



## 编程式导航

```tsx
//通过$router示例上的方法，通过编写代码来实现
$router.push('/user') //会在history栈添加一个新纪录，用户可以返回到上一个Url
//它可以携带的参数为：字符串路径、描述地址的对象
```

​	$router.push实参示例：

```tsx
//字符串路径
$router.push('/user')
//描述地址的对象
$router.push({
    path: '/user',
    //params 不能和 path 一起使用，取而代之的是name: 'user'
    params?: {uname: '张三'},
    query?: {plan: '张三'},
})
```

​	$router.replace示例：

```tsx
//不会向history栈中添加新纪录
$router.push({path: '/home',replace: true})
//相当于
$router.replace({path: '/home'})
```

## 路由前进后退

```tsx
//相当于  window.history.go(n)
```

​	示例：

```tsx
//向前移动一条记录
$router.go(1) //与router.forward()相同
//返回一条记录
$router.go(-1) //与router.back()相同
```

## 命名路由

```tsx
//提供一个name属性
```

​	命名路由示例：

```tsx
const routes = [
    {
        path: '/home',
        name: 'home',
        component: Home
    }
]
```

​	要连接到一个命名的路由，可以向<router-link> to 属性传递一个对象：

```tsx
<router-link :to="{name: 'user',params: {uname: '张三'}}">
```



## 命名视图

```tsx
//有时候想同时展示多个视图，而不是嵌套展示，例如创建一个布局，有sidebar（侧导航）和main（主内容）两个视图，这时候命名视图就排上用场了
```

​	示例：

```tsx
//同个路由，多个视图就需要多个组件
//component配置 + s
<router-view class="view left-sidebar" name="LeftSidebar"></router-view>
<router-view class="view main-content"></router-view>
<router-view class="view right-sidebar" name="RightSidebar"></router-view>
const routes = [
    {
        path: '/',
        components: {
            //如果 router-view 没有设置名字，默认为default
            default: Home,
            //与 router-view 上的 `name` 属性匹配
            LeftSidebar,
            RightSidebar
        }
    }
]
```



## 路由重定向

​	示例：

```tsx
const routes = [
    {
        path: '/home',
        //重定向到 `/`
        redirect: '/'
    }
]
```



## 路由守卫

##### 1.全局前置守卫

```tsx
const router = createRouter({.....})
router.beforEach(to,from) => {
    //.....
    //返回 false 取消导航
    return false
}
```

```tsx
//to参数，from，next参数功能
//to: 即将要进入的目标
//from: 当前导航正要离开的路由
//next: 
```

##### 2.路由独享的守卫

```js
//直接在路由配置上定义
//只在进入路由时触发，不会在params、query、hash改变时触发
//只会 从一个不同的路由导航时，才会被触发
const routes = [
    {
        path: '/home',
        component: Home,
        beforEnter: (to,from,next) => {
            //......
        }
    }
]
```

##### 3.组件内的守卫

​	可用的API示例： 

```js
//beforeRouteEnter(to,from)
//beforeRouteUpdate(to,from)
//beforeRouteLeave(to,from)
```

​	使用示例：

```js
const User = {
    template: `......`,
    beforeRouteEnter(to,from,next){
		//渲染该组件的对应路由被验证前调用
        //不能获得组件实例 `this`
        //守卫执行时，组件实例还没有被创建
        //唯一支持回调的路由，可用于访问实例
        next(el => {
            //通过 `el` 访问组件实例
        })
    },
    beforeRouteUpdate(to,from){
        //当前路由改变，组件复用时调用(在同一个组件下)
        //组件已经挂载，可以访问组件实例`this`
    },
    //离开守卫
    //通常用来预防用户在还未保存修改前突然离开。可以return false来取消。
    beforeRouteLeave(to,from){
        //离开了 渲染该组件的对应路由时调用
        //可以访问this
    }
}
```

```ts
//需要写在 
defineComponent({
	beforeRouteEnter(to,from,next){
        //.....
    },
    setup(){}
})
```



## 路由元信息

```js
//可以在路由地址和导航守卫上访问到
```

##### 	用法示例：

```js
const routes = [
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: '/list',
                component: List,
                meta: {
                    //要求权限
                    requiresAuth: true
                }
            },
            {
                path: '/mine',
                component: Mine,
                meta: {
                    //不要求权限
                    requiresAuth: false
                }
            }
        ]
    }
]
```

## 动态路由

```js
//动态路由的方法：router.addRoute()、router.removeRoute()
```



## 监听

```js
data() {
    return {
        ishot: true
        number: {
        	a: 1,
        	b: 2
    	}
    }
}

watch: {
    // xxxx监听的变量
    'ishot' 可以这样写,对象的 key 就是字符串
    ishot: {
        //初始进入就监听,初始就让 handler 调用
        immediate: true,
        //handler 什么时候调用 , 当xxxx发生改变时
        handler(newVal,oldVal) {
            log('data 中的 ishot发什么改变',newVal,oldVal)
        },
        //深度监听,一般用来监听 {} []类型的
        deep: true
    },
    //怎么监听 number 中的 a
    'number.a': {
        handler() {
            log('number 中的 a 发生改变')
        }
    }
    //只想监听
    ishot() {
        log()
    }
}
```

## 计算属性

```vue
计算属性将基于它们的响应依赖关系缓存和求值,只有相关的响应式依赖发生改变时重新求值,效率高

他用到了什么变量,根据这个变量的值改变而再次求值
用到的变量没有发生改变,立刻之前的计算结果,不会再运行函数
```

```ts
<p>{{ 随便起的名 }}<p>

computed: {
	//计算属性的 getter,默认只有getter
    随便起的名() {
        return this.arr.length > 0 ? "yes" : "no"
    }
}
//配置写法
computed: {
    fullName: {
        //计算属性的 getter,默认只有getter
        get() {
            return this.firstName + "$" + this.lastName
        }
         //计算属性的 setter
        set(newValue) {
            const names = newValue.split(' ')
            this.firstName = names[0]
            this.lastName = names[names.length - 1]
        }
    }
}

methods: {
    方法名() {
        return this.arr.length > 0 ? "yes" : "no"
    }
}
```

## 自定义指令:

```ts
directives: {
    //big 函数何时会被调用? 1.指令与元素成功绑定时(一上来).2.指令所在的模板被重新解析
    big(element,binding){
        element.innerText = binding.value * 10
    }
    fbind: {
        //指令与元素成功绑定时(一上来)
        bind(){
            log('bind')
        },
        //指令所在元素被插入页面时
        inserted(){
            log('inserted')
        },
        //指令所在的模板被重新解析时
        update(){
            log('update')
        }
    }
}
```

## 自定义事件

```ts
<List @handleClick="handleClick"></List>
//  组件可以是用原生的 事件  例: click.navtion 即可
内置事件 click keyup.enter mounsemove 都是内置事件. 都是给Dom元素用的

自定义事件 例: handleClick,handleBtnClick 给组件的自定义事件,绑定在组件实例身上(不是Dom身上)

访问组件实例: this.$refs.自定义的名字,可以在组件实例身上 通过 this.$refs.自定义的名字.$on('自定义事件',回调)  $once一次性事件 $off('' or ['',''])卸载事件
组件内部可以通过 this.$emit('自定义事件的名字',可以传值),触发自定义事件
```

```vue
通过自定义属性 进行 通信 (父子),把方法传给子组件, 子组件内部调用即可
<template :getNameFunc="getNameFunc"></template>   子组件内部: getNameFunc()
通过 @ + 自定义事件名字 给组件实例绑定自定义事件, 组件实例通过 $emit 触发身上的事件
<template @getNameFunc="getNameFunc"></template>
通过 $on 绑定事件, $off 卸载事件 组件实例通过 $emit 触发绑定的事件
<template ref="component"></template>
this.$refs.component.$on('getNameFunc',this.getNameFunc)
```

## slot

```ts
1.默认插槽
2.具名插槽
<slot :data="data"><slot>
3.作用域插槽(scope = "data",slot-scope="data" v-slot:default="data")
```

## v-model

```ts
v-model.number
```



## $nextTick()

```ts
methods: {
    tip() {
        // 改变data() {} 中的 loading Dom更新(这里不会立更新,等函数走完)
        loading: true,
        //
        this.$refs.xxxx.focus()
    }
}
```

## 上传文件

```js
<input type="file" style="display: none;" @change="change">
    
<!-- for 循环数组，数组如果是零的话就不循环，obj的话会报错 -->
<img :src="el" alt="" v-for="el in list" style="width: 50px;height: 50px;border: 1px solid brown;">
    
    
change(e){
      // e是element       e.target.files 是上传文件的所在位置
    console.log(e.target.files);
    let path = URL.createObjectURL(e.target.files[0]);//临时地址
    this.list.push(path);
}
```



## 三种暴露

##### 1.分别暴露

```ts
export obj {
    name: string
    age: number
}

export obj1 {
    name: string
    age: number
}
```

##### 2.默认暴露

```ts
export default {
    data() {
        return {}
    },
    methods: {}
}
```



## el-table拖拽

```ts
/* npm install sortablejs --save */
/* import Sortable from "sortablejs" */


rowDrop() {
    const tbody = this.$refs.dragTable.$el.querySelector('.el-table__body > tbody')
    const _this = this
    Sortable.create(tbody, {
      ghostClass: 'sortable-ghost',
      draggable: '.el-table__row',
      onEnd: async function ({ oldIndex, newIndex }) {
        const current = _this.tableData.splice(oldIndex, 1)[0]
        newIndex > 0 ? _this.tableData.splice(newIndex, 0, current) : _this.tableData.unshift(current)
        _this.guid = common.newGuid()
        await _this.$nextTick()
        _this.rowDrop()
        _this.handleSave()
      }
    })
  }
```