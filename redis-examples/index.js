const redis = require('redis')

// create client
const redisClient = redis.createClient(6379, '127.0.0.1')

redisClient.on('error', err => {
    console.error(err)
})

// test -> this works well with Redis@^2.8.0.

// setting
redisClient.set('myname', 'michael')

// getting
redisClient.get('myname', (err, val) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(`val -> ${val}`)

    // quit
    redisClient.quit()
})