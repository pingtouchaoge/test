const Router = require('koa-router');
const mongoose = require('mongoose');
let router = new Router;
const fs = require('fs');
router.get('/insertAllGoodsInfo',async (ctx)=>{
    // './newGoods.json' 相对路径，本文件会在index.js中引用。所以相对为路径'./newGoods.json'
    // 也可使用reslove() 绝对路径
    fs.readFile('./data_json/newGoods.json', 'utf-8',(err,data)=>{
        data = JSON.parse(data);
        let count = 0;
        const Goods = mongoose.model('Goods')
        data.map((item,index) => {
            let newGoods = new Goods(item);
            newGoods.save()
                .then(()=>{
                    count++;
                    console.log('成功',count)
                })
                .catch(err=>{
                    console.log(err)
                })
        })
    })
    ctx.body = '开始导入数据'
})
router.get('/insertAllCategory',async (ctx)=>{
    // './newGoods.json' 相对路径，本文件会在index.js中引用。所以相对为路径'./newGoods.json'
    // 也可使用reslove() 绝对路径
    fs.readFile('./data_json/category.json', 'utf-8',(err,data)=>{
        data = JSON.parse(data);
        let count = 0;
        const Category = mongoose.model('Category')
        data.RECORDS.map((item,index) => {
            let newCategory = new Category(item);
            newCategory.save()
                .then(()=>{
                    count++;
                    console.log('成功',count)
                })
                .catch(err=>{
                    console.log(err)
                })
        })
    })
    ctx.body = '开始导入数据'
});
router.get('/insertAllCategorySub',async (ctx)=>{
    // './newGoods.json' 相对路径，本文件会在index.js中引用。所以相对为路径'./newGoods.json'
    // 也可使用reslove() 绝对路径
    fs.readFile('./data_json/categorySub.json', 'utf-8',(err,data)=>{
        data = JSON.parse(data);
        let count = 0;
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((item,index) => {
            let newCategorySub = new CategorySub(item);
            newCategorySub.save()
                .then(()=>{
                    count++;
                    console.log('成功',count)
                })
                .catch(err=>{
                    console.log(err)
                })
        })
    })
    ctx.body = '开始导入数据'
})
router.post('/getDetailGoodsInfo',async (ctx)=>{
    let goodsId = ctx.request.body.goodsId;
    const Goods = mongoose.model('Goods')
    await Goods.findOne({ID: goodsId}).exec()
        .then(result => {
            ctx.body = {
                code: 200,
                message: result
            }
        })
        .catch(err=>{
            console.log(err);
            ctx.body = {
                code: 500,
                message: err
            }
        })
})




module.exports = router;
