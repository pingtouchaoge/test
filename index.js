const Koa = require('koa');
const views = require('koa-views');
const app = new Koa();
const { connect, initSchemas }  = require('./database/init');
const bofyParser = require('koa-bodyparser');
const router = require('./router/index');
const path = require('path');

const static = require('koa-static')
// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

app.use(bofyParser());



// 加载路由中间件
app.use(router.routes());
app.use(router.allowedMethods());

// 立即执行函数
;(async ()=>{
    await connect();
    initSchemas(); // 载入 schema 文件
})();

app.use(static(
    path.join( __dirname,  staticPath)
))

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}))

app.use(async (ctx)=>{
    // ctx.body = `<h1>Hello Koa2</h1>`
    await ctx.render('index')
});

app.listen(3000,()=>{
    console.log('[server] start at port 3000')
});
