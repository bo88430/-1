﻿// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()
// 导入并注册用户路由模块



const joi = require('@hapi/joi')

// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())


app.use(express.urlencoded({ extended: false }))//配置表单解析数据的中间件

// 响应数据的中间件，需要在导入路由之前
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

// 导入配置文件 一定要在路由配置解析token中间件
const config = require('./config')

// 解析 token 的中间件
const expressJWT = require('express-jwt')

// 使用 .un  less({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
//path: [/^\/api\//] }排除api接口开头的中间件

//导入员工信息模块
const ygzl = require('./router/ygzl')
// 为文章分类的路由挂载统一的访问前缀 /my/article
app.use('/my', ygzl)

//导入考勤模块

const attendance = require('./router/attendance')
app.use('/my', attendance)

//导入路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// write your code here...

// 导入并使用用户信息路由模块
const userinfoRouter = require('./router/userinfo')
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my', userinfoRouter)

// 导入并使用文章分类路由模块
const artCateRouter = require('./router/artcate')
// 为文章分类的路由挂载统一的访问前缀 /my/article
app.use('/my/article', artCateRouter)



// 导入并使用文章路由模块
const articleRouter = require('./router/article')
// 为文章的路由挂载统一的访问前缀 /my/article
app.use('/my/article', articleRouter)


// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))

// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 未知错误
   // 捕获身份认证失败的错误
   if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')

   // 未知错误...
  return res.cc(err)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(8888, function () {
  console.log('api server running at http://127.0.0.1:8888')
})




