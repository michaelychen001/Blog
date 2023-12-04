const { 
    getList, 
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog');

const { SuccessModel, ErrorModel } = require('../model/resModel');

// perform login check before making any blog operations
const loginCheck = (req) => {
    // check user login status
    if (!req.session.username) {
        return Promise.resolve(
            new ErrorModel('Not login in yet ...')
        )
    }
}

const handleBlogRouter = (req, res) => {
    // get header info
    const method = req.method;

    // get blog list
    if (method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // const listData = getList(author, keyword)
        // return new SuccessModel(listData)

        if (req.query.isadmin) {
            // manager UI
            const loginCheckResult = loginCheck(req)
            if (loginCheckResult) {
                // not login yet
                return loginCheckResult
            }
            author = req.session.username
        }

        const result = getList(author, keyword)

        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // get blog detail
    if (method === 'GET' && req.path === '/api/blog/detail') {

        // const data = getDetail(id)
        // return new SuccessModel(data)

        const id = req.query.id || ''
        const result = getDetail(id)

        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // create new blog
    if (method === 'POST' && req.path === '/api/blog/new') {

        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            // not login yet
            return loginCheckResult
        }

        req.body.author = req.session.username
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })

    }

    // update a blog
    if (method === 'POST' && req.path === '/api/blog/update') {

        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            // not login yet
            return loginCheckResult
        }

        const id = req.query.id || ''
        const result = updateBlog(id, req.body)

        return result.then(val => {
            if (val) {
                return new SuccessModel()
            }
            return new ErrorModel('Failed to update ...')
        })
    }

    // delete a blog
    if (method === 'POST' && req.path === '/api/blog/del') {

        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            // not login yet
            return loginCheckResult
        }

        const id = req.query.id || ''
        const author = req.session.username

        const result = delBlog(id, author)

        return result.then(val => {
            if (val) {
                return new SuccessModel()
            }
            return new ErrorModel('Failed to delete the item ...')
        })

    }

};

module.exports = handleBlogRouter