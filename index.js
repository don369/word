const express = require('express')
const swig = require('swig')
const path = require('path')
const app = new express()

swig.setDefaults({
    allowErrors: true,
    autoescape:true,
    cache:false,
    encoding:'utf8'
});

app.engine('html', swig.renderFile)
app.set('views', './app/views')
app.set('view engine', 'html')

app.set('view cache', false)
swig.setDefaults({cache: false})

app.use(express.static(path.join(__dirname ,'public')));

require('./middleware')(app)
require('./router.js')(app)


const port = require('./config.js').port;
app.listen(port);