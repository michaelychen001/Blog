const crypto = require('crypto')

// this is customized by yourself
const SECRET_KEY = 'WJiol_8776#'

// md5 cryp
function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

// generate cryp-ed password
function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}

// module.exports = {
//     genPassword
// }

console.log(genPassword('123'))