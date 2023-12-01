const http = require('http')
const server = http.createServer((req, res) => {
    if (req.method == 'POST') {
        req.pipe(res) // Most important
    }
})

server.listen(8000)