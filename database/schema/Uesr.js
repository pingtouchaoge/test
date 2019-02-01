const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ObjectId = Schema.Types.ObjectId; // 原生主键
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10;// 加盐强度

// 创建UserSchema   定义数据的骨架模式
const userSchema = new Schema({
    // UserId: {type: ObjectId} // 全称,
    UserId: ObjectId,
    // unique 唯一；
    userName: {unique: true, type: String},
    password: String,
    createAt: {type: Date, default: Date.now()},
    lastLogin: {type: Date, default: Date.now()},
}, {
    // mongoDB会默认将此文件对应的表变成Users，默认加个s
    collection: 'user'   // 取消默认，自定义名字
});

userSchema.pre('save', function (next) {
    // 加盐
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt) => {
        if(err) return next(err);
        bcrypt.hash(this.password,salt,(err,hash) => {
            if(err) return next(err);
            this.password = hash
            next()
        })
    })
})

userSchema.methods = {
    comparePassword(_password, password) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, password,(err,isMatch) => {
                if(!err) resolve(isMatch);
                else reject(err)
            })
        })
    }
}

// 发布模型
mongoose.model('User',userSchema); // 'User' 对应数据表中表的名字一模一样；
