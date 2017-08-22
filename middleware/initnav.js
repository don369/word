const span = '<span class="glyphicon glyphicon-user" aria-hidden="true"> </span>';
const on_login = [
    navURL("搜索单词",'/word/new'),
    navURL("单词本",'/word'),
    navURL("记词",'/word/time'),
    navURL(span,[
        navURL( "修改密码", '/user/0'),
        navURL( "退出", '/user/quit')
    ])
]

const not_login = [
    navURL( "登录", '/user/login'),
    navURL( "注册", '/user/new')
]

module.exports = (req, res ,next) => {
        res.locals.nav = (req.session.user_id && req.session.user) ? on_login : not_login;
        if(req.session.user) res.locals.title = req.session.user + '的'
        next();
}


function navURL(text, url){
    return {text,url}
}