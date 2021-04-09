const mysql = require('mysql2/promise');

async function connect() {
    try {
        const connection = mysql.createConnection({ 
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'softseguros'
        });

        return connection;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = connect;