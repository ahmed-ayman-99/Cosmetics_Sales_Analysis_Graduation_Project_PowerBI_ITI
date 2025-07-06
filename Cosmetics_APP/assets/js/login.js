// Login Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initLoginForm();
    initPasswordToggle();
    initSocialLogin();
    initFormValidation();
});

// Initialize login form
function initLoginForm() {
    const loginForm = document.getElementById('login-form');
    const loginBtn = document.querySelector('.login-btn');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    // Also add direct click handler to the button
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Login button clicked!');
            window.location.href = 'index.html';
        });
    }
    
    // Auto-focus on email field
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.focus();
    }
}

// Handle login form submission
function handleLoginSubmit(e) {
    e.preventDefault();
    console.log('Login form submitted!');
    
    // Redirect to home page immediately
    console.log('Redirecting to index.html...');
    window.location.href = 'index.html';
}

// API call to login user
async function loginUser(formData) {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    }
    
    return await response.json();
}

// Validate login form
function validateLoginForm() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    let isValid = true;
    
    // Validate email
    const email = emailInput.value.trim();
    if (!email) {
        showFieldError('email', 'Email address is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    const password = passwordInput.value;
    if (!password) {
        showFieldError('password', 'Password is required');
        isValid = false;
    } else if (password.length < 6) {
        showFieldError('password', 'Password must be at least 6 characters');
        isValid = false;
    }
    
    return isValid;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show field error
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}-error`);
    const formGroup = field.closest('.form-group');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    if (formGroup) {
        formGroup.classList.add('error');
    }
    
    if (field) {
        field.focus();
    }
}

// Clear form errors
function clearFormErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const formGroups = document.querySelectorAll('.form-group');
    
    errorMessages.forEach(error => {
        error.classList.remove('show');
        error.textContent = '';
    });
    
    formGroups.forEach(group => {
        group.classList.remove('error', 'success');
    });
}

// Handle login error
function handleLoginError(message) {
    showNotification(message, 'error');
    
    // Shake animation for form
    const form = document.querySelector('.login-form');
    form.classList.add('shake');
    setTimeout(() => {
        form.classList.remove('shake');
    }, 500);
}

// Set loading state
function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

// Initialize password toggle
function initPasswordToggle() {
    const passwordToggle = document.getElementById('password-toggle');
    const passwordInput = document.getElementById('password');
    
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            
            const icon = this.querySelector('i');
            if (type === 'text') {
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }
}

// Initialize social login
function initSocialLogin() {
    const googleBtn = document.querySelector('.btn-google');
    const facebookBtn = document.querySelector('.btn-facebook');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', handleGoogleLogin);
    }
    
    if (facebookBtn) {
        facebookBtn.addEventListener('click', handleFacebookLogin);
    }
}

// Handle Google login
function handleGoogleLogin() {
    // Implement Google OAuth login
    showNotification('Google login coming soon!', 'info');
}

// Handle Facebook login
function handleFacebookLogin() {
    // Implement Facebook OAuth login
    showNotification('Facebook login coming soon!', 'info');
}

// Initialize form validation
function initFormValidation() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    // Real-time validation
    if (emailInput) {
        emailInput.addEventListener('blur', validateEmailField);
        emailInput.addEventListener('input', clearEmailError);
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('blur', validatePasswordField);
        passwordInput.addEventListener('input', clearPasswordError);
    }
}

// Validate email field
function validateEmailField() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    
    if (email && !isValidEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
    } else if (email) {
        showFieldSuccess('email');
    }
}

// Validate password field
function validatePasswordField() {
    const passwordInput = document.getElementById('password');
    const password = passwordInput.value;
    
    if (password && password.length < 6) {
        showFieldError('password', 'Password must be at least 6 characters');
    } else if (password) {
        showFieldSuccess('password');
    }
}

// Show field success
function showFieldSuccess(fieldName) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    if (formGroup) {
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
    }
}

// Clear email error
function clearEmailError() {
    const emailInput = document.getElementById('email');
    const formGroup = emailInput.closest('.form-group');
    const errorElement = document.getElementById('email-error');
    
    if (formGroup) {
        formGroup.classList.remove('error', 'success');
    }
    
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

// Clear password error
function clearPasswordError() {
    const passwordInput = document.getElementById('password');
    const formGroup = passwordInput.closest('.form-group');
    const errorElement = document.getElementById('password-error');
    
    if (formGroup) {
        formGroup.classList.remove('error', 'success');
    }
    
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

// Get redirect URL
function getRedirectUrl() {
    // Check for redirect parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');
    
    if (redirect) {
        return decodeURIComponent(redirect);
    }
    
    // Check for stored redirect URL
    const storedRedirect = sessionStorage.getItem('redirectAfterLogin');
    if (storedRedirect) {
        sessionStorage.removeItem('redirectAfterLogin');
        return storedRedirect;
    }
    
    // Default redirect to home page
    return 'index.html';
}

// Show notification (reuse from main.js if available)
function showNotification(message, type = 'info') {
    // Check if notification function exists in main.js
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
        return;
    }
    
    // Fallback notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
}

// Remove notification
function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Get notification icon
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Get notification color
function getNotificationColor(type) {
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    return colors[type] || '#17a2b8';
}

// Add shake animation CSS
const shakeCSS = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.login-form.shake {
    animation: shake 0.5s ease-in-out;
}
`;

// Inject shake animation CSS
const style = document.createElement('style');
style.textContent = shakeCSS;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const loginForm = document.getElementById('login-form');
        if (loginForm && document.activeElement.closest('#login-form')) {
            loginForm.dispatchEvent(new Event('submit'));
        }
    }
    
    // Escape to clear form
    if (e.key === 'Escape') {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.reset();
            clearFormErrors();
        }
    }
});

// Auto-save form data (optional)
function autoSaveForm() {
    const emailInput = document.getElementById('email');
    const rememberCheckbox = document.getElementById('remember');
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            if (rememberCheckbox && rememberCheckbox.checked) {
                localStorage.setItem('loginEmail', this.value);
            }
        });
    }
    
    // Restore saved email
    const savedEmail = localStorage.getItem('loginEmail');
    if (savedEmail && emailInput) {
        emailInput.value = savedEmail;
        if (rememberCheckbox) {
            rememberCheckbox.checked = true;
        }
    }
}

// Initialize auto-save
autoSaveForm(); 