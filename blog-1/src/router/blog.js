const { 
    getList, 
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog');

const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleBlogRouter = (req, res) => {
    // get header info
    const method = req.method;

    // get blog list
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        
        // const listData = getList(author, keyword)
        // return new SuccessModel(listData)

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
        // fake author name
        req.body.author = 'admin' // fake data here

        const result = newBlog(req.body)

        return result.then(data => {
            return new SuccessModel(data)
        })

    }

    // update a blog
    if (method === 'POST' && req.path === '/api/blog/update') {

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
        const id = req.query.id || ''
        // fake author name
        req.body.author = 'admin' // fake data here

        const result = delBlog(id, req.body.author)

        return result.then(val => {
            if (val) {
                return new SuccessModel()
            }
            return new ErrorModel('Failed to delete the item ...')
        })

    }

    // login module

};

module.exports = handleBlogRouter