/**
 * 错误处理
 */

module.exports = app =>{

    app.use((req, res, next)=>{
        var err = new Error('Not Found');
        err.status = 404;
        res.app.emit('error', next, req, res);
    });

    app.on('error', (err, req, res)=>{
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: {}
        });
    });
}