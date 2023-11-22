const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
    console.log('method: ', req.method);
    
    const url = req.url;
    console.log(url);

    req.query = querystring.parse(url.split('?')[1])
    console.log(req.query);

    res.end(JSON.stringify(req.query));
    console.log(JSON.stringify(req.query));
})

server.listen(3000)