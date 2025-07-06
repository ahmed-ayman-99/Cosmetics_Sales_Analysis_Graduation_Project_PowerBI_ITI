const sql = require('mssql');
require('dotenv').config();

// SQL Server configuration for your specific setup
const dbConfig = {
    server: process.env.DB_SERVER || 'DESKTOP-6O91F9F',
    database: process.env.DB_NAME || 'CosmaticsDB',
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || '1234',
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true', // For Azure
        trustServerCertificate: process.env.DB_TRUST_CERT === 'true', // For local dev
        enableArithAbort: true,
        requestTimeout: 30000,
        connectionTimeout: 30000
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

// Create database connection pool
let pool;

async function getConnection() {
    try {
        if (!pool) {
            pool = await sql.connect(dbConfig);
            console.log('✅ Connected to SQL Server successfully');
            console.log(`   Server: ${dbConfig.server}`);
            console.log(`   Database: ${dbConfig.database}`);
        }
        return pool;
    } catch (error) {
        console.error('❌ Database connection error:', error);
        throw error;
    }
}

// Test database connection
async function testConnection() {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT 1 as test, GETDATE() as current_time');
        console.log('✅ Database connection test successful:', result.recordset[0]);
        return true;
    } catch (error) {
        console.error('❌ Database connection test failed:', error);
        return false;
    }
}

// Initialize database tables
async function initializeDatabase() {
    try {
        const pool = await getConnection();
        
        // Create Users table
        const createUsersTable = `
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' AND xtype='U')
            BEGIN
                CREATE TABLE Users (
                    id INT IDENTITY(1,1) PRIMARY KEY,
                    email NVARCHAR(255) UNIQUE NOT NULL,
                    password NVARCHAR(255) NOT NULL,
                    name NVARCHAR(255) NOT NULL,
                    role NVARCHAR(50) DEFAULT 'customer',
                    created_at DATETIME DEFAULT GETDATE(),
                    updated_at DATETIME DEFAULT GETDATE(),
                    is_active BIT DEFAULT 1,
                    email_verified BIT DEFAULT 0,
                    last_login DATETIME NULL
                )
                PRINT 'Users table created successfully'
            END
            ELSE
            BEGIN
                PRINT 'Users table already exists'
            END
        `;
        
        await pool.request().query(createUsersTable);
        console.log('✅ Users table ready');
        
        // Create default admin user if not exists
        const checkAdminUser = `
            IF NOT EXISTS (SELECT * FROM Users WHERE email = 'admin@cosmetics.com')
            BEGIN
                INSERT INTO Users (email, password, name, role, email_verified)
                VALUES ('admin@cosmetics.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin User', 'admin', 1)
                PRINT 'Admin user created'
            END
            ELSE
            BEGIN
                PRINT 'Admin user already exists'
            END
        `;
        
        await pool.request().query(checkAdminUser);
        console.log('✅ Admin user ready');
        
        // Create default test user if not exists
        const checkTestUser = `
            IF NOT EXISTS (SELECT * FROM Users WHERE email = 'user@example.com')
            BEGIN
                INSERT INTO Users (email, password, name, role, email_verified)
                VALUES ('user@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Test User', 'customer', 1)
                PRINT 'Test user created'
            END
            ELSE
            BEGIN
                PRINT 'Test user already exists'
            END
        `;
        
        await pool.request().query(checkTestUser);
        console.log('✅ Test user ready');
        
        console.log('🎉 Database initialization completed successfully!');
        
    } catch (error) {
        console.error('❌ Database initialization error:', error);
        throw error;
    }
}

// User operations
const userOperations = {
    // Find user by email
    async findByEmail(email) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('email', sql.NVarChar, email)
                .query('SELECT * FROM Users WHERE email = @email AND is_active = 1');
            
            return result.recordset[0] || null;
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw error;
        }
    },
    
    // Find user by ID
    async findById(id) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM Users WHERE id = @id AND is_active = 1');
            
            return result.recordset[0] || null;
        } catch (error) {
            console.error('Error finding user by ID:', error);
            throw error;
        }
    },
    
    // Create new user
    async create(userData) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('email', sql.NVarChar, userData.email)
                .input('password', sql.NVarChar, userData.password)
                .input('name', sql.NVarChar, userData.name)
                .input('role', sql.NVarChar, userData.role || 'customer')
                .query(`
                    INSERT INTO Users (email, password, name, role, email_verified)
                    OUTPUT INSERTED.id, INSERTED.email, INSERTED.name, INSERTED.role
                    VALUES (@email, @password, @name, @role, 0)
                `);
            
            return result.recordset[0];
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },
    
    // Update user last login
    async updateLastLogin(id) {
        try {
            const pool = await getConnection();
            await pool.request()
                .input('id', sql.Int, id)
                .input('last_login', sql.DateTime, new Date())
                .query('UPDATE Users SET last_login = @last_login WHERE id = @id');
        } catch (error) {
            console.error('Error updating last login:', error);
            throw error;
        }
    },
    
    // Update user profile
    async updateProfile(id, userData) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('name', sql.NVarChar, userData.name)
                .input('updated_at', sql.DateTime, new Date())
                .query(`
                    UPDATE Users 
                    SET name = @name, updated_at = @updated_at
                    OUTPUT INSERTED.id, INSERTED.email, INSERTED.name, INSERTED.role
                    WHERE id = @id
                `);
            
            return result.recordset[0];
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    },
    
    // Change password
    async changePassword(id, newPassword) {
        try {
            const pool = await getConnection();
            await pool.request()
                .input('id', sql.Int, id)
                .input('password', sql.NVarChar, newPassword)
                .input('updated_at', sql.DateTime, new Date())
                .query('UPDATE Users SET password = @password, updated_at = @updated_at WHERE id = @id');
        } catch (error) {
            console.error('Error changing password:', error);
            throw error;
        }
    },
    
    // Get all users (for admin)
    async getAllUsers() {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .query(`
                    SELECT id, email, name, role, created_at, last_login, is_active, email_verified
                    FROM Users 
                    ORDER BY created_at DESC
                `);
            
            return result.recordset;
        } catch (error) {
            console.error('Error getting all users:', error);
            throw error;
        }
    }
};

module.exports = {
    getConnection,
    testConnection,
    initializeDatabase,
    userOperations
}; 