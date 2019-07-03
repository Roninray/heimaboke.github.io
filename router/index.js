const express = require('express');
const router = express.Router();
const str = require('../controller/index.js');

router.get('/', str.showIndex);

module.exports = router;