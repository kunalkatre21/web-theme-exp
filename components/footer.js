// Footer Component Loader
class FooterComponent {
    constructor() {
        this.loaded = false;
        this.footerHTML = `
<footer class="footer-branding text-white">
    <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <!-- Product Suite Section -->
            <div class="space-y-4">
                <h6 class="text-lg font-semibold text-white">Product Suite</h6>
                <div class="space-y-2">
                    <a href="emr-components.html" class="block text-gray-300 hover:text-white transition-colors">Eka EMR</a>
                    <a href="scribe-components.html" class="block text-gray-300 hover:text-white transition-colors">Eka Scribe</a>
                    <a href="phr-components.html" class="block text-gray-300 hover:text-white transition-colors">Eka PHR</a>
                </div>
            </div>

            <!-- Solutions Section -->
            <div class="space-y-4">
                <h6 class="text-lg font-semibold text-white">Solutions</h6>
                <div class="space-y-2">
                    <h6 class="text-sm font-medium text-gray-400 uppercase tracking-wide">Health AI</h6>
                    <a class="block text-gray-300 hover:text-white transition-colors ml-2">Assessment</a>
                    <a class="block text-gray-300 hover:text-white transition-colors ml-2">EkaScribe</a>

                    <h6 class="text-sm font-medium text-gray-400 uppercase tracking-wide mt-4">General Tools</h6>
                    <a class="block text-gray-300 hover:text-white transition-colors ml-2">Medical Document Parsing</a>
                    <a class="block text-gray-300 hover:text-white transition-colors ml-2">Doctor Tool</a>
                    <a class="block text-gray-300 hover:text-white transition-colors ml-2">ABDM Connect</a>
                    <a class="block text-gray-300 hover:text-white transition-colors ml-2">Medical Knowledge Base</a>
                    <a class="block text-gray-300 hover:text-white transition-colors ml-2">Medical Records</a>
                    <a class="block text-gray-300 hover:text-white transition-colors ml-2">User App</a>

                    <h6 class="text-sm font-medium text-gray-400 uppercase tracking-wide mt-4">Examples</h6>
                    <a class="block text-gray-300 hover:text-white transition-colors ml-2">Health Quiz</a>
                    <a class="block text-gray-300 hover:text-white transition-colors ml-2">Medication Search</a>
                    <a class="block text-gray-300 hover:text-white transition-colors ml-2">Appointments Management</a>
                    <a class="block text-gray-300 hover:text-white transition-colors ml-2">Patient Management Apps</a>
                </div>
            </div>

            <!-- Specialities Section -->
            <div class="space-y-4">
                <h6 class="text-lg font-semibold text-white">Specialities</h6>
                <div class="space-y-2">
                    <a href="https://www.eka.care/s/for-doctors/neurologists" target="_blank" class="block text-gray-300 hover:text-white transition-colors">Neurologists</a>
                    <a href="https://www.eka.care/s/for-doctors/dentists" target="_blank" class="block text-gray-300 hover:text-white transition-colors">Dentists</a>
                    <a href="https://www.eka.care/s/for-doctors/pediatricians" target="_blank" class="block text-gray-300 hover:text-white transition-colors">Pediatricians</a>
                    <a href="https://www.eka.care/s/for-doctors/ophthalmologists" target="_blank" class="block text-gray-300 hover:text-white transition-colors">Ophthalmologists</a>
                    <a href="https://www.eka.care/s/for-doctors/cardiologists" target="_blank" class="block text-gray-300 hover:text-white transition-colors">Cardiologists</a>
                </div>
            </div>

            <!-- Company Section -->
            <div class="space-y-4">
                <h6 class="text-lg font-semibold text-white">Company</h6>
                <div class="space-y-2">
                    <a href="index.html" class="block text-gray-300 hover:text-white transition-colors">Home</a>
                    <a class="block text-gray-300 hover:text-white transition-colors">About</a>
                    <a class="block text-gray-300 hover:text-white transition-colors">Team</a>
                    <a class="block text-gray-300 hover:text-white transition-colors">Careers</a>
                    <a class="block text-gray-300 hover:text-white transition-colors">Blogs</a>
                    <a class="block text-gray-300 hover:text-white transition-colors">Pricing</a>
                    <a class="block text-gray-300 hover:text-white transition-colors">Request a demo</a>
                </div>
            </div>

            <!-- Support & Legal Section -->
            <div class="space-y-4">
                <h6 class="text-lg font-semibold text-white">Support & Legal</h6>
                <div class="space-y-2">
                    <a class="block text-gray-300 hover:text-white transition-colors">Terms & Conditions</a>
                    <a class="block text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
                    <a class="block text-gray-300 hover:text-white transition-colors">Security</a>
                    <a class="block text-gray-300 hover:text-white transition-colors">Contact Us</a>
                    <a class="block text-gray-300 hover:text-white transition-colors">Help Center</a>
                </div>
            </div>
        </div>

        <!-- Footer Bottom -->
        <div class="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div class="flex items-center space-x-4 mb-4 md:mb-0">
                <img src="https://cdn.prod.website-files.com/64d0bd8b475d468c8b1aa632/68ad4ddd03888c7fc6b9b036_eka-black-logo.svg" alt="Eka Care" class="h-8 brightness-0 invert">
                <p class="text-gray-400">© 2024 Eka Care. All rights reserved.</p>
            </div>
            <div class="flex space-x-4">
                <a href="https://www.instagram.com/ekacarehq/" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">
                    <i class="fab fa-instagram w-5 h-5"></i>
                </a>
                <a href="https://in.linkedin.com/company/ekacare" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">
                    <i class="fab fa-linkedin w-5 h-5"></i>
                </a>
                <a href="https://www.facebook.com/ekacareHQ" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">
                    <i class="fab fa-facebook w-5 h-5"></i>
                </a>
                <a href="https://twitter.com/ekacareHQ" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">
                    <i class="fab fa-twitter w-5 h-5"></i>
                </a>
            </div>
        </div>
    </div>
</footer>`;
    }

    // Load footer component
    async load() {
        try {
            if (this.loaded) {
                console.log('Footer component already loaded');
                return true;
            }

            const target = document.querySelector('#footer-placeholder');

            if (!target) {
                throw new Error('Footer placeholder element not found');
            }

            target.innerHTML = this.footerHTML;
            this.loaded = true;

            console.log('Footer component loaded successfully');
            return true;

        } catch (error) {
            console.error('Error loading footer component:', error);
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

    // Check if footer is loaded
    isLoaded() {
        return this.loaded;
    }
}

// Initialize footer component
const footerComponent = new FooterComponent();
footerComponent.init();

// Export for use in other scripts
window.FooterComponent = FooterComponent;
window.footerComponent = footerComponent;
