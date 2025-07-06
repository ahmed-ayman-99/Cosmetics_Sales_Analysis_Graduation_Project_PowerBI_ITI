const fs = require('fs');
const path = require('path');

// Create .env file with SQL Server SA configuration
const envContent = `# Server Configuration
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database Configuration for DESKTOP-6O91F9F
DB_SERVER=DESKTOP-6O91F9F
DB_NAME=CosmeticsDB
DB_USER=sa
DB_PASSWORD=1234
DB_ENCRYPT=false
DB_TRUST_CERT=true

# JWT Secret
JWT_SECRET=cosmetic-cursor-super-secret-jwt-key-2024
`;

// Write .env file
fs.writeFileSync('.env', envContent);
console.log('✅ Created .env file with SQL Server SA configuration');

// Test database connection
async function testDatabaseConnection() {
    try {
        // Load environment variables
        require('dotenv').config();
        
        // Test the database connection
        const { testConnection, initializeDatabase } = require('./config/database');
        
        console.log('\n🔍 Testing SQL Server connection...');
        console.log(`   Server: ${process.env.DB_SERVER}`);
        console.log(`   Database: ${process.env.DB_NAME}`);
        console.log(`   User: ${process.env.DB_USER}`);
        
        const isConnected = await testConnection();
        
        if (isConnected) {
            console.log('\n✅ Database connection successful!');
            console.log('\n🔧 Initializing database tables...');
            await initializeDatabase();
            console.log('\n🎉 Setup completed successfully!');
            console.log('\n📋 Next steps:');
            console.log('   1. Run: npm install');
            console.log('   2. Run: npm run dev');
            console.log('   3. Visit: http://localhost:3000/login');
            console.log('   4. Test with: user@example.com / password');
        } else {
            console.log('\n❌ Database connection failed!');
            console.log('\n🔧 Troubleshooting:');
            console.log('   1. Make sure SQL Server is running');
            console.log('   2. Check if SQL Server Browser service is running');
            console.log('   3. Verify the server name: DESKTOP-6O91F9F');
            console.log('   4. Check if the database "CosmeticsDB" exists');
            console.log('   5. Verify SA password in .env file');
            console.log('   6. Make sure SQL Server Authentication is enabled');
        }
        
    } catch (error) {
        console.error('\n❌ Setup error:', error.message);
        console.log('\n🔧 Please check:');
        console.log('   1. SQL Server is running');
        console.log('   2. Database "CosmeticsDB" exists');
        console.log('   3. SQL Server Authentication is enabled');
        console.log('   4. Firewall is not blocking port 1433');
        console.log('   5. SA password is correct');
    }
}

// Run the setup
testDatabaseConnection(); 