const fs = require('fs')
const path = require('path')

// write logs
function writeLog(writeStream, log) {
    writeStream.write(log + '\n') // processing
}

// create stream for writing logs
function createWriteStream(fileName) {
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return writeStream
}

// write logs
const accessWriteStream = createWriteStream('access.log')
function access(log) {
    writeLog(accessWriteStream, log)
}

module.exports = {
    access
}