const http = require('http');
const querystring = require('querystring');
const bodyParser = require('body-parser');

const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

// handle post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }

        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }

        let postData = ''
        req.on('data', (chunk) => {
            postData += chunk.toString()
        })
        req.on('end', (chunk) => {
            if (!postData) {
                resolve({})
            }
            resolve(
                JSON.parse(postData)
            )
        })


    })

    return promise
}

const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json');

    const url = req.url;
    
    // resolve path
    req.path = url.split('?')[0];
    
    // resolve query
    req.query = querystring.parse(url.split('?')[1])

    getPostData(req).then(postData => {
        req.body = postData

        // blog router
        // -> old version: WITHOUT db
        // const blogData = handleBlogRouter(req, res)
        // if (blogData) {
        //     res.end(
        //         JSON.stringify(blogData)
        //     )
        //     return
        // }

        // -> new version: WITH db
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(JSON.stringify(blogData))
            })
            return
        }

        // user router
        // const userData = handleUserRouter(req, res);
        // if (userData) {
        //     res.end(JSON.stringify(userData));
        //     return
        // }

        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }

        // unknown router
        res.writeHead(404, {"Content-type": "text/plain"});
        res.write("404 Not Found\n");
        res.end()

    })
}

http.createServer(serverHandle).listen(3000);