const mysql = require('mysql'); //导入mysql 模块
// 导入处理时间的模块
const moment = require('moment');
const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "node",
    //开启查询多条sql的功能
    multipleStatements: true

})
module.exports = con;