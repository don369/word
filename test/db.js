const myuser = require('../app/models/wordbook.js').myusers
//const db = new myuser({name:'admin', password:'21232f297a57a5a743894a0e4a801fc3'})
console.log(myuser.find({name:'admin'}).exec())