# Vue-vote —— 在线投票系统 (side project)

[![Build Status](https://travis-ci.org/Raoul1996/vue-vote.svg?branch=master)](https://travis-ci.org/Raoul1996/vue-vote)
[![Maintainability](https://api.codeclimate.com/v1/badges/b68da294651f58e8d2f7/maintainability)](https://codeclimate.com/github/Raoul1996/vue-vote/maintainability)
[![bitHound Overall Score](https://www.bithound.io/github/Raoul1996/vue-vote/badges/score.svg)](https://www.bithound.io/github/Raoul1996/vue-vote)
[![bitHound Dependencies](https://www.bithound.io/github/Raoul1996/vue-vote/badges/dependencies.svg)](https://www.bithound.io/github/Raoul1996/vue-vote/a606c4cfb7944fe7edce9ff1d05474fc3986b640/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/Raoul1996/vue-vote/badges/devDependencies.svg)](https://www.bithound.io/github/Raoul1996/vue-vote/a606c4cfb7944fe7edce9ff1d05474fc3986b640/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/Raoul1996/vue-vote/badges/code.svg)](https://www.bithound.io/github/Raoul1996/vue-vote)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b68da294651f58e8d2f7/test_coverage)](https://codeclimate.com/github/Raoul1996/vue-vote/test_coverage)

> 使用 Vue 重构了 Vote 项目，实践各种东西

## 文件结构
```
.
├── App.vue
├── assets
│   └── logo.png
├── components
│   ├── Card.vue
│   ├── HelloWorld.vue
│   ├── layout.vue
│   ├── loginStatus.vue
│   ├── nav.vue
│   └── verify.vue
├── config
│   ├── api.js
│   ├── codeMap.js
│   ├── env.js
│   ├── localStorage.js
│   └── rem.js
├── main.js
├── pages
│   ├── 404.vue
│   ├── Hello.vue
│   ├── create.vue
│   ├── detail.vue
│   ├── forget.vue
│   ├── login.vue
│   ├── profile.vue
│   ├── register.vue
│   ├── update.vue
│   └── vote.vue
├── router
│   └── index.js
├── service
│   └── axios.js
├── store
│   ├── actions.js
│   ├── getters.js
│   ├── index.js
│   ├── mutation-types.js
│   └── mutations.js
└── utils.js

7 directories, 32 files

```
## 技术栈

1. Vue
2. Vuex
3. pug
4. element-ui
5. axios
6. Promise

## 存在问题

- ~~20171217：由于使用了状态树持久化，诞生出一个新的问题：在需要密码才能投票的页面进行刷新，会提示需要输入密码，但是组件的数据还存在。需要想办法解决：~~
  - ~~思路1：在刷新的时候不重新拉取数据，不进行 v-if 判断，直接使用原来页面的数据~~
  - ~~思路2：对 detail 中的数据不进行持久化，但是会增大开销~~

## 学习 && 改进
-  [vue项目中对axios的二次封装](https://juejin.im/post/5a293e50f265da432153f190)
- [为什么我们要做三份 Webpack 配置文件](https://zhuanlan.zhihu.com/p/29161762),生产环境下移除 console.log
## 实现了些什么？

- 使用 pug 模板简化代码（练习jade）[html2pug](http://html2jade.vida.io/)
- 使用 element-ui 进行快速开发
- 使用 Travis CI 进行自动化编译、打包、以及部署到服务器
- 使用 codeclimate 进行代码检查，使用 bitHound 进行代码检查，依赖检查
- [用自己的后台](https://github.com/Raoul1996/koa-vote)，吼吼
- 二次封装 axios，实现错误的集中处理
- 使用 CDN 引入 vue.min
- 使用 `vuex` 进行状态集中管理，请求集中管理
- 实现状态持久化
- 开发环境下移除 console.log，console.info

## 将会实现些什么？

1. 自己写组件
2. 完成投票查询模块
3. 个人信息维护
4. 个人投票维护
5. 分享功能
6. 邮箱自动补全功能，这个查了一晚上，并没有找到什么好的解决方案

### 20171206(学习朋友的方法，时刻总结) 打包分析插件
- 安装开发环境下的 webpack 分析插件：`BundleAnalyzerPlugin`,可以在开发环境的 [8888](http://localhost:8888) 端口实时查看webpack构建情况

### 20171210 Vue-dev-tools 不能启动

- 使用 CDN 引入 Vue 的时候会导致 vue-dev-tools 无法使用,参见[这个 issue](https://github.com/vuejs/vue-devtools/issues/190)

### 20171213 数据持久化

- 状态已经成功集中管理，但是有一个问题就是：**状态的持久化**，这个就比较恶心了。状态集中管理的好处就是可以不必费力进行组件间的传值，但是在 vuex 中存储的数据会在刷新之后丢失。
使用 vuex-persist 这个包做数据持久化可以避免每次 mutation data 时候手动存入 localStorage，读取数据的时候再从 localStorage 中读取的麻烦

### 20171217 过早优化是万恶之源

- 因为今天用 babel-transform-remove-console 插件去掉了 console.log 和 info，所以导致今天很纠结为什么 console.log 没用。过早优化真的是万恶之源。
- 在 detail 组件是所有组件共用的组件，所以在 detail 组件销毁的时候将状态销毁。使用 beforeDestroy 生命周期钩子，在销毁之前将 detail.options 清空

### 20171217 组件刷新不触发生命周期钩子函数导致的 bug

1.  在昨天晚上发现的 bug 中，由于控制密码框渲染的状态是由组件内部控制的，所以在 vuex 状态树持久化之后就会出现问题：刷新的时候组件内部的状态已经没有了，但是已经放置到 vuex 状态树种的数据并不会因为刷新而消失。
  - 解决办法： 把控制组件渲染的状态同样放到 vuex 的状态树中，在组件被销毁的时候将 detail 的状态清空，防止造成其他副作用。
2. 但是这样又会出现一个问题，就是由于 detail 中的状态分了两部分： vote 和 problem。vote 是从列表中通过props继承到了vote-item 的组件中，然后再放到 vuex 的状态树中，这就导致了如果用户更改 param 进入对应的投票就会出错。
  - 解决办法： 在 detail 组件中维护一个私有的状态 ：returnList，如果vote为空，那么就提示用户进入 vote-list 界面。后期可能会考虑出一个单独的接口，根据 vote-id 获取状态。

### 20171218 使用 v-if 值得注意的一个小点

- 在使用 v-if 的时候有根据上一个选择框的状态来决定其他选项渲染状态的要求，会涉及到下面一个比较细节的小点—— JavaScript 中的强制类型转换：

```
!! {} === true
!! Symbol() === true
!! 0 === false
!! "0" === true
!! [] === true
!! "" === false
!! null === false
!! undefined === false // 当然没有给 undefined 赋其他值
!! true === true
```
### 20171224 登录图片验证码坑多
- 祝自己平安夜快乐，没有女盆友只能自己和代码瞎几把过。没有女朋友的过圣诞节，有女朋友的就可以过 shengdan 节了。
- 验证码的刷新问题：点击的时候，可以通过改动 img 的src 属性的值进行触发。我选择了把当前时间作为 queryString 加到地址上来触发验证码的刷新
- 返回的验证码的 response.type 定义成了 image/png，所以不可以按照其他请求的方式进行集中处理，而且状态树中没有必要也不应该去保存验证码图片。
- 可以使用 position 结合 padding 来实现左右布局。在el-input组件的label会受到 flex 的影响，比较麻烦。注意在 wrapper 容器中进行一下相对定位，防止排版错乱（有方法避免）
