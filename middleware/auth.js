module.exports = (req, res, next)=>{
    if(!req.session.user_id || !req.session.user){
        const err = new Error('没登录不能访问该链接');
        err.status = 404;
        req.app.emit('error', err, req, res);
    }else{
        next()
    }
    
}
