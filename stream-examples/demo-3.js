const fs = require('fs')
const path = require('path')

fileName1 = path.join(__dirname, 'data.txt')
fileName2 = path.join(__dirname, 'data_bak.txt')

readStream = fs.createReadStream(fileName1)
writeStream = fs.createWriteStream(fileName2)

readStream.pipe(writeStream)

readStream.on('end', ()=> {
    console.log('copy done')
})
