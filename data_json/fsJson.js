const fs = require('fs');
// 读取文件
fs.readFile('./Goods.json','utf-8',function (err, data) {
    let newData = JSON.parse(data);
    let i =0;
    let pushData = [];
    newData.RECORDS.map((item,index)=>{
        if(item.IMAGE1!=null) {
            i++;
            pushData.push(item)
        }
    })
    console.log(i)


    // 写入文件
    fs.writeFile('./newGoods.json',JSON.stringify(pushData),function(err){
        if(err) console.log('写文件操作失败');
        else console.log('写文件操作成功');
    });
});


