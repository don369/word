module.exports = (req, res, next)=>{
    if(req.flash){
        res.locals.noticeType = req.flash('noticeType');
        res.locals.notice = req.flash('notice');
    }
    next();
}