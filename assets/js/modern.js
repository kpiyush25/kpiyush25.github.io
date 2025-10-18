// Modern Website JavaScript with Dark Mode and Enhanced UX

class ModernWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupScrollProgress();
        this.setupBackToTop();
        this.setupSmoothScrolling();
        this.setupSearch();
        this.setupAnimations();
        this.setupMobileMenu();
        this.setupResponsiveNavigation();
        this.loadTheme();
    }

    // Dark Mode Toggle
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update toggle button text
        const toggleText = document.querySelector('.theme-toggle .text');
        const toggleIcon = document.querySelector('.theme-toggle .icon');
        
        if (newTheme === 'dark') {
            toggleText.textContent = 'Light Mode';
            toggleIcon.innerHTML = '☀️';
        } else {
            toggleText.textContent = 'Dark Mode';
            toggleIcon.innerHTML = '🌙';
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Update toggle button
        const toggleText = document.querySelector('.theme-toggle .text');
        const toggleIcon = document.querySelector('.theme-toggle .icon');
        
        if (savedTheme === 'dark') {
            toggleText.textContent = 'Light Mode';
            toggleIcon.innerHTML = '☀️';
        } else {
            toggleText.textContent = 'Dark Mode';
            toggleIcon.innerHTML = '🌙';
        }
    }

    // Scroll Progress Bar
    setupScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    // Back to Top Button
    setupBackToTop() {
        const backToTop = document.createElement('div');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '↑';
        document.body.appendChild(backToTop);

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('#header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Search Functionality
    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                this.performSearch(searchTerm);
            });
        }
    }

    performSearch(searchTerm) {
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const content = section.textContent.toLowerCase();
            const isVisible = content.includes(searchTerm) || searchTerm === '';
            
            if (isVisible) {
                section.style.display = 'block';
                section.classList.add('loading');
            } else {
                section.style.display = 'none';
            }
        });
    }

    // Animations
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loading');
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        const animatedElements = document.querySelectorAll('section, .card, .image');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Mobile Menu
    setupMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const sidebar = document.querySelector('#sidebar');
        
        // Create backdrop element
        const backdrop = document.createElement('div');
        backdrop.className = 'mobile-menu-backdrop';
        document.body.appendChild(backdrop);
        
        if (mobileMenuToggle && sidebar) {
            mobileMenuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
                mobileMenuToggle.classList.toggle('active');
                backdrop.classList.toggle('active');
            });
            
            // Close menu when backdrop is clicked
            backdrop.addEventListener('click', () => {
                sidebar.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                backdrop.classList.remove('active');
            });
        }
    }

    // Responsive Navigation
    setupResponsiveNavigation() {
        const sidebar = document.getElementById('sidebar');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResponsiveLayout();
        });
        
        // Handle sidebar link clicks on mobile
        if (sidebar) {
            const sidebarLinks = sidebar.querySelectorAll('nav ul li a');
            sidebarLinks.forEach(link => {
                link.addEventListener('click', () => {
                    // Close mobile menu when link is clicked
                    if (window.innerWidth < 1024) {
                        sidebar.classList.remove('active');
                        if (mobileMenuToggle) {
                            mobileMenuToggle.classList.remove('active');
                        }
                        // Also close backdrop
                        const backdrop = document.querySelector('.mobile-menu-backdrop');
                        if (backdrop) {
                            backdrop.classList.remove('active');
                        }
                    }
                });
            });
        }
        
        // Initial layout setup
        this.handleResponsiveLayout();
    }

    handleResponsiveLayout() {
        const sidebar = document.getElementById('sidebar');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const backdrop = document.querySelector('.mobile-menu-backdrop');
        
        if (window.innerWidth >= 1024) {
            // Desktop layout
            if (sidebar) {
                sidebar.classList.remove('active');
            }
            if (mobileMenuToggle) {
                mobileMenuToggle.style.display = 'none';
            }
            if (backdrop) {
                backdrop.classList.remove('active');
            }
        } else {
            // Mobile/tablet layout
            if (mobileMenuToggle) {
                mobileMenuToggle.style.display = 'flex';
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModernWebsite();
});

// Add loading animation to page elements
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
}); 