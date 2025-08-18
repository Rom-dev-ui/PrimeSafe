document.addEventListener('DOMContentLoaded', function() {
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const method = this.parentElement;
            method.classList.toggle('active');
            
            // Close other open accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.parentElement.classList.remove('active');
                }
            });
        });
    });

    // Equipment Carousel
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;
    const itemWidth = 100; // Percentage
    
    function updateCarousel() {
        carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
    }
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel();
    });
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel();
    });
    
    // Touch support for carousel
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselTrack.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    carouselTrack.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            // Swipe left
            currentIndex = (currentIndex + 1) % carouselItems.length;
            updateCarousel();
        } else if (touchEndX > touchStartX + threshold) {
            // Swipe right
            currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
            updateCarousel();
        }
    }

    // Animate scrolling tech labels
    const scrollingTech = document.querySelector('.scrolling-tech');
    const techLabels = scrollingTech.querySelectorAll('span');
    const containerWidth = scrollingTech.offsetWidth;
    
    function calculateTotalWidth() {
        let totalWidth = 0;
        techLabels.forEach(label => {
            totalWidth += label.offsetWidth + 12; // 12px for margin
        });
        return totalWidth;
    }
    
    const totalWidth = calculateTotalWidth();
    const animationDuration = totalWidth * 20; // Adjust speed
    
    scrollingTech.style.animationDuration = `${animationDuration}ms`;
    
    // Pause animation on hover
    scrollingTech.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    scrollingTech.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
});
