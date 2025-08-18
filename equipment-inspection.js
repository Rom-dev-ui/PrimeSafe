document.addEventListener('DOMContentLoaded', function() {
    // Equipment card animation
    const equipmentCards = document.querySelectorAll('.equipment-card');
    equipmentCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500);
    });

    // NDT technique interaction
    const techniques = document.querySelectorAll('.technique');
    techniques.forEach(tech => {
        tech.addEventListener('mouseenter', function() {
            this.querySelector('h3').style.color = var(--secondary-color);
        });
        
        tech.addEventListener('mouseleave', function() {
            this.querySelector('h3').style.color = var(--primary-color);
        });
    });

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

    // Certification badge animation
    const badges = document.querySelectorAll('.badge-grid img');
    const badgeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0.8';
                    entry.target.style.filter = 'grayscale(100%)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    badges.forEach(badge => {
        badge.style.opacity = '0';
        badge.style.filter = 'grayscale(100%)';
        badge.style.transition = 'all 0.5s ease';
        badgeObserver.observe(badge);
    });
});
