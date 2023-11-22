const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
    if (req.method == 'POST') {
        console.log('req content-type: ', req.headers['content-type']);

        let postData = '';
        req.on('data', (chunk) => {
            postData += chunk.toString()
        })
        // OR req.on('data', (chunk) => postData += chunk.toString())

        req.on('end', () => {
            console.log('data: ', postData);
            res.end('hello post');
        })
    }
})

server.listen(3000)
console.log('post example')