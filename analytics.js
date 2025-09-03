// Performance-optimized Analytics Configuration
class EkaAnalytics {
    constructor() {
        this.initialized = false;
        this.queue = [];
        this.config = {
            measurementId: 'G-03QW79K0C2', // Replace with your GA4 Measurement ID
            debug: false,
            privacy: {
                anonymizeIP: true,
                allowAdFeatures: false,
                sendPageView: true
            }
        };

        this.init();
    }

    // Async loading to prevent performance impact
    init() {
        if (this.initialized) return;

        // Load Google Analytics asynchronously
        this.loadGAScript();

        // Initialize tracking after script loads
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() {
            window.dataLayer.push(arguments);
        };

        this.initialized = true;
        this.flushQueue();

        // Track initial page view
        this.trackPageView();

        // Track performance metrics
        this.trackPerformance();

        // Track user journey
        this.trackUserJourney();
    }

    loadGAScript() {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.measurementId}`;
        document.head.appendChild(script);

        script.onload = () => {
            window.gtag('js', new Date());
            window.gtag('config', this.config.measurementId, {
                anonymize_ip: this.config.privacy.anonymizeIP,
                allow_ad_features: this.config.privacy.allowAdFeatures,
                send_page_view: this.config.privacy.sendPageView,
                custom_map: {
                    'custom_parameter_1': 'user_role',
                    'custom_parameter_2': 'feature_interest',
                    'custom_parameter_3': 'engagement_level'
                }
            });
        };
    }

    // Queue events if analytics isn't ready yet
    queueEvent(eventName, parameters = {}) {
        if (!this.initialized) {
            this.queue.push({ eventName, parameters });
        } else {
            this.trackEvent(eventName, parameters);
        }
    }

    flushQueue() {
        while (this.queue.length > 0) {
            const event = this.queue.shift();
            this.trackEvent(event.eventName, event.parameters);
        }
    }

    trackEvent(eventName, parameters = {}) {
        if (typeof window.gtag !== 'undefined') {
            window.gtag('event', eventName, {
                ...parameters,
                timestamp: new Date().toISOString(),
                page_location: window.location.href,
                page_title: document.title
            });
        }
    }

    trackPageView() {
        this.trackEvent('page_view', {
            page_title: document.title,
            page_location: window.location.href,
            healthcare_context: 'eka_platform_landing'
        });
    }

    // Track user interactions specific to healthcare platform
    trackUserInteractions() {
        // Track CTA button clicks
        document.querySelectorAll('.cursor-follow-cta').forEach(button => {
            button.addEventListener('click', () => {
                this.trackEvent('cta_click', {
                    button_text: button.textContent.trim(),
                    button_location: 'hero_section',
                    user_intent: 'provider_signup'
                });
            });
        });

        // Track platform demo interactions
        const demoButton = document.querySelector('button[title*="Demo"]');
        if (demoButton) {
            demoButton.addEventListener('click', () => {
                this.trackEvent('demo_request', {
                    demo_type: 'platform_video',
                    user_type: 'potential_provider'
                });
            });
        }

        // Track healthcare role selection
        document.querySelectorAll('[data-tab]').forEach(tab => {
            tab.addEventListener('click', () => {
                this.trackEvent('role_selection', {
                    selected_role: tab.getAttribute('data-tab'),
                    selection_method: 'tab_click'
                });
            });
        });

        // Track feature card interactions
        document.querySelectorAll('[class*="group relative"]').forEach(card => {
            card.addEventListener('click', () => {
                const featureTitle = card.querySelector('h3')?.textContent;
                if (featureTitle) {
                    this.trackEvent('feature_exploration', {
                        feature_name: featureTitle.trim(),
                        interaction_type: 'card_click'
                    });
                }
            });
        });

        // Track scroll depth
        this.trackScrollDepth();

        // Track time on page
        this.trackTimeOnPage();
    }

    trackScrollDepth() {
        let maxScroll = 0;
        const scrollThresholds = [25, 50, 75, 90, 100];
        const trackedThresholds = new Set();

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.round((scrollTop / docHeight) * 100);

            maxScroll = Math.max(maxScroll, scrollPercent);

            scrollThresholds.forEach(threshold => {
                if (maxScroll >= threshold && !trackedThresholds.has(threshold)) {
                    trackedThresholds.add(threshold);
                    this.trackEvent('scroll_depth', {
                        scroll_percentage: threshold,
                        max_scroll_reached: maxScroll
                    });
                }
            });
        });
    }

    trackTimeOnPage() {
        let startTime = Date.now();
        let timeTracked = new Set();

        const timeIntervals = [30, 60, 120, 300]; // seconds

        const timeTracker = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);

            timeIntervals.forEach(interval => {
                if (elapsed >= interval && !timeTracked.has(interval)) {
                    timeTracked.add(interval);
                    this.trackEvent('time_on_page', {
                        seconds_elapsed: interval,
                        engagement_level: interval > 120 ? 'high' : interval > 60 ? 'medium' : 'low'
                    });
                }
            });
        }, 10000); // Check every 10 seconds

        // Clear interval when user leaves
        window.addEventListener('beforeunload', () => {
            clearInterval(timeTracker);
        });
    }

    trackPerformance() {
        // Track Core Web Vitals
        if ('web-vitals' in window) {
            import('https://unpkg.com/web-vitals@3?module').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(cls => this.trackEvent('web_vitals_cls', { value: cls.value }));
                getFID(fid => this.trackEvent('web_vitals_fid', { value: fid.value }));
                getFCP(fcp => this.trackEvent('web_vitals_fcp', { value: fcp.value }));
                getLCP(lcp => this.trackEvent('web_vitals_lcp', { value: lcp.value }));
                getTTFB(ttfb => this.trackEvent('web_vitals_ttfb', { value: ttfb.value }));
            });
        }

        // Track page load performance
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    this.trackEvent('page_load_performance', {
                        dom_content_loaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                        load_complete: perfData.loadEventEnd - perfData.loadEventStart,
                        total_load_time: perfData.loadEventEnd - perfData.fetchStart
                    });
                }
            }, 0);
        });
    }

    trackUserJourney() {
        // Track user journey through healthcare roles
        let journey = [];

        document.querySelectorAll('[data-tab]').forEach(tab => {
            tab.addEventListener('click', () => {
                const role = tab.getAttribute('data-tab');
                journey.push(role);

                this.trackEvent('healthcare_journey', {
                    current_role: role,
                    journey_path: journey.join(' -> '),
                    step_count: journey.length
                });
            });
        });

        // Track feature exploration sequence
        let featureExploration = [];
        document.querySelectorAll('[class*="group relative"]').forEach(card => {
            card.addEventListener('mouseenter', () => {
                const feature = card.querySelector('h3')?.textContent?.trim();
                if (feature && !featureExploration.includes(feature)) {
                    featureExploration.push(feature);
                    this.trackEvent('feature_discovery', {
                        feature_name: feature,
                        discovery_sequence: featureExploration.length,
                        exploration_path: featureExploration.join(' | ')
                    });
                }
            });
        });
    }

    // Privacy and consent management
    setConsent(consentGiven) {
        this.trackEvent('consent_update', {
            consent_given: consentGiven,
            privacy_focus: true,
            healthcare_compliant: true
        });

        if (typeof window.gtag !== 'undefined') {
            window.gtag('consent', 'update', {
                analytics_storage: consentGiven ? 'granted' : 'denied',
                ad_storage: 'denied', // Healthcare - no ads
                functionality_storage: 'granted',
                personalization_storage: 'denied'
            });
        }
    }
}

// Initialize analytics when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.ekaAnalytics = new EkaAnalytics();
});
