document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navbar.classList.toggle('active');
    });
    
    // Close menu when clicking on links (mobile only)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navbar.classList.remove('active');
            }
        });
    });
    
    // Hide "Call" text on small screens
    function handleCallText() {
        const callText = document.querySelector('.call-text');
        if (window.innerWidth <= 480) {
            callText.style.display = 'none';
        } else {
            callText.style.display = 'inline';
        }
    }
    
    // Run on load and resize
    handleCallText();
    window.addEventListener('resize', handleCallText);
});
