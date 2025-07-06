# SQL Server Connection Setup Guide

This guide will help you connect your login system to your SQL Server instance.

## Your SQL Server Details
- **Server Name:** `DESKTOP-6O91F9F`
- **Database Name:** `CosmaticsDB`
- **Username:** `sa`
- **Password:** `1234`

## 🚀 Quick Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Setup Script
```bash
node setup-sql-server.js
```

This script will:
- Create the `.env` file with your SQL Server configuration
- Test the database connection
- Initialize the database tables
- Create default users

### Step 3: Start the Server
```bash
npm run dev
```

### Step 4: Test the Login
1. Go to: `http://localhost:3000/login`
2. Use these credentials:
   - **Email:** `user@example.com`
   - **Password:** `password`

## 🔧 Manual Setup (if needed)

### Create .env File
Create a file named `.env` in your project root:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=cosmetic-cursor-super-secret-jwt-key-2024
FRONTEND_URL=http://localhost:3000

# SQL Server Configuration for DESKTOP-6O91F9F
DB_SERVER=DESKTOP-6O91F9F
DB_NAME=CosmaticsDB
DB_USER=sa
DB_PASSWORD=1234
DB_ENCRYPT=false
DB_TRUST_CERT=true
```

## 🗄️ SQL Server Setup

### 1. Enable SQL Server Authentication
1. Open SQL Server Management Studio
2. Connect to your server `DESKTOP-6O91F9F`
3. Right-click the server → Properties → Security
4. Select "SQL Server and Windows Authentication mode"
5. Click OK and restart SQL Server

### 2. Create Database (if not exists)
```sql
CREATE DATABASE CosmaticsDB;
```

### 3. Verify SA Account
Make sure the SA account is enabled and has the correct password:
```sql
-- Check if SA is enabled
SELECT name, is_disabled 
FROM sys.sql_logins 
WHERE name = 'sa';

-- If disabled, enable it
ALTER LOGIN sa ENABLE;
```

### 4. Test Connection
In SQL Server Management Studio:
- Server name: `DESKTOP-6O91F9F`
- Authentication: SQL Server Authentication
- Login: `sa`
- Password: `1234`

## 🔍 Troubleshooting

### Common Issues & Solutions

#### 1. Connection Refused
**Error:** `ECONNREFUSED`
**Solution:**
- Check if SQL Server is running
- Verify server name `DESKTOP-6O91F9F`
- Check if SQL Server Browser service is running

#### 2. Authentication Failed
**Error:** `Login failed for user 'sa'`
**Solution:**
- Verify password is `1234`
- Check if SQL Server Authentication is enabled
- Make sure SA account is not disabled

#### 3. Database Not Found
**Error:** `Cannot open database "CosmaticsDB"`
**Solution:**
- Create the database manually
- Check database name spelling
- Verify user has access to the database

#### 4. Port Issues
**Error:** `Connection timeout`
**Solution:**
- Default SQL Server port is 1433
- Check Windows Firewall settings
- Verify SQL Server is listening on the correct port

### SQL Server Services to Check

1. **SQL Server (MSSQLSERVER)** - Main database engine
2. **SQL Server Browser** - Helps with named instances
3. **SQL Server Agent** - For scheduled tasks

### Enable SQL Server Browser
1. Open Services (services.msc)
2. Find "SQL Server Browser"
3. Right-click → Properties → Startup type: Automatic
4. Click Start

### Firewall Settings
1. Open Windows Firewall
2. Allow SQL Server through firewall
3. Add port 1433 to allowed ports

## 📊 Database Schema

The setup will create these tables:

### Users Table
```sql
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
);
```

### Default Users
- **Admin:** `admin@cosmetics.com` / `password`
- **Test User:** `user@example.com` / `password`

## 🧪 Testing

### Test Database Connection
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "database": "connected",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Test Login API
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password",
    "remember": true
  }'
```

## 🔐 Security Notes

### Production Setup
1. **Change default passwords**
2. **Use strong JWT secret**
3. **Enable HTTPS**
4. **Set up proper CORS origins**
5. **Use environment variables for secrets**

### SQL Server Security
1. **Change SA password**
2. **Create dedicated database user**
3. **Grant minimal required permissions**
4. **Enable encryption if needed**

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/login` | User login |
| POST | `/api/register` | User registration |
| POST | `/api/logout` | User logout |
| GET | `/api/user/profile` | Get user profile |
| POST | `/api/forgot-password` | Request password reset |
| GET | `/api/health` | Health check with DB status |

## 🎯 Success Indicators

When everything is working correctly, you should see:

1. **Setup Script Output:**
   ```
   ✅ Created .env file with SQL Server configuration
   ✅ Connected to SQL Server successfully
   ✅ Database connection test successful
   ✅ Users table ready
   ✅ Admin user ready
   ✅ Test user ready
   🎉 Setup completed successfully!
   ```

2. **Server Startup:**
   ```
   Server is running on port 3000
   ✅ Connected to SQL Server successfully
   Server: DESKTOP-6O91F9F
   Database: CosmaticsDB
   ```

3. **Login Success:**
   - Form submits without errors
   - Success notification appears
   - Redirects to home page
   - User data stored in localStorage

## 🆘 Getting Help

If you encounter issues:

1. **Check the console output** for specific error messages
2. **Verify SQL Server is running** and accessible
3. **Test connection manually** in SQL Server Management Studio
4. **Check firewall settings** and port 1433
5. **Verify database exists** and user has permissions

## 📞 Support

For additional help:
1. Check the error messages in the console
2. Verify your SQL Server configuration
3. Test the connection manually first
4. Ensure all services are running 