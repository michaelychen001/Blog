const { loginCheck } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleUserRouter = (req, res) => {
    // get header info
    const method = req.method;
    
    // user login
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        const result = loginCheck(username, password)

        return result.then(data => {

            if (data.username) {
                return new SuccessModel()
            } 
            return new ErrorModel('Failed to login ...')
        })
    }

}

module.exports = handleUserRouter
