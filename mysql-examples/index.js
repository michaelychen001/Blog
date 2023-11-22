const mysql = require('mysql')

// create connection object
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Apple2024',
    port: '3306',
    database: 'myblog'
})

// start connecting
con.connect()

const sql = 'select * from users;'

con.query(sql, (err, result) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(result)
})

// stop con
con.end()