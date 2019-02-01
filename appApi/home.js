const Router = require('koa-router');
let router = new Router;

router.get('/', async (ctx) => {
    ctx.body = '/ home首页'
});
router.get('/register', async (ctx) => {
    ctx.body = '/ home注册接口'
});

module.exports = router
