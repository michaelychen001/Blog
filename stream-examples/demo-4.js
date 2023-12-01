const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req, res) => {
    // get file path
    const filePath = path.join(__dirname, 'data.txt')

    // create stream
    var stream = fs.createReadStream(filePath)

    // add stream content to res
    stream.pipe(res)

}).listen(3000)

