const db = require('./app/models/wordbook.js').myusers;
const user = new db({
    name: 'admin',
    password: require('./util/md5.js')('admin')
})