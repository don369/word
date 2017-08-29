/**
 * 首页
 */
const router = require('express').Router();

module.exports = router;

router.use('/', (req, res) => {
    req.dailyWord.getWord().then(word => {
        res.render('index', { dailyWord: word })
    }).catch(err=>{
        res.render('index')
    })
});

