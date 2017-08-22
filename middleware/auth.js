module.exports = (except)=>{
    return (req, res, next)=>{
        const path = req.path;
        if(!except.includes(path) && (!req.session.user_id || !req.session.user)){
            const err = new Error('没登录不能访问该链接')
            err.status = 404;
            next(err)
        }else{
            next()
        }
}
}