// Initialize all scripts once the DOM is ready
function initializeScripts() {
    // Wait a bit longer to ensure all elements are available
    setTimeout(() => {
        // The lucide object is globally available from the script tag in index.html
        if (typeof lucide !== 'undefined') {
            try {
                lucide.createIcons();
            } catch (error) {
                console.warn('Error creating Lucide icons:', error);
            }
        }

        try {
            window.themeManager = new ThemeManager();
        } catch (error) {
            console.error('Error creating ThemeManager:', error);
            window.themeManager = null;
        }

        try {
            init3dEffect();
            initCtaCursorFollow();
            initFloatingCardEffect();
            initHealthcareTabs();

            // Initialize tracking for user interactions
            if (window.ekaAnalytics) {
                window.ekaAnalytics.trackUserInteractions();
            }
        } catch (error) {
            console.error('Error initializing effects:', error);
        }
    }, 100); // Small delay to ensure DOM is fully ready
}

// Check if DOM is already loaded
if (document.readyState === 'loading') {
    // DOM not loaded yet, wait for it
    document.addEventListener('DOMContentLoaded', initializeScripts);
} else {
    // DOM already loaded, initialize immediately
    initializeScripts();
}

// Theme Management
class ThemeManager {
    constructor() {
        // Check if DOM is ready
        if (!document.body) {
            throw new Error('DOM not ready');
        }

        this.themeToggle = document.getElementById('theme-toggle');
        this.html = document.documentElement;
        this.currentTheme = localStorage.getItem('theme') || 'dark';

        // If theme toggle button is not found, try again after a short delay
        if (!this.themeToggle) {
            setTimeout(() => {
                this.themeToggle = document.getElementById('theme-toggle');
                this.init();
            }, 50);
        } else {
            this.init();
        }
    }

    init() {
        this.setTheme(this.currentTheme);
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    setTheme(theme) {
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);

        if (theme === 'dark') {
            this.html.classList.add('dark');
            if (this.themeToggle) this.themeToggle.classList.add('dark');
        } else {
            this.html.classList.remove('dark');
            if (this.themeToggle) this.themeToggle.classList.remove('dark');
        }

        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            const color = theme === 'light' ? '#ffffff' : '#000000';
            metaThemeColor.setAttribute('content', color);
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}

// 3D Mouse tracking for main interface
function init3dEffect() {
    const container = document.getElementById('app-preview-container');
    const mainInterface = document.getElementById('main-interface');
    
    if (container && mainInterface) {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            mainInterface.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        container.addEventListener('mouseleave', () => {
            mainInterface.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }
}

// Enhanced CTA cursor follow with tracking
function initCtaCursorFollow() {
    const cursorButtons = document.querySelectorAll('.cursor-follow-cta');
    cursorButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            button.style.setProperty('--cursor-x', `${x}%`);
            button.style.setProperty('--cursor-y', `${y}%`);
        });

        // Track button hover engagement
        button.addEventListener('mouseenter', () => {
            if (window.ekaAnalytics) {
                window.ekaAnalytics.trackEvent('cta_hover', {
                    button_text: button.textContent.trim(),
                    hover_duration: 'engaged'
                });
            }
        });
    });
}

// Floating cards hover effect and visibility trigger
function initFloatingCardEffect() {
    const floatingCards = document.querySelectorAll('[id^="floating-card-"]');

    // Use Intersection Observer to trigger animations when cards come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add a small delay to ensure smooth animation
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0px)';
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    floatingCards.forEach((card) => {
        // Initially hide cards
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        // Start observing
        observer.observe(card);

        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0px) scale(1)';
        });
    });

    // Fallback: trigger animations after a delay if intersection observer doesn't work
    setTimeout(() => {
        floatingCards.forEach(card => {
            if (card.style.opacity === '0') {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0px)';
            }
        });
    }, 2000);
}

// Enhanced healthcare tabs with tracking
function initHealthcareTabs() {
    const tabContainer = document.querySelector('.hidden.sm\\:flex.justify-center');
    const mobileSelect = document.getElementById('mobile-tab-select');
    const benefitsContainer = document.querySelector('.benefits-container');
    const contentPlaceholder = document.querySelector('.aspect-square');
    const progressBarContainer = document.querySelector('.progress-bar-container');
    const progressBar = document.querySelector('.progress-bar');

    if (!benefitsContainer || (!tabContainer && !mobileSelect)) return;

    const tabButtons = tabContainer ? tabContainer.querySelectorAll('.tab-button') : [];

    // Auto-scroll configuration
    const switchInterval = 4000; // 4-second intervals for smoother experience
    let currentSubtabSwitcher = null;
    let isUserInteracting = false;
    let currentActiveTab = 'Doctor'; // Track the currently active tab

    // Enhanced tab content with sub-tabs
    const tabContent = {
        'Doctor': {
            benefits: [
                {
                    icon: 'emerald-500',
                    title: 'Prescribe in seconds, not minutes',
                    description: 'AI-powered prescription generation from voice commands',
                    iconSvg: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
                },
                {
                    icon: 'blue-500',
                    title: 'Manage patients effortlessly',
                    description: 'Unified patient management with intelligent insights',
                    iconSvg: '<path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63C19.68 7.55 18.92 7 18.09 7h-.01c-.81 0-1.28.31-1.28.97l.03.03L15.5 16H14v6h-2v-8H8v8H6V6H4v14H2v2h20v-2h-2z"/>'
                },
                {
                    icon: 'purple-500',
                    title: 'Scale with confidence',
                    description: 'Enterprise-grade security and compliance built-in',
                    iconSvg: '<path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm3 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>'
                }
            ],
            content: {
                title: 'Doctor Dashboard',
                description: 'Streamlined interface for healthcare professionals'
            }
        },
        'Hospital': {
            benefits: [
                {
                    icon: 'blue-500',
                    title: 'Hospital-wide coordination',
                    description: 'Seamless integration across all departments',
                    iconSvg: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H7v-4h4v4zm0-6H7V7h4v4zm6 6h-4v-4h4v4zm0-6h-4V7h4v4z"/>'
                },
                {
                    icon: 'emerald-500',
                    title: 'Real-time patient monitoring',
                    description: 'Advanced telemetry and alert systems',
                    iconSvg: '<path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99l1.5 1.5z"/><path fill="none" d="M0 0h24v24H0z"/>'
                },
                {
                    icon: 'purple-500',
                    title: 'Resource optimization',
                    description: 'AI-driven staffing and equipment management',
                    iconSvg: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>'
                }
            ],
            content: {
                title: 'Hospital Management',
                description: 'Comprehensive hospital administration platform'
            }
        },
        'Lab': {
            benefits: [
                {
                    icon: 'purple-500',
                    title: 'Automated test processing',
                    description: 'Streamlined lab workflow from sample to result',
                    iconSvg: '<path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>'
                },
                {
                    icon: 'emerald-500',
                    title: 'Quality control assurance',
                    description: 'Advanced analytics for accurate diagnostics',
                    iconSvg: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
                },
                {
                    icon: 'blue-500',
                    title: 'Integration ready',
                    description: 'Seamless connection with EMR and HIS systems',
                    iconSvg: '<path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z"/>'
                }
            ],
            content: {
                title: 'Lab Information System',
                description: 'Complete laboratory management solution'
            }
        },
        'Retail/Pharma': {
            benefits: [
                {
                    icon: 'blue-500',
                    title: 'Inventory intelligence',
                    description: 'Smart stock management and expiry tracking',
                    iconSvg: '<path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>'
                },
                {
                    icon: 'emerald-500',
                    title: 'Customer engagement',
                    description: 'Personalized health recommendations',
                    iconSvg: '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>'
                },
                {
                    icon: 'purple-500',
                    title: 'Regulatory compliance',
                    description: 'Automated reporting and audit trails',
                    iconSvg: '<path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm10-9h-4V9h4v2zm0 3h-4v-2h4v2zm0 3h-4v-2h4v2z"/>'
                }
            ],
            content: {
                title: 'Pharmacy Management',
                description: 'Modern retail pharmacy operations platform'
            }
        }
    };

    // Function to update active tab styling
    function updateActiveTab(activeButton, tabName = null) {
        // Update desktop tabs
        if (tabButtons.length > 0) {
            tabButtons.forEach(button => {
                button.classList.remove('bg-white', 'text-text-primary', 'shadow-sm');
                button.classList.add('text-text-secondary', 'hover:text-text-primary');
            });

            if (activeButton) {
                activeButton.classList.remove('text-text-secondary', 'hover:text-text-primary');
                activeButton.classList.add('bg-white', 'text-text-primary', 'shadow-sm');
            } else if (tabName) {
                // Find button by data-tab attribute
                const targetButton = Array.from(tabButtons).find(btn => btn.getAttribute('data-tab') === tabName);
                if (targetButton) {
                    targetButton.classList.remove('text-text-secondary', 'hover:text-text-primary');
                    targetButton.classList.add('bg-white', 'text-text-primary', 'shadow-sm');
                }
            }
        }

        // Update mobile select
        if (mobileSelect && tabName) {
            mobileSelect.value = tabName;
        }
    }

    // Function to update benefits content with progress highlighting
    function updateBenefitsContent(tabName, activeBenefitIndex = 0) {
        const benefits = tabContent[tabName].benefits;

        benefitsContainer.innerHTML = benefits.map((benefit, index) => `
            <div class="benefit-item flex items-start gap-4 p-3 rounded-lg transition-all duration-300 ${index === activeBenefitIndex ? 'bg-bg-glass' : 'hover:bg-bg-glass/50'}">
                <div class="h-8 w-8 rounded-lg bg-${benefit.icon} flex items-center justify-center flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="text-white">
                        ${benefit.iconSvg}
                    </svg>
                </div>
                <div class="flex-1">
                    <h4 class="font-semibold text-text-primary mb-1">${benefit.title}</h4>
                    <p class="text-text-secondary text-sm">${benefit.description}</p>
                </div>
            </div>
        `).join('');
    }

    // Function to update content placeholder
    function updateContentPlaceholder(tabName, activeBenefitIndex = 0) {
        const content = tabContent[tabName].content;
        const activeBenefit = tabContent[tabName].benefits[activeBenefitIndex];

        contentPlaceholder.innerHTML = `
            <div class="text-center">
                <div class="h-16 w-16 rounded-2xl bg-gradient-to-br from-${activeBenefit.icon} to-${activeBenefit.icon}/70 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" class="text-white">
                        ${activeBenefit.iconSvg}
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-text-primary mb-2">${content.title}</h3>
                <p class="text-gray-400 text-sm">${content.description}</p>
                <div class="mt-4 flex justify-center space-x-2">
                    ${tabContent[tabName].benefits.map((_, index) => `
                        <div class="w-2 h-2 rounded-full transition-all duration-300 ${index === activeBenefitIndex ? 'bg-blue-500 scale-125' : 'bg-gray-300'}"></div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Progress bar positioning function
    function updateProgressBarPosition(activeIndex) {
        if (!progressBarContainer || !progressBar) return;

        const benefitItems = benefitsContainer.querySelectorAll('.benefit-item');
        if (benefitItems.length === 0) return;

        const activeItem = benefitItems[activeIndex];
        if (!activeItem) return;

        const containerRect = benefitsContainer.getBoundingClientRect();
        const activeItemRect = activeItem.getBoundingClientRect();

        const relativeTop = activeItemRect.top - containerRect.top + 138;
        const itemHeight = activeItem.offsetHeight;

        // Position the progress bar container
        progressBarContainer.style.height = `${itemHeight}px`;
        progressBarContainer.style.top = `${relativeTop}px`;
        progressBarContainer.style.opacity = '1';

        // Animate the progress bar
        animateProgressBar();
    }

    function animateProgressBar() {
        if (!progressBar) return;

        progressBar.classList.remove('animate');
        // Force a reflow to restart the animation
        void progressBar.offsetWidth;
        progressBar.classList.add('animate');
    }

    // Auto-scrolling functionality for benefits
    function initializeAutoScroll(tabName) {
        const benefits = tabContent[tabName].benefits;
        let currentIndex = 0;
        let autoScrollInterval;

        function startAutoScroll() {
            // Set the duration for the CSS animation
            if (progressBar) {
                progressBar.style.setProperty('--duration', `${switchInterval / 1000}s`);
            }

            autoScrollInterval = setInterval(() => {
                if (!isUserInteracting) {
                    currentIndex = (currentIndex + 1) % benefits.length;
                    updateBenefitsContent(tabName, currentIndex);
                    updateContentPlaceholder(tabName, currentIndex);
                    updateProgressBarPosition(currentIndex);
                }
            }, switchInterval);
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        function resetAutoScroll() {
            stopAutoScroll();
            setTimeout(startAutoScroll, 2000); // Resume after 2 seconds of inactivity
        }

        // Add click handlers to benefit items for manual navigation
        setTimeout(() => {
            const benefitItems = benefitsContainer.querySelectorAll('.benefit-item');
            benefitItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    isUserInteracting = true;
                    currentIndex = index;
                    updateBenefitsContent(tabName, currentIndex);
                    updateContentPlaceholder(tabName, currentIndex);
                    updateProgressBarPosition(currentIndex);
                    resetAutoScroll();
                });
            });
        }, 100);

        // Initialize progress bar position and start auto-scroll
        setTimeout(() => {
            updateProgressBarPosition(0);
        }, 100);
        startAutoScroll();
        return { stop: stopAutoScroll };
    }

    // Enhanced tab switching with tracking
    function switchToTab(tabName) {
        // Stop current auto-scroll
        if (currentSubtabSwitcher) {
            currentSubtabSwitcher.stop();
        }

        // Update active tab styling
        updateActiveTab(null, tabName);

        // Update content
        updateBenefitsContent(tabName, 0);
        updateContentPlaceholder(tabName, 0);

        // Start new auto-scroll
        currentSubtabSwitcher = initializeAutoScroll(tabName);

        // Track tab switch
        if (window.ekaAnalytics) {
            window.ekaAnalytics.trackEvent('healthcare_role_switch', {
                selected_role: tabName,
                switch_method: 'user_click',
                previous_role: currentActiveTab || 'none'
            });
        }

        currentActiveTab = tabName;
    }

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            isUserInteracting = true;
            switchToTab(tabName);
            setTimeout(() => { isUserInteracting = false; }, 1000);
        });
    });

    // Add change event listener to mobile select
    if (mobileSelect) {
        mobileSelect.addEventListener('change', () => {
            const tabName = mobileSelect.value;
            isUserInteracting = true;
            switchToTab(tabName);
            setTimeout(() => { isUserInteracting = false; }, 1000);
        });
    }

    // Initialize with first tab active
    const defaultTabName = 'Doctor';
    switchToTab(defaultTabName);
}

// Add performance tracking for animations
function trackAnimationPerformance() {
    if (window.ekaAnalytics) {
        // Track when animations complete
        const animatedElements = document.querySelectorAll('[class*="fade-in"]');
        animatedElements.forEach((element, index) => {
            element.addEventListener('animationend', () => {
                window.ekaAnalytics.trackEvent('animation_complete', {
                    animation_type: 'fade_in',
                    element_position: index,
                    performance_impact: 'minimal'
                });
            });
        });
    }
}

// Initialize animation tracking
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(trackAnimationPerformance, 500);
});
