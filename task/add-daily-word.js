/**
 * 定时任务，凌晨更新每日一词，误差59分59秒；
 */
const { lexicons, dailyWord } = require('../app/models');
let _dailyWord = {};

setInterval(() => {
    if (new Date().getHours() == 0) {
        lexicons.randomFindOneWord().then(word => {
            dailyWord.deleteMany({}, err => {
                let _dailyWord = new dailyWord({ lexiconsId: word._id })
                _dailyWord.save();
                console.log('定时任务:每日一词已更新！');
            });
        });
    }
}, 60 * 1000 * 60);



