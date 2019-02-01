const mongoose = require('mongoose');
const db = 'mongodb://localhost/smile-vue';  //、数据库的路径

const glob = require('glob'); // 读取相关规则的文件
const { resolve } = require('path');

exports.initSchemas = () => {
    // sync 同步
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
};


exports.connect = () => {
    // 连接数据库
    mongoose.connect(db);
    let maxConnectTimes = 0; // 最大尝试连接次数

    //
    return new Promise((resolve, reject) => {
        // 增加数据库监听事件-断开连接
        mongoose.connection.on('disconnected',()=>{
            console.log('---------------数据库断开---------------');
            // 连接数据库
            if( maxConnectTimes <= 3 ) {
                // 尝试重连
                maxConnectTimes++;
                mongoose.connect(db);
            }else {
                reject();
                throw new Error('数据库出现问题，程序无法搞定，请人为修理')
            }
        });
        // 增加数据库监听事件-出错
        mongoose.connection.on('error',()=>{
            console.log('---------------数据库出错---------------');
            // 连接数据库
            if( maxConnectTimes <= 3 ){
                // 尝试重连
                maxConnectTimes++;
                mongoose.connect(db);
            }else {
                reject();
                throw new Error('数据库出现问题，程序无法搞定，请人为修理')
            }
        });
        // 连接打开时
        mongoose.connection.on('open',()=>{
            console.log('---------------数据库连接成功---------------');
            resolve();
        });
    })
}
