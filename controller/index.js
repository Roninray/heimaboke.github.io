const con = require('../db/db.js')

//渲染文章列表
const showIndex = (req, res) => {
    // 每页显示3条数据
    // console.log(req.session)
    const pagesize = 6;
    const nowpage = Number(req.query.page) || 1; //当前选中页
    // ！！！注意这里的语法，是 `` 拼接的字符串能识别 ${pagesize} 这样的，不然就得进行字符串拼接
    const sql = `SELECT blog.id, blog.title, blog.ctime, blog_user.nickname FROM blog LEFT JOIN blog_user ON blog.authorId = blog_user.id ORDER BY blog.id DESC limit ${(nowpage - 1) * pagesize}, ${pagesize}; SELECT count(*) as count FROM blog`

    con.query(sql, (err, result) => {
        if (err) {
            res.render('index.html', {
                user: req.session.user,
                isLogin: req.session.isLogin,
                article: []
            })
        }
        //总页码
        const totalPage = Math.ceil((result[1][0].count) / pagesize);
        // console.log(totalPage);
        res.render('index.html', {
            user: req.session.user,
            isLogin: req.session.isLogin,
            article: result[0],
            totalPage: totalPage,
            nowpage: nowpage
        })
    })
}

module.exports = {
    showIndex
}