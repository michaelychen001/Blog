const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// read file
fs.readFile(fileName, (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(data.toString())
})

// write file
const content = 'new content for writing in\n'
const opt = {
    flag: 'a' // append
}

fs.writeFile(fileName, content, opt, (err) => {
    if (err) {
        console.error(err)
        return
    }
})