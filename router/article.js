const express = require('express');
const router = express.Router();
const str = require('../controller/article.js');
// 监听客户端的 get 请求地址，显示 文章添加页面
router.get('/article/add.html', str.showAdd);
//监听前端post 请求
router.post('/article/add', str.addArticle);
//监听详情展示页的请求;
router.get('/article/info/:id', str.showArticleDetail);

// 监听客户端 请求文章编辑页面
router.get('/article/edit/:id', str.showEditPage)

// 监听用户编辑文章
router.post('/article/edit', str.editArticle)
module.exports = router;