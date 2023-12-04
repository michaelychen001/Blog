const http = require('http');
const querystring = require('querystring');
const bodyParser = require('body-parser');

const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('d.toGMTString() is ', d.toGMTString())
    return  d.toGMTString()
}

// session data
const SESSION_DATA = {}

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

    // resolve cookie
    req.cookie = {} 
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })

    // resolve session info
    let needSetCookie = false
    let userId = req.cookie.userid
    if (userId) {
         if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
         }
    } else {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]

    // handle post data
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
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
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
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
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

http.createServer(serverHandle).listen(8000);