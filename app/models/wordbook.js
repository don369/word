/**
 * 数据库的设计
 * invitations：存储单词的词库
 * invitations： 注册时用的邀请码表
 * words:存储个人单词的单词本
 * myusers:用户
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(require('../../config.js').db_connect);
mongoose.connection.on('error',console.error.bind(console, 'connection error: '))
                   .once('open',()=>{
                       console.log()
                       console.log('database open !')
                   })


const lexiconSchema = new Schema({
    name:String,
    UK:String,
    UKMP3:String,
    US:String,
    USMP3:String,
    interpetation: String
});

const invitationSchema = new Schema({
    code:{ type: String, index: { unique: true } }
});

const userSchema = new Schema({
    name:{type: String, index:{unique:true}},
    password:String,

});

const wordSchema = new Schema({
    extension:String,
    date:String,
    learnNumber:Number,
    word:String,
    userId:{
        type: mongoose.Schema.ObjectId,
        ref:'myusers'
    }
})

module.exports = {

    invitations : mongoose.model('invitations',invitationSchema),
    lexicons : mongoose.model('lexicons', lexiconSchema),
    myusers : mongoose.model('myusers', userSchema),
    words : mongoose.model('words', wordSchema),
    mongoose: mongoose
}