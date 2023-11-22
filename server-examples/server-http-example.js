const http = require('http');

const server = http.createServer((req, res) => {
    res.end('hello http')
});

server.listen(3000);