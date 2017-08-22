/**
 * 处理错误
 */
const err = module.exports = require('express').Router();

err.use((req, res, next)=>{
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
err.use((err, req, res, next)=>{
    console.log('errr');
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
});