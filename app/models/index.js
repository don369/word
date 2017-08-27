const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = Promise;
mongoose.connect(require('../../config.js').db_connect);
mongoose.connection.on('error', console.error.bind(console, 'connection error: '))
    .once('open', () => {
        console.log('database open !')
    })

const db = module.exports = {
    invitations: loadDb('invitations', 'invitation'),
    lexicons: loadDb('lexicons', 'lexicon'),
    myusers: loadDb('myusers', 'myuser'),
    words: loadDb('words', 'word'),
    mongoose: mongoose,
    middleware: (req, res, next) => {
        req.invitations = res.invitations = db.invitations;
        req.lexicons = res.lexicons = db.lexicons;
        req.myusers = res.myusers = db.myusers;
        req.words = res.words = db.words;
        next();
    }
}

function loadDb(Dbname, Schema) {
    return mongoose.model(Dbname, require(`./${Schema}.schema.js`)(mongoose.Schema));
}