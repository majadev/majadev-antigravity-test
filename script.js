document.addEventListener('DOMContentLoaded', () => {

    /* 
       ==============================
       PARALLAX SCROLL EFFECT
       ==============================
    */
    const parallaxLayers = document.querySelectorAll('.layer');

    // Efficient scroll handling with requestAnimationFrame
    let ticking = false;
    let lastScrollY = window.scrollY;

    const updateParallax = () => {
        parallaxLayers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed')) || 0.5;
            // Calculate a subtler movement for elegant parallax feel
            const yPos = lastScrollY * speed;
            layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Initial call to set positions correctly on load
    updateParallax();

    /* 
       ==============================
       MICRO-ANIMATIONS (Intersection Observer)
       ==============================
    */
    const animatedElements = document.querySelectorAll('.fade-in-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animating once for better performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    // STICKY HEADER EFFECT
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        // Om vi har skrollat mer än 50px från toppen
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

});
