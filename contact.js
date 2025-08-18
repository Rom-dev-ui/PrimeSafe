document.addEventListener('DOMContentLoaded', function() {
    // Form submission
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.querySelector('.form-success');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateContactForm()) {
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Here you would typically send the form data to your server
                const formData = new FormData(contactForm);
                console.log('Contact form data:', Object.fromEntries(formData));
                
                // Reset form
                contactForm.reset();
            }, 1000);
        }
    });
    
    // Form validation
    function validateContactForm() {
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'var(--secondary-color)';
                isValid = false;
                
                // Add error message
                if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'This field is required';
                    errorMsg.style.color = 'var(--secondary-color)';
                    errorMsg.style.fontSize = '0.8rem';
                    errorMsg.style.marginTop = '0.3rem';
                    field.parentNode.insertBefore(errorMsg, field.nextSibling);
                }
            } else {
                field.style.borderColor = 'var(--border-color)';
                if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
                    field.nextElementSibling.remove();
                }
            }
        });
        
        // Email validation
        const emailField = document.getElementById('contact-email');
        if (emailField.value && !validateEmail(emailField.value)) {
            emailField.style.borderColor = 'var(--secondary-color)';
            isValid = false;
            
            if (!emailField.nextElementSibling || !emailField.nextElementSibling.classList.contains('error-message')) {
                const errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'Please enter a valid email address';
                errorMsg.style.color = 'var(--secondary-color)';
                errorMsg.style.fontSize = '0.8rem';
                errorMsg.style.marginTop = '0.3rem';
                emailField.parentNode.insertBefore(errorMsg, emailField.nextSibling);
            }
        }
        
        return isValid;
    }
    
    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Phone number formatting
    const phoneInput = document.getElementById('contact-phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9+]/g, '');
        });
    }
    
    // Emergency button animation
    const emergencyBtn = document.querySelector('.emergency-btn');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        emergencyBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Map interaction
    const mapLink = document.querySelector('.map-link');
    if (mapLink) {
        mapLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Redirecting to Google Maps with our location');
            // In production, this would actually open the map link
        });
    }
});
