const { myusers, mongoose } = require('./app/models');
myuser.findOne({name: 'admin'}, (err, rs)=>{
    try{
        if(!rs) (new myusers({
            name: 'admin',
            password: '21232f297a57a5a743894a0e4a801fc3'
        })).save();
    }catch(err){
        console.error(err);
    }finally{
        mongoose.disconnect();
    }
})

