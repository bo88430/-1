const express = require('express')
const router = express.Router()


const attendance=require('../router_handler/rsgl/rsgl')
//挂在路由attendance  考勤
router.get('/attendance',attendance.getAttendance)

module.exports =router