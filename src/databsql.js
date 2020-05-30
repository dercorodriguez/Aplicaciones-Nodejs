const mssql = require('mssql');
const { conf_dbconnect } = require('./keys');

const mspool = new mssql.ConnectionPool(conf_dbconnect)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch(err => {
        if (err.code === 'ELOGIN') {
            console.error(' Error de inicio de sesión del usuario sa');
        }
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('LA BASE DE DATOS FUE CERRADA');
        }
        //console.log('Database Connection Failed! Bad Config: ', err)
    });

module.exports = mspool;