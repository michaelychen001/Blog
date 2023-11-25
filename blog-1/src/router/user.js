const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
    // get header info
    const method = req.method;
    
    // user login
    if (method === 'POST' && req.path === '/api/user/login') {
        
        // const { username, password } = req.query
        const { username, password } = req.body
        
        const result = login(username, password)

        return result.then(data => {
            console.log(data)

            if (data.username) {
                req.session.username = data.username
                req.session.realname = data.realname

                // update to redis
                set(req.sessionId, req.session)
                
                return new SuccessModel()
            } 
            return new ErrorModel('Failed to login ...')
        })
    }

    // user login check
    // if (method === 'GET' && req.path === '/api/user/login-test') {
    //     if (req.session.username) {
    //         return Promise.resolve(
    //             new SuccessModel({
    //                 session: req.session
    //             })
    //         )
    //     }
    //     return Promise.resolve(new ErrorModel('Not login in yet ...'))
    // }

}

module.exports = handleUserRouter
