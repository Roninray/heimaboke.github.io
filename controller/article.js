const moment = require('moment');
const con = require('../db/db.js');
const marked = require('marked');
// 展示页
const showAdd = (req, res) => { //展示页的回调函数
        res.render('./article/add.html', {
            user: req.session.user,
            islogin: req.session.islogin
        })
    }
    //添加页
const addArticle = (req, res) => { //添加详情页的回调函数
        const body = req.body
            // 最好不要在服务器端获取作者的id，如果作者编写了很长的时间，session会失效
            // body.authorId = req.session.user.id
        body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        let sql = 'insert into blog set ?'
        con.query(sql, body, (err, result) => {
            if (err) return res.send({ msg: '发表文章失败', status: 500 })
            if (result.affectedRows !== 1) res.send({ msg: '发表文章失败', status: 501 })
            res.send({ msg: '发表文章成功', status: 200, insertId: result.insertId })
        })
    }
    //详情页
const showArticleDetail = (req, res) => {
        // 获取文章id
        const id = req.params.id
            // 根据id查询文章信息
        const sql = 'select * from blog where id = ?'
        con.query(sql, id, (err, result) => {
            // console.log(result);
            if (err) return res.send({ msg: '获取文章详情失败', status: 500 })
            if (result.length !== 1) return res.redirect('/')

            // 在调用之前，要先把 markdown 文本转为 html文本
            result[0].content = marked(result[0].content)

            res.render('./article/info.html', {
                user: req.session.user,
                islogin: req.session.islogin,
                article: result[0]
            })
        })
    }
    // 显示编辑页面
const showEditPage = (req, res) => {
        // 如果用户没有登录则不允许查看文章编辑页面,重定向到首页/
        if (!req.session.islogin) return res.redirect('/')
        const sql = 'select * from blog where id=?'
        con.query(sql, req.params.id, (err, result) => {
            if (err) return res.redirect('/')
            if (result.length !== 1) return res.redirect('/')
                // 渲染详情页
            res.render('./article/edit.html', {
                user: req.session.user,
                islogin: req.session.islogin,
                article: result[0]
            })
        })
    }
    // 编辑功能
const editArticle = (req, res) => {
    let sql = 'update blog set ? where id = ?'
        // console.log(req.body);
    console.log(req.body.id);
    con.query(sql, [req.body, req.body.id], (err, result) => {
        // console.log(result);
        if (err) return res.send({ msg: '编辑文章失败', status: 501 })
        if (result.affectedRows !== 1) return res.send({ msg: '编辑文章失败', status: 502 })

        res.send({ msg: 'ok', status: 200 })
    })
}


module.exports = {
    showAdd,
    addArticle,
    showArticleDetail,
    showEditPage,
    editArticle
}