document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Accordion functionality for industry cards (mobile)
    const industryCards = document.querySelectorAll('.industry-card');
    if (window.innerWidth <= 768) {
        industryCards.forEach(card => {
            const title = card.querySelector('h3');
            const content = card.querySelector('ul');
            
            title.style.cursor = 'pointer';
            content.style.display = 'none';
            
            title.addEventListener('click', () => {
                content.style.display = content.style.display === 'none' ? 'block' : 'none';
                card.classList.toggle('active');
            });
        });
    }

    // Animation for process steps
    const steps = document.querySelectorAll('.step');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    steps.forEach(step => {
        step.style.opacity = 0;
        step.style.transform = 'translateY(20px)';
        step.style.transition = 'all 0.5s ease';
        observer.observe(step);
    });
});
