document.addEventListener('DOMContentLoaded', function() {
    // Multi-step form functionality
    const form = document.getElementById('quoteForm');
    const steps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    let currentStep = 1;

    // Initialize form
    function initForm() {
        steps.forEach(step => {
            step.style.display = 'none';
        });
        document.querySelector(`.form-step[data-step="1"]`).style.display = 'block';
        updateProgress();
    }

    // Update progress bar
    function updateProgress() {
        const progress = (currentStep / steps.length) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Step ${currentStep} of ${steps.length}`;
    }

    // Next button click handler
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                document.querySelector(`.form-step[data-step="${currentStep}"]`).style.display = 'none';
                currentStep++;
                document.querySelector(`.form-step[data-step="${currentStep}"]`).style.display = 'block';
                updateProgress();
                scrollToTop();
            }
        });
    });

    // Previous button click handler
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            document.querySelector(`.form-step[data-step="${currentStep}"]`).style.display = 'none';
            currentStep--;
            document.querySelector(`.form-step[data-step="${currentStep}"]`).style.display = 'block';
            updateProgress();
            scrollToTop();
        });
    });

    // Form validation
    function validateStep(step) {
        let isValid = true;
        const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');

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

        return isValid;
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateStep(currentStep)) {
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                form.style.display = 'none';
                document.querySelector('.form-success').style.display = 'block';
                scrollToTop();
                
                // Here you would typically send the form data to your server
                const formData = new FormData(form);
                console.log('Form data:', Object.fromEntries(formData));
            }, 1000);
        }
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentNode;
            item.classList.toggle('active');
        });
    });

    // Scroll to top of form
    function scrollToTop() {
        window.scrollTo({
            top: form.offsetTop - 100,
            behavior: 'smooth'
        });
    }

    // Initialize the form
    initForm();
});
