const Router = require('koa-router');

// 引入模块路由
let user = require('../appApi/user');
let home = require('../appApi/home');
let goods = require('../appApi/goods');

// 装载子模块路由
let router = new Router();
router.use('/api/user', user.routes());
router.use('/api/home', home.routes());
router.use('/api/goods', goods.routes());


module.exports = router
