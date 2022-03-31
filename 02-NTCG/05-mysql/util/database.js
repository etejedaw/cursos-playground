const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'node_test',
    database: 'node_mysql',
    password: 'deno'
});

module.exports = pool.promise();