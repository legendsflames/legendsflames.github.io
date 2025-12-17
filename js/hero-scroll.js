// Hero Splash Screen Scroll Handler
document.addEventListener('DOMContentLoaded', function () {
    const heroOverlay = document.getElementById('hero-overlay');
    let hasScrolled = false;
    let scrollThreshold = 100; // Pixels to scroll before hiding overlay

    // Prevent body scroll initially
    document.body.style.overflow = 'hidden';

    // Function to hide the overlay
    function hideOverlay() {
        if (!hasScrolled) {
            hasScrolled = true;
            heroOverlay.classList.add('hidden');

            // Re-enable body scroll after animation
            setTimeout(() => {
                document.body.style.overflow = 'auto';
                // Remove the overlay from DOM after fade out
                setTimeout(() => {
                    if (heroOverlay.parentNode) {
                        heroOverlay.parentNode.removeChild(heroOverlay);
                    }
                }, 100);
            }, 800);
        }
    }

    // Detect scroll attempt (with overlay still visible)
    let scrollAttempts = 0;
    let isScrolling = false;

    window.addEventListener('wheel', function (e) {
        if (!hasScrolled) {
            // Add scrolling feedback class immediately
            if (!isScrolling) {
                isScrolling = true;
                heroOverlay.classList.add('scrolling');
            }

            scrollAttempts++;
            // Hide overlay after small scroll attempt
            if (scrollAttempts > 2 || Math.abs(e.deltaY) > 50) {
                hideOverlay();
            }

            // Remove scrolling class if user stops
            clearTimeout(window.scrollTimeout);
            window.scrollTimeout = setTimeout(() => {
                if (!hasScrolled) {
                    heroOverlay.classList.remove('scrolling');
                    isScrolling = false;
                }
            }, 200);
        }
    }, { passive: true });

    // Detect touch scroll on mobile
    let touchStartY = 0;
    window.addEventListener('touchstart', function (e) {
        if (!hasScrolled) {
            touchStartY = e.touches[0].clientY;
        }
    }, { passive: true });

    window.addEventListener('touchmove', function (e) {
        if (!hasScrolled) {
            const touchEndY = e.touches[0].clientY;
            const deltaY = touchStartY - touchEndY;

            // If scrolling down enough, hide overlay
            if (deltaY > 50) {
                hideOverlay();
            }
        }
    }, { passive: true });

    // Click on scroll indicator to hide overlay
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', hideOverlay);
    }

    // Optional: Press any key to dismiss (space, enter, or down arrow)
    window.addEventListener('keydown', function (e) {
        if (!hasScrolled && (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowDown')) {
            e.preventDefault();
            hideOverlay();
        }
    });

    // Auto-hide after 5 seconds if user doesn't interact
    setTimeout(() => {
        if (!hasScrolled) {
            hideOverlay();
        }
    }, 5000);
});
