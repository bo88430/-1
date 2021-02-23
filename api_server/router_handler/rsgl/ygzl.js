// 导入数据库操作模块 

const db = require('../../db/index')
// 获取员工资料
exports.ygzl = (req, res) => { 
    
    const sql = `select * from rsgl_ygzl`
   //调用 db.query() 执行 SQL 语句：
db.query(sql, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err)
  
    // 2. 执行 SQL 语句成功
    res.send({
      status: 0,
      message: '获取文章分类列表成功！',
      data: results,
    })
  })


}

//新增员工信息处理函数
exports.inygzl=(req,res)=>{

    const sql = `insert into rsgl_ygzl set ?`
    //调用 db.query() 执行新增文章分类的 SQL 语句：
  db.query(sql, req.body, (err, results) => {
    // SQL 语句执行失败
    if (err) return res.cc(err)
  
    // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
  
    // 新增文章分类成功
    res.cc('添加用户成功！', 0)
  })


}
//根据ID删除员工信息
exports.sygzl = (req, res) => {
    const sql = `delete from  rsgl_ygzl where id=?`
    //update是标记删除 这样删除更安全
  
    db.query(sql, req.params.id, (err, results) => {
      // 执行 SQL 语句失败
      if (err) return res.cc(err)
    
      // SQL 语句执行成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
    
      // 删除文章分类成功
      res.cc('删除文章分类成功！', 0)
    })
  
  }
  

//根据id获取员工信息
exports.hygzl=(req,res)=>{
    const sql = `select * from rsgl_ygzl where id=?`

  db.query(sql, req.params.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
  
    // SQL 语句执行成功，但是没有查询到任何数据
    if (results.length !== 1) return res.cc('获取文章分类数据失败！')
  
    // 把数据响应给客户端
    res.send({
      status: 0,
      message: '获取员工信息！',
      data: results[0],
    })
  })
}
//更新员工信息
exports.gygzl=(req,res)=>{
    const sql = `update rsgl_ygzl set ? where Id=?`
    db.query(sql, [req.body, req.body.id], (err, results) => {
      // 执行 SQL 语句失败
      if (err) return res.cc(err)
    
      // SQL 语句执行成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.cc('更新员工信息失败！')
    
      // 更新文章分类成功
      res.cc('更新员工信息成功！', 0)
    })
}