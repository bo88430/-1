// 导入 express 
const express = require('express') 
// 创建路由对象 
const router = express.Router() 
// 获取员工信息 

const ygzl=require('../router_handler/rsgl/ygzl')
//挂在路由attendance  考勤
router.get('/ygzl', ygzl.ygzl)

//新增员工信息
router.post('/inygzl',ygzl.inygzl)

//根据ID删除员工信息
router.get('/sygzl/:id',ygzl.sygzl)

//根据ID获取员工信息
router.get('/hygzl/:id',ygzl.hygzl)

//更新员工信息
router.post('/gygzl',ygzl.gygzl)
// 向外共享路由对象 
module.exports = router