const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// fs.exists(fileName, (exist) => {
//     console.log('exist -> ', exist)
// })

if (fs.existsSync(fileName)) {
    console.log('Exist')
} else {
    console.log('Not exist')
}