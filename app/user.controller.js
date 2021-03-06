const user = module.exports = require('express').Router();
const md5 = require('../util/md5.js');
const csurf = require('csurf')({ cookie: true });

user.use(csurf);

user.route('/login').get(login_get).post(login_post);

user.route('/new').get(new_get).post(new_post);

user.get('/quit',(req, res)=>{ req.session.destroy(); res.redirect('/');})


function login_get(req, res){
    res.render('user/login',{ csrfToken: req.csrfToken() })
}

function login_post(req, res, next){
    let password = md5(req.body.password);
    let name = req.body.user;
    req.myusers.findOne({name, password},(err, rs)=>{
        let redirect_path = '/'
        if(err) return next(next)
        if(rs){
            req.session.user = rs.name;
            req.session.user_id = rs._id;
        }else{
            req.flash('noticeType', 'error');
            req.flash('notice', '登录失败！密码或用户名有误')
            redirect_path = 'login'
        }
        res.redirect(redirect_path)
    });
}

function new_get(req, res){
    res.render('user/new',{ csrfToken: req.csrfToken() });
}

async function new_post(req, res, next){
    let name = req.body.name;
    let password = md5(req.body.password);
    let password1 = md5(req.body.password1);
    let code = md5(req.body.code);
    
    let rs = await req.invitations.findOne({code}).catch( err =>{
        req.app.emit('error', err, req, res);
    });
    if(rs){
        if(password === password1){
            let myuser = new req.myusers({name, password});
            await myuser.save().then( rs=>{
                req.session.user_id = rs._id;
                req.session.user = rs.name;
                req.flash('noticeType', 'ok');
                req.flash('notice', '注册成功');
                req.invitations.remove({code});
            }).catch( err=>{
                req.flash('noticeType', 'error');
                req.flash('notice', '用户名被占用');
            });
        }else{
            req.flash('noticeType', 'error');
            req.flash('notice', '密码和确认密码不一致');
        }
    }else{
        req.flash('noticeType', 'error');
        req.flash('notice', '邀请码错误');
    }

    res.redirect('new');
}

/*
//对比
function new_post(req, res, next){
    let name = req.body.name
    let password = md5(req.body.password)
    let password1 = md5(req.body.password1)
    let code = md5(req.body.code)
    req.invitations.findOne({code}, (err, rs)=>{
        if(err) return next(err);
        if(rs){
            if(password == password1){
                let myuser = new req.myusers({name, password})
                myuser.save((err, rs)=>{
                    if(err){
                        req.flash('noticeType', 'error');
                        req.flash('notice', '用户名被占用');
                    }else{
                        req.session.user_id = rs._id;
                        req.session.user = rs.name;
                        req.flash('noticeType', 'ok');
                        req.flash('notice', '注册成功');
                        req.invitations.remove({code});
                    }
                    return res.redirect('new');
                });
            }else{
                req.flash('noticeType', 'error');
                req.flash('notice', '密码和确认密码不一致');
            }
        }else{
            req.flash('noticeType', 'error');
            req.flash('notice', '邀请码错误');
        }
        res.redirect('new');
    })

}
*/