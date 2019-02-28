# day01
## 0. 准备
    项目描述: 做什么/特点/功能模块/主要技术/开发方式
    技术选型: 分方向详细技术
    API接口: 理解/ 接口文档/对接口

## 1. 创建项目, 并运行
	create-react-app react-admin
	npm start

## 2. 对项目进行git版本控制
	创建本地仓库
	创建远程仓库
	将本地仓库推送到远程
	创建dev分支并推送到远程
	克隆远程分支, 并创建本地dev分支

## 3. 设计源码的基本目录, 实现App基本组件效果
	assets	
	api
	components
	pages
	App.js
	index.js

## 4. 引入antd, 实现按需打包和自定义主题
	下载antd和相关的工具包
	配置1: config-overrides.js
	配置2: package.json

## 5. 引入react-router-dom, 实现基本的一级路由
	<BrowserRouter>/<HashRouter>
	<Switch>
	<Route>
	login/admin

## 6. 登陆的基本静态界面
	<Form>
	<Form.Item>
	<Input>
	<Icon>
	<Button>

## 7. 登陆的表单验证和数据收集
	配置对象: 属性名是一些特定的名称的对象
	验证需求:
		用户名: 长度4-11位的字符串等
		密码: 长度在4-11位的字符串等
	包装Form组件: Form.create()(LoginForm)
		操作表单项(Field)数据
		对表达项数据进行实时验证
	form对象:
		this.props.form: 得到form对象
		getFieldDecorator(fieldName, options)(<Input/>): 包装Input组件
		resetFields('password'): 重置单个/所有输入框
	表单验证方式:
		纯声明式验证
		半编程式验证
		
# day02
## 1. server应用
    理解前后台分离
    启动应用
    使用postman测试接口

## 2. ajax请求函数模块
	内部封装axios
    函数的返回值为promise对象
    目标:
      1. 请求错误统一处理
      2. 异步返回的是data, 而不是response
    解决: 
      自定义promsie对象
      在catch回调中: 不调用reject(), 而是显示错误提示
      在then回调中:  resolve(res.data)
      
## 3. 封装接口请求函数模块
    对ajax模块进一步封装, 让发请求的调用代码更简洁
    函数返回的是promise对象
    根据接口文档定义接口请求函数
    
## 4. 代理
    1). 是什么?
       具有特定功能的中间程序
    2). 运行在哪?
       前台应用端，与我当前运行的代码是同一个服务器
       只能在开发时使用
    3). 作用?
        解决开发时的ajax请求跨域问题
    4). 原理?
        监视并拦截请求(3000)
        转发请求(5000)
    5). 配置代理
       在package.json中加上一个字段  "proxy": "目标服务器地址"
       将所有请求的地址，改为当前代理服务器地址(3000)
    6). 缺点
       只能在开发环境下使用 
       一旦项目上线遇到跨域问题，只能cors、jsonp等方式解决 
    
## 5. 搭建管理界面的整体结构
    LeftNav
    Header
    Footer
    多个切换显示的路由组件
        Home
        Category
        Product
        User
        Role
        Bar
        Line
        Pie

## 6. 左侧导航
    导航相关数据的配置
    根据导航配置动态渲染导航界面
        Menu/SubMenu/Item/Icon
        函数递归调用/map()

# day03
## 1. 保存用户信息
    1. 用户登陆成功时保存用户信息
    2. 保存在哪？ localStorage sessionStorage 浏览器本地离线存储技术
      localStorage 持久化存储  --> 静态资源（图片、js、css）
      sessionStorage 会话存储

## 2. 登陆验证
    1. 在admin组件中完成登陆验证
    2. 检查用户是否登陆，检查localStorage是否保存过用户信息
      登陆过 就能访问
      没登陆 就跳转到login页面
    3. 优化： 不每次读取localStorage的值，读取一次之后保存在内存中
      用户登陆时保证有内存记录
      用户刷新时保证有内存记录
      
## 3. Header
    1. 页面布局 Row Col
    2. 显示用户信息 memoryUtils
    3. 退出登陆
    4. 显示菜单导航
    5. 显示日期 dayjs
    6. 天气  天气接口 + jsonp
    