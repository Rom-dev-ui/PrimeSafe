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

    // Team member hover effects
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.querySelector('.member-info').style.backgroundColor = '#f5f7fa';
        });
        
        member.addEventListener('mouseleave', function() {
            this.querySelector('.member-info').style.backgroundColor = 'white';
        });
    });

    // Certification animation
    const certifications = document.querySelectorAll('.certification');
    certifications.forEach((cert, index) => {
        cert.style.opacity = '0';
        cert.style.transform = 'translateY(20px)';
        cert.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            cert.style.opacity = '1';
            cert.style.transform = 'translateY(0)';
        }, 500);
    });

    // Client logo animation
    const clientLogos = document.querySelectorAll('.client-logos img');
    const logoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0.7';
                    entry.target.style.filter = 'grayscale(100%)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    clientLogos.forEach(logo => {
        logo.style.opacity = '0';
        logo.style.filter = 'grayscale(100%)';
        logo.style.transition = 'all 0.5s ease';
        logoObserver.observe(logo);
    });

    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `all 0.5s ease ${index * 0.2}s`;
        timelineObserver.observe(item);
    });
});
