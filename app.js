const express = require('express');
const fs = require('fs'); //导入读取文件模块
const path = require('path');
// 导入session 模块
const session = require('express-session')
const app = express(); //创建服务器
// 注册session中间件，只要能访问req，必然能访问 req.session 
app.use(session({
        secret: '这是加密的密钥',
        resave: false,
        saveUninitialized: false
    }))
    //注册中间件获取post表单的数据
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/node_modules', express.static('./node_modules')); //托管静态目录
app.engine('html', require('express-art-template'));
app.set(' view engine', 'html'); //定义模板引擎的名称
app.set('views', './views'); //定义渲染模板的目录

// app.use(require('./router/user')); //导入并注册user路由模块
// app.use(require('./router/index')); //导入并注册index路由模块
//使用循环的方式进行路由的自动注册
fs.readdir(path.join(__dirname, './router'), (err, filesname) => {
    if (err) return console.log('读取文件失败');
    filesname.forEach(fname => { //循环router目录下面的每一个文件，每循环一次就拼接成一个完整的路由模块路径
        app.use(require(path.join(__dirname, './router', fname)))
    })

})
app.listen(5001, () => {
    console.log('server running at http://127.0.0.1:5001')
})