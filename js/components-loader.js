// Component Loader - Loads navigation and footer components
document.addEventListener('DOMContentLoaded', function () {
    // Determine if we're in the root or pages directory
    const isRootPage = window.location.pathname.endsWith('index.html') ||
        window.location.pathname.endsWith('/') ||
        !window.location.pathname.includes('/pages/');

    const basePath = isRootPage ? './' : '../';

    // Load Navigation
    fetch(basePath + 'components/nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data;

            // Update navigation links for pages directory
            if (!isRootPage) {
                const navLinks = document.querySelectorAll('.nav-links a');
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === 'index.html') {
                        link.setAttribute('href', '../index.html');
                    } else if (href && href.startsWith('pages/')) {
                        link.setAttribute('href', href.replace('pages/', ''));
                    }
                });

                // Update logo link for pages directory
                const logo = document.querySelector('.logo h1');
                if (logo) {
                    logo.style.cursor = 'pointer';
                    logo.addEventListener('click', () => {
                        window.location.href = '../index.html';
                    });
                }
            }

            // Set active nav link based on current page
            setActiveNavLink();
        })
        .catch(error => console.error('Error loading navigation:', error));

    // Load Footer
    fetch(basePath + 'components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;

            // Update footer links for root page
            if (isRootPage) {
                const footerLinks = document.querySelectorAll('.footer-section ul li a');
                footerLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href && href.startsWith('../')) {
                        link.setAttribute('href', href.replace('../', ''));
                    }
                    if (href === '../index.html') {
                        link.setAttribute('href', 'index.html');
                    }
                });
            }
        })
        .catch(error => console.error('Error loading footer:', error));

    // Console message for developers
    console.log('🔥 Welcome to Legends Flames! 🔥');
    console.log('Interested in joining our team? Contact us at contact@legendsflames.com');
});

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.classList.remove('active');

        const href = link.getAttribute('href');

        // Check if this is the current page
        if (currentPage.endsWith(href) ||
            (currentPage.endsWith('/') && href === 'index.html') ||
            (currentPage.includes('index.html') && href === 'index.html') ||
            (currentPage.includes('games.html') && href.includes('games.html')) ||
            (currentPage.includes('merchandise.html') && href.includes('merchandise.html')) ||
            (currentPage.includes('about.html') && href.includes('about.html'))) {
            link.classList.add('active');
        }
    });
}
