const sql = require('mssql');

const config = {
    server: 'DESKTOP-6O91F9F',
    database: 'CosmeticsDB',
    user: 'sa',
    password: '1234',
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    }
};

async function testSAConnection() {
    try {
        console.log('🔍 Testing SA connection...');
        console.log(`   Server: ${config.server}`);
        console.log(`   Database: ${config.database}`);
        console.log(`   User: ${config.user}`);
        
        const pool = await sql.connect(config);
        console.log('✅ SA connection successful!');
        
        const result = await pool.request().query('SELECT 1 as test, GETDATE() as server_time');
        console.log('✅ Query successful:', result.recordset[0]);
        
        await pool.close();
        return true;
    } catch (error) {
        console.error('❌ SA connection failed:', error.message);
        console.error('Error code:', error.code);
        return false;
    }
}

testSAConnection(); 