
const { myusers, mongoose } = require('./app/models');
new myusers({
    name: 'admin',
    password: require('./util/md5.js')('admin')
})

mongoose.disconnect();