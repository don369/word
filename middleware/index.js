const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const mongoStore = require('connect-mongo')(session);
const { mongoose, middleware } = require('../app/models');

const nav = require('./initnav.js');
const notice = require('./notice.js');

module.exports = (app) => {

    app.use(logger('dev'));

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(middleware);

    app.set('trust proxy', 1);
    app.use(cookieParser());
    app.use(session({
        //设置密钥
        secret: 'c47d187067c6cf953245f128b5fde62a',
        //是否允许session重新设置，要保证session有操作的时候必须设置这个属性为true
        resave: false,
        //
        cookie: { maxAge: 600000 },//如果将secure: true 则必须在https下cookie才会起作用
        saveUninitialized: true,
        store: new mongoStore({ mongooseConnection: mongoose.connection })
    }));
    app.use(flash());
    app.use(notice);

    app.use(nav);


}