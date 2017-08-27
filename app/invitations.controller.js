/**
 * 资源/invitation
 * 
 */

const invitation = module.exports = require('express').Router();
const csrf = require('csurf');
const crypto = require('crypto');
const auth = require('../middleware/auth.js');

const csrfProtection = csrf({ cookie: true });

invitation.use(csrfProtection);
invitation.use(auth);
invitation.get(/^\/(index)?$/, (req, res)=>{
    res.send('invitation', { csrfToken: req.csrfToken() });
})

invitation.get('/new', (req, res)=>{
    res.render('invitation',{ csrfToken: req.csrfToken() })
})
invitation.post('/create', (req, res)=>{
    let code;
    if(req.body.code){
        code = crypto.createHash('md5').update(req.body.code).digest('hex');
        let db = new req.invitations({code: code});
        db.save((err)=>{
            if(!err){
                req.flash('noticeType','ok');
                req.flash('notice', '添加成功！');
            }else{
                req.flash('noticeType','error');
                req.flash('notice', '添加失败！')
            }
            res.redirect('/invitations/new');
        });
    }
})