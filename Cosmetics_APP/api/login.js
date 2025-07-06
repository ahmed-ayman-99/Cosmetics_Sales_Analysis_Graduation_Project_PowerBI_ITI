// SQL Server API endpoint for login functionality
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { userOperations, initializeDatabase, testConnection } = require('../config/database');
const router = express.Router();

// Initialize database on startup
initializeDatabase().catch(console.error);

// JWT secret (in production, use environment variable)
const JWT_SECRET = 'your-secret-key';

// POST /api/login
router.post('/login', async (req, res) => {
    try {
        const { email, password, remember } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Find user by email
        const user = await userOperations.findByEmail(email);
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate JWT token
        const tokenPayload = {
            userId: user.id,
            email: user.email,
            role: user.role
        };

        const token = jwt.sign(tokenPayload, JWT_SECRET, {
            expiresIn: remember ? '30d' : '24h' // 30 days if remember me, 24 hours otherwise
        });

        // Update last login
        await userOperations.updateLastLogin(user.id);

        // Return success response
        res.json({
            success: true,
            message: 'Login successful',
            token: token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// POST /api/logout
router.post('/logout', (req, res) => {
    // In a real application, you might want to blacklist the token
    res.json({
        success: true,
        message: 'Logout successful'
    });
});

// GET /api/user/profile (protected route example)
router.get('/user/profile', authenticateToken, async (req, res) => {
    try {
        const user = await userOperations.findById(req.user.userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                created_at: user.created_at,
                last_login: user.last_login
            }
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access token required'
        });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }
        req.user = user;
        next();
    });
}

// POST /api/register (for signup functionality)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and password are required'
            });
        }

        // Check if user already exists
        const existingUser = await userOperations.findByEmail(email);
        
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await userOperations.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: 'customer'
        });

        // Generate JWT token
        const tokenPayload = {
            userId: newUser.id,
            email: newUser.email,
            role: newUser.role
        };

        const token = jwt.sign(tokenPayload, JWT_SECRET, {
            expiresIn: '24h'
        });

        // Return success response
        res.status(201).json({
            success: true,
            message: 'Registration successful',
            token: token,
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                role: newUser.role
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// POST /api/forgot-password
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        // Check if user exists
        const user = await userOperations.findByEmail(email);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User with this email not found'
            });
        }

        // In a real application, you would:
        // 1. Generate a password reset token
        // 2. Send an email with the reset link
        // 3. Store the token in the database with expiration

        res.json({
            success: true,
            message: 'Password reset email sent (mock response)'
        });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// POST /api/reset-password
router.post('/reset-password', (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({
            success: false,
            message: 'Token and new password are required'
        });
    }

    // In a real application, you would:
    // 1. Verify the reset token
    // 2. Update the user's password
    // 3. Invalidate the reset token

    res.json({
        success: true,
        message: 'Password reset successful (mock response)'
    });
});

// Health check with database connection test
router.get('/health', async (req, res) => {
    try {
        const dbConnected = await testConnection();
        res.json({
            success: true,
            message: 'Server is running',
            database: dbConnected ? 'connected' : 'disconnected',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

module.exports = router; 