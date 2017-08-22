const http = require('http');
const { URL } = require('url');

module.exports = (word, callback)=>{
    const url = new URL(`http://xtk.azurewebsites.net/BingDictService.aspx?Word=${ word }`);
    const req = http.request(url, (res)=>{
        let data = '';
        res.setEncoding('utf8');
        res.on('data', chunk => data = data + chunk );
        res.on('end', ()=> callback(parseWord(data)) );
    })
    req.end()
}

function parseWord(word){
    word = JSON.parse(word)
    return {
        name: word['word'],
        UK: word['pronunciation']['BrE'] || '',
        UKMP3: word['pronunciation']['BrEmp3'] || '',
        US: word['pronunciation']['AmE'] || '',
        USMP3: word['pronunciation']['AmEmp3'] || '',
        interpetation: word['defs'].map( v => v['pos'] + v['def']).join('</br>')
    }
}