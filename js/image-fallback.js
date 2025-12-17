// Image Fallback Handler - Replaces broken images with placeholder
document.addEventListener('DOMContentLoaded', function () {
    // Determine if we're in the root or pages directory
    const isRootPage = window.location.pathname.endsWith('index.html') ||
        window.location.pathname.endsWith('/') ||
        !window.location.pathname.includes('/pages/');

    const placeholderPath = isRootPage ? 'assets/Placeholder.png' : '../assets/Placeholder.png';

    // Function to handle image error
    function handleImageError(img) {
        // Only replace if it's not already the placeholder
        if (!img.src.includes('Placeholder.png')) {
            img.src = placeholderPath;
            img.alt = 'Placeholder Image';
            // Add a class to identify placeholder images
            img.classList.add('fallback-image');
        }
    }

    // Add error handlers to all existing images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Check if image is already loaded and failed
        if (img.complete && img.naturalHeight === 0) {
            handleImageError(img);
        }
        // Add error handler for future load failures
        img.addEventListener('error', function () {
            handleImageError(this);
        });
    });

    // Observer for dynamically added images
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (node) {
                if (node.nodeName === 'IMG') {
                    node.addEventListener('error', function () {
                        handleImageError(this);
                    });
                } else if (node.querySelectorAll) {
                    const imgs = node.querySelectorAll('img');
                    imgs.forEach(img => {
                        img.addEventListener('error', function () {
                            handleImageError(this);
                        });
                    });
                }
            });
        });
    });

    // Start observing the document for dynamically added images
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
