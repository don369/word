const words = module.exports = require('express').Router();

const db = require('./models/wordbook.js');
const DbWord = db.words;
const DbLexicon = db.lexicons;
const getWord = require('../util/getword.js')

words.get('/',index);
words.get('/search',search);

words.route('/new').get(new_get).post(new_post);
words.route('/edit').get(edit_get).post(edit_post);
words.delete('/del',(req, res)=>{});


function index(req, res){
    res.render('index');
}

function search(req, res){
    let word = req.query.word;
    let userId = req.session.user_id;

    DbLexicon.findOne({name: word},(err, rs) => (!rs) ? _renderPage() : _render(rs) );

    function _renderPage(){
        getWord(word, (lexicon)=>{
            let _lexicon = new DbLexicon(lexicon);
            _lexicon.save();
            render(lexicon);
        })
    }

    function _render(lexicon){
        res.format({
            html: ()=> res.render('word/new',{ word: lexicon } ),
            json: ()=>{
                DbWord.findOne({word}, (err, rs)=> res.send({lexicon: lexicon, my_word: rs }));
            }
        });
    }
}

function new_get(req, res){
    res.render('word/new', { csrfToken: req.csrfToken() });
}

function new_post(req, res, next){
    let already_has = false;
    let status = 'error';
    let word = req.body.word;
    let userId = req.session.user_id;
    DbWord.findOne({word, userId}, (err, rs)=>{
        if(err) return next(err);
        if(!rs){
            _addWord((err, rs)=>{
                already_has = true
                _status = 'OK'
                _render(rs);
            })
        }
    });
    _render(rs);

    function _addWord(callback){
        let extension = req.body.extension;
        let date = Date.now
        let word = new DbWord({word, userId});
        
        word.save(callback)
    }

    function _render(rs){
        res.json({word: already_has ? rs : '', status: _status});
    }
}

function edit_get(req, res){

}

function edit_post(req, res){

}