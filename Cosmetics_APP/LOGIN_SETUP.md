# Login Page Setup Guide

This guide explains how to set up and use the login functionality for the Cosmetic Cursor e-commerce website.

## Files Created

### Frontend Files
- `login.html` - Main login page with form and UI
- `assets/css/login.css` - Styling for the login page
- `assets/js/login.js` - JavaScript functionality for login

### Backend Files
- `api/login.js` - Express.js API endpoints for authentication
- `server.js` - Express server setup
- `package.json` - Node.js dependencies

## Features Implemented

### Frontend Features
- ✅ Responsive login form with email and password fields
- ✅ Password visibility toggle
- ✅ "Remember me" checkbox
- ✅ "Forgot Password?" link
- ✅ Social login buttons (Google & Facebook placeholders)
- ✅ Form validation with real-time feedback
- ✅ Loading states and error handling
- ✅ Keyboard shortcuts (Ctrl+Enter to submit, Escape to clear)
- ✅ Auto-save email when "Remember me" is checked
- ✅ Matches existing design system (colors, typography, spacing)

### Backend Features
- ✅ POST `/api/login` endpoint
- ✅ JWT token authentication
- ✅ Password hashing with bcrypt
- ✅ Mock user database for testing
- ✅ Rate limiting and security middleware
- ✅ CORS configuration
- ✅ Error handling

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-here
FRONTEND_URL=http://localhost:3000
```

### 3. Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

### 4. Access the Login Page

- **Login Page**: `http://localhost:3000/login`
- **API Health Check**: `http://localhost:3000/api/health`

## Testing the Login

### Test Users

The mock API includes these test users:

1. **Regular User**
   - Email: `user@example.com`
   - Password: `password`

2. **Admin User**
   - Email: `admin@example.com`
   - Password: `password`

### API Testing

You can test the login API directly:

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password",
    "remember": true
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "Test User",
    "role": "customer"
  }
}
```

## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/login` | User login |
| POST | `/api/logout` | User logout |
| POST | `/api/register` | User registration |
| POST | `/api/forgot-password` | Request password reset |
| POST | `/api/reset-password` | Reset password |
| GET | `/api/user/profile` | Get user profile (protected) |

### Request/Response Format

#### Login Request
```json
{
  "email": "user@example.com",
  "password": "password",
  "remember": true
}
```

#### Login Response
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "Test User",
    "role": "customer"
  }
}
```

## Frontend Integration

### Form Validation

The login form includes:
- Email format validation
- Password minimum length (6 characters)
- Real-time validation feedback
- Error message display

### User Experience Features

- **Auto-focus**: Email field is automatically focused when page loads
- **Loading States**: Button shows loading spinner during API calls
- **Error Handling**: Form shakes and shows error messages on failed login
- **Success Redirect**: Automatically redirects after successful login
- **Remember Me**: Stores user data in localStorage if checked
- **Keyboard Shortcuts**: 
  - `Ctrl/Cmd + Enter`: Submit form
  - `Escape`: Clear form

### Styling

The login page uses the existing design system:
- **Colors**: Primary `#FC9A8D`, Secondary `#506867`
- **Typography**: Poppins (body), Playfair Display (headings)
- **Spacing**: Consistent with other pages
- **Responsive**: Works on all screen sizes

## Security Features

### Backend Security
- Password hashing with bcrypt
- JWT token authentication
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Helmet.js security headers
- Input validation

### Frontend Security
- HTTPS-only cookies (in production)
- XSS protection
- CSRF protection (via JWT)
- Secure password field handling

## Customization

### Adding New Users

Edit `api/login.js` and add users to the `mockUsers` array:

```javascript
const mockUsers = [
    // ... existing users
    {
        id: 3,
        email: 'newuser@example.com',
        password: '$2a$10$...', // Use bcrypt to hash password
        name: 'New User',
        role: 'customer'
    }
];
```

### Changing Styling

Modify `assets/css/login.css` to customize:
- Colors
- Typography
- Spacing
- Animations
- Responsive breakpoints

### Adding Social Login

1. Implement OAuth providers in `assets/js/login.js`
2. Add backend endpoints for social authentication
3. Update the social login buttons with real functionality

## Production Deployment

### Environment Variables
```env
NODE_ENV=production
JWT_SECRET=your-production-secret-key
FRONTEND_URL=https://yourdomain.com
PORT=3000
```

### Security Checklist
- [ ] Use strong JWT secret
- [ ] Enable HTTPS
- [ ] Set up proper CORS origins
- [ ] Configure rate limiting
- [ ] Set up monitoring and logging
- [ ] Use environment variables for secrets

## Troubleshooting

### Common Issues

1. **CORS Errors**: Check `FRONTEND_URL` in `.env`
2. **JWT Errors**: Verify `JWT_SECRET` is set
3. **Port Conflicts**: Change `PORT` in `.env`
4. **Module Not Found**: Run `npm install`

### Debug Mode

Set `NODE_ENV=development` to see detailed error messages.

## Next Steps

1. **Database Integration**: Replace mock users with real database
2. **Email Service**: Implement password reset emails
3. **Social Login**: Add Google/Facebook OAuth
4. **User Management**: Add user profile and settings pages
5. **Admin Panel**: Create admin interface for user management 