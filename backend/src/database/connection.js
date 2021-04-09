const mysql = require('mysql2/promise');

async function connect() {
    try {
        const connection = mysql.createConnection({ 
            host: 'ec2-107-22-245-82.compute-1.amazonaws.com',
            user: 'kmltnuseqjfcbh',
            password: '196825c894b791a34b05221997f6314a09eaa005da13c9f30b604a52add54e06',
            database: 'df408bhcdn0p9f'
        });

        return connection;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = connect;