const moment = require('moment');

const con = require('../db/db.js');
const showregister = (req, res) => {
    res.render('./user/register.ejs', {})
}
const showlogin = (req, res) => {
    res.render('./user/login.ejs', {})
}
const reg = (req, res) => {
    let body = req.body
        // 验证表单数据是否符合规则
    if (body.username.trim().length <= 0 || body.password.trim().length <= 0 || body.nickname.trim().length <= 0) {
        return res.send({ msg: '请填写完整的数据', status: 501 })
    }

    // 查询用户名是否重复
    let sql1 = 'select count(*) as count from blog_user where username=?'
    con.query(sql1, body.username, (err, result) => {
        if (err) return res.send({ msg: '查重操作失败', status: 502 })
        if (result[0].count !== 0) return res.send({ msg: 'sorry，用户名重复了', status: 503 })

        // 执行注册的业务逻辑
        body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        let sql2 = 'insert into blog_user set ?'
        con.query(sql2, body, (err, result) => {
            if (err) return res.send({ msg: '注册操作失败！', status: 504 })
            if (result.affectedRows !== 1) return res.send({ msg: '注册功能失败！', status: 505 })
            res.send({ msg: '恭喜亲，注册用户名成功！', status: 200 })
        })
    })
}
const login = (req, res) => {
    const body = req.body;
    let sql = 'select * from blog_user where username= ? and password=?';
    con.query(sql, [body.username, body.password], (err, result) => {
        if (err) return res.send({ status: 500, msg: '登录失败' })
        if (result.length !== 1) return res.send({ status: 501, msg: '操作失败' })
            // 把成功之后的用户信息，挂载到 session 上
            // 把用户登录成功的用户信息，也挂载到 session 上 result
        req.session.user = result[0]
        req.session.islogin = true
        res.send({ status: 200, msg: '登录成功' })
    })
}
const layout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login'); //使用res.redirect方法可以定向访问指定的页面
    })
}
module.exports = {
    showregister,
    showlogin,
    reg,
    login,
    layout
}