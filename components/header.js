// Header Component Loader
class HeaderComponent {
    constructor() {
        this.loaded = false;
        this.headerHTML = `
<header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b fade-in bg-bg-secondary border-border-primary shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
            <!-- Logo Section -->
            <a href="#" class="flex items-center hover-lift text-text-primary">
                <img src="https://cdn.prod.website-files.com/64d0bd8b475d468c8b1aa632/68ad4ddd03888c7fc6b9b036_eka-black-logo.svg" alt="Eka Care" class="h-8 brightness-0">
            </a>

            <!-- Navigation -->
            <nav class="hidden lg:flex gap-8 items-center">
                <!-- Product Suite Dropdown -->
                <div class="relative group">
                    <button class="flex items-center gap-1 text-sm font-medium transition-colors duration-200 text-text-secondary hover:text-text-primary">
                        Product suite
                        <svg class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="absolute top-full left-0 mt-2 w-48 bg-bg-card border border-border-primary rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div class="py-2">
                            <a href="#" class="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary">Eka EMR</a>
                            <a href="#" class="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary">Eka Scribe</a>
                            <a href="#" class="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary">Eka PHR</a>
                        </div>
                    </div>
                </div>

                <!-- Solutions Dropdown -->
                <div class="relative group">
                    <button class="flex items-center gap-1 text-sm font-medium transition-colors duration-200 text-text-secondary hover:text-text-primary">
                        Solutions
                        <svg class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="absolute top-full left-0 mt-2 w-64 bg-bg-card border border-border-primary rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div class="py-2">
                            <a href="#" class="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary">Health AI</a>
                            <a href="#" class="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary">Assessment</a>
                            <a href="#" class="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary">EkaScribe</a>
                            <a href="#" class="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary">Medical Document Parsing</a>
                            <a href="#" class="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary">ABDM Connect</a>
                            <a href="#" class="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary">Medical Knowledge Base</a>
                            <a href="#" class="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary">Medical Records</a>
                            <a href="#" class="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary">Health Quiz</a>
                            <a href="#" class="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary">Medication Search</a>
                            <a href="#" class="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary">Appointments Management</a>
                            <a href="#" class="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary">Patient Management</a>
                        </div>
                    </div>
                </div>

                <a href="#" class="text-sm font-medium transition-colors duration-200 text-text-secondary hover:text-text-primary">Pricing</a>
                <a href="#" class="text-sm font-medium transition-colors duration-200 text-text-secondary hover:text-text-primary">Blogs</a>
                <a href="#" class="text-sm font-medium transition-colors duration-200 text-text-secondary hover:text-text-primary">Request a demo</a>
            </nav>

            <!-- Action Buttons -->
            <div class="flex gap-4 items-center">
                <!-- Theme Toggle -->
                <button type="button" class="relative w-12 h-6 bg-bg-card border border-border-primary rounded-full cursor-pointer transition-all duration-300 overflow-hidden hover:border-border-secondary group" id="theme-toggle" aria-label="Toggle theme">
                    <div class="absolute top-0.5 left-0.5 w-5 h-5 bg-gradient-primary rounded-full transition-transform duration-300 group-[.dark]:translate-x-6"></div>
                    <svg class="sun-icon absolute top-1/2 left-1 -translate-y-1/2 w-4 h-4 transition-opacity duration-300 opacity-100 dark:opacity-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="5"></circle>
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
                    </svg>
                    <svg class="moon-icon absolute top-1/2 right-0 -translate-y-1/2 w-4 h-4 transition-opacity duration-300 opacity-0 dark:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </button>

                <!-- Log in Button -->
                <button type="button" class="text-sm font-medium transition-colors duration-200 text-text-secondary hover:text-text-primary px-4 py-2 rounded-lg hover:bg-bg-card">
                    Log in
                </button>

                <!-- Get started Button (Emphasized) -->
                <button class="group relative inline-flex min-w-[140px] cursor-pointer transition-all duration-300 ease-out hover:-translate-y-[2px] hover:scale-[1.02] font-semibold tracking-tight rounded-full pt-[12px] pr-[20px] pb-[12px] pl-[20px] items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-500 text-white shadow-lg hover:shadow-xl border-0">
                    <span class="relative z-10 font-medium">Get started</span>
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-700 to-cyan-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
            </div>
        </div>
    </div>
</header>`;
    }

    // Load header component
    async load() {
        try {
            if (this.loaded) {
                console.log('Header component already loaded');
                return true;
            }

            const target = document.querySelector('#header-placeholder');

            if (!target) {
                throw new Error('Header placeholder element not found');
            }

            target.innerHTML = this.headerHTML;
            this.loaded = true;

            console.log('Header component loaded successfully');
            return true;

        } catch (error) {
            console.error('Error loading header component:', error);
            return false;
        }
    }

    // Initialize on DOM ready
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.load());
        } else {
            this.load();
        }
    }

    // Check if header is loaded
    isLoaded() {
        return this.loaded;
    }
}

// Initialize header component
const headerComponent = new HeaderComponent();
headerComponent.init();

// Export for use in other scripts
window.HeaderComponent = HeaderComponent;
window.headerComponent = headerComponent;
