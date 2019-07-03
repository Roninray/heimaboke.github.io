const express = require('express');
const router = express.Router();

const crl = require('../controller/user')
router.get('/register', crl.showregister)
router.get('/login', crl.showlogin)
    // 监听前端registe的post注册请求
router.post('/register', crl.reg)
    //监听前端login的post登录请求
router.post('/login', crl.login)
    //监听layout定向跳转
router.get('/layout', crl.layout)
module.exports = router;