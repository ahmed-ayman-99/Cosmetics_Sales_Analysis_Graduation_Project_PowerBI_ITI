// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateContactForm(formObject)) {
                // Simulate form submission
                submitContactForm(formObject);
            }
        });
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-question i');
        
        question.addEventListener('click', function() {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-question i');
                    otherAnswer.style.maxHeight = '0';
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            } else {
                answer.style.maxHeight = '0';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Form Validation
    function validateContactForm(data) {
        const errors = [];
        
        // Name validation
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Please enter a valid name (minimum 2 characters)');
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        // Subject validation
        if (!data.subject) {
            errors.push('Please select a subject');
        }
        
        // Message validation
        if (!data.message || data.message.trim().length < 10) {
            errors.push('Please enter a message (minimum 10 characters)');
        }
        
        // Display errors if any
        if (errors.length > 0) {
            showFormErrors(errors);
            return false;
        }
        
        return true;
    }
    
    // Show form errors
    function showFormErrors(errors) {
        // Remove existing error messages
        const existingErrors = document.querySelectorAll('.form-error');
        existingErrors.forEach(error => error.remove());
        
        // Create error container
        const errorContainer = document.createElement('div');
        errorContainer.className = 'form-errors';
        errorContainer.style.cssText = `
            background-color: #fee;
            border: 1px solid #fcc;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
            color: #c33;
        `;
        
        const errorTitle = document.createElement('h4');
        errorTitle.textContent = 'Please correct the following errors:';
        errorTitle.style.margin = '0 0 10px 0';
        errorContainer.appendChild(errorTitle);
        
        const errorList = document.createElement('ul');
        errorList.style.margin = '0';
        errorList.style.paddingLeft = '20px';
        
        errors.forEach(error => {
            const errorItem = document.createElement('li');
            errorItem.textContent = error;
            errorList.appendChild(errorItem);
        });
        
        errorContainer.appendChild(errorList);
        
        // Insert at the top of the form
        contactForm.insertBefore(errorContainer, contactForm.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorContainer.parentNode) {
                errorContainer.remove();
            }
        }, 5000);
    }
    
    // Submit contact form
    function submitContactForm(data) {
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            showSuccessMessage();
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    // Show success message
    function showSuccessMessage() {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.form-success, .form-errors');
        existingMessages.forEach(msg => msg.remove());
        
        // Create success message
        const successContainer = document.createElement('div');
        successContainer.className = 'form-success';
        successContainer.style.cssText = `
            background-color: #efe;
            border: 1px solid #cfc;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
            color: #363;
            text-align: center;
        `;
        
        const successIcon = document.createElement('i');
        successIcon.className = 'fas fa-check-circle';
        successIcon.style.cssText = `
            font-size: 24px;
            color: #4caf50;
            margin-bottom: 10px;
            display: block;
        `;
        
        const successTitle = document.createElement('h4');
        successTitle.textContent = 'Message Sent Successfully!';
        successTitle.style.margin = '0 0 10px 0';
        
        const successText = document.createElement('p');
        successText.textContent = 'Thank you for contacting us. We\'ll get back to you within 24 hours.';
        successText.style.margin = '0';
        
        successContainer.appendChild(successIcon);
        successContainer.appendChild(successTitle);
        successContainer.appendChild(successText);
        
        // Insert at the top of the form
        contactForm.insertBefore(successContainer, contactForm.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (successContainer.parentNode) {
                successContainer.remove();
            }
        }, 5000);
    }
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            e.target.value = value;
        });
    }
    
    // Character counter for message
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.style.cssText = `
            font-size: 12px;
            color: #666;
            text-align: right;
            margin-top: 5px;
        `;
        messageTextarea.parentNode.appendChild(charCounter);
        
        function updateCharCounter() {
            const count = messageTextarea.value.length;
            const maxLength = 1000;
            charCounter.textContent = `${count}/${maxLength} characters`;
            
            if (count > maxLength * 0.9) {
                charCounter.style.color = '#f39c12';
            } else if (count > maxLength) {
                charCounter.style.color = '#e74c3c';
            } else {
                charCounter.style.color = '#666';
            }
        }
        
        messageTextarea.addEventListener('input', updateCharCounter);
        updateCharCounter(); // Initial count
    }
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Contact method hover effects
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        method.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}); 