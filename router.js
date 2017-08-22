
module.exports = (app) =>{
    app.use('/$',require('./app/index'));
    app.use('/words',require('./app/words.js'))
    app.use('/user',require('./app/user.js'))
    app.use('/invitations', require('./app/invitations.js'))
    app.use(require('./app/error.js'))
}