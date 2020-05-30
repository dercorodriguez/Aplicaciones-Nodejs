const mysql = require('mysql');
const { promisify } = require('util');
const keydatabase = require('./keys');
const pool = mysql.createPool(keydatabase.database);

/*
const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'database_links',
    port: 3306
});
*/
//const pool = mysql.createConnection(keydatabase.database);

/*
pool.connect((err, connection) => {
    if (err) {
        console.error('error ocurrido', err);
    }
    if (connection) {
        console.log('db conectada');
    }
    return;
});

*/

pool.getConnection((err, connection) => {
    if (err) {
        console.error('error ocurrido', err);
    }
    if (connection) {
        connection.release();
        console.log('db conectada');
    }
    return;
});

pool.query = promisify(pool.query);
module.exports = pool;