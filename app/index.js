/**
 * 首页
 */
const router = require('express').Router();

module.exports = router;

router.use('/',(req, res)=>{
    res.render('index')
});

