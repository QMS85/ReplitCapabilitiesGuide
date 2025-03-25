document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Active section highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function highlightNavLink() {
        const scrollPosition = window.scrollY;
        
        // Get the current scroll position
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`).classList.add('active');
            }
        });
    }

    // Add smooth scrolling to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // Listen for scroll events
    window.addEventListener('scroll', highlightNavLink);

    // Initial highlight check
    highlightNavLink();

    // Card interaction effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('no-hover')) {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('no-hover')) {
                this.style.transform = '';
                this.style.boxShadow = '';
            }
        });
    });

    // Accordion auto-collapse other items
    const accordionItems = document.querySelectorAll('.accordion-collapse');
    accordionItems.forEach(item => {
        item.addEventListener('show.bs.collapse', function() {
            const parent = this.closest('.accordion');
            const openItems = parent.querySelectorAll('.accordion-collapse.show');
            openItems.forEach(openItem => {
                if (openItem !== this) {
                    bootstrap.Collapse.getInstance(openItem).hide();
                }
            });
        });
    });

    // Back to top button functionality
    const createBackToTopButton = () => {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.classList.add('btn', 'btn-primary', 'back-to-top');
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.display = 'none';
        button.style.zIndex = '1000';
        button.style.width = '50px';
        button.style.height = '50px';
        button.style.borderRadius = '50%';
        button.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(button);
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });
    };
    
    createBackToTopButton();

    // Integration search functionality
    const setupSearch = () => {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search integrations...';
        searchInput.classList.add('form-control', 'mb-3');
        
        const integrationsSection = document.querySelector('#integrations');
        const sectionHeader = integrationsSection.querySelector('h2');
        
        integrationsSection.insertBefore(searchInput, sectionHeader.nextSibling);
        
        const listItems = integrationsSection.querySelectorAll('.list-group-item');
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            listItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    };
    
    setupSearch();

    // Toggle dark mode functionality
    const setupDarkModeToggle = () => {
        const toggle = document.createElement('button');
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
        toggle.classList.add('btn', 'btn-sm', 'btn-outline-secondary', 'ms-2');
        toggle.setAttribute('title', 'Toggle Dark Mode');
        toggle.setAttribute('id', 'darkModeToggle');
        
        const navbar = document.querySelector('.navbar-nav');
        navbar.parentNode.appendChild(toggle);
        
        let isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        const enableDarkMode = () => {
            document.body.classList.add('dark-mode');
            toggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('darkMode', 'true');
            isDarkMode = true;
            
            // Add dark mode styles
            const style = document.createElement('style');
            style.id = 'darkModeStyles';
            style.innerHTML = `
                body.dark-mode {
                    background-color: #121212;
                    color: #e0e0e0;
                }
                body.dark-mode .card {
                    background-color: #1e1e1e;
                    border-color: #333;
                }
                body.dark-mode .card-header {
                    background-color: #2d2d2d;
                    border-color: #333;
                }
                body.dark-mode .list-group-item {
                    background-color: #1e1e1e;
                    border-color: #333;
                    color: #e0e0e0;
                }
                body.dark-mode .bg-light {
                    background-color: #1e1e1e !important;
                }
                body.dark-mode .text-dark {
                    color: #e0e0e0 !important;
                }
                body.dark-mode .border {
                    border-color: #333 !important;
                }
                body.dark-mode .accordion-button {
                    background-color: #2d2d2d;
                    color: #e0e0e0;
                }
                body.dark-mode .accordion-button:not(.collapsed) {
                    background-color: #3d3d3d;
                    color: #ffffff;
                }
                body.dark-mode .accordion-body {
                    background-color: #1e1e1e;
                    color: #e0e0e0;
                }
            `;
            document.head.appendChild(style);
        };
        
        const disableDarkMode = () => {
            document.body.classList.remove('dark-mode');
            toggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('darkMode', 'false');
            isDarkMode = false;
            
            const darkModeStyles = document.getElementById('darkModeStyles');
            if (darkModeStyles) {
                darkModeStyles.remove();
            }
        };
        
        if (isDarkMode) {
            enableDarkMode();
        }
        
        toggle.addEventListener('click', () => {
            if (isDarkMode) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
    };
    
    setupDarkModeToggle();
});
