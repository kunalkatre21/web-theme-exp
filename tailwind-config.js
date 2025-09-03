// Configure Tailwind with comprehensive theme system
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'bg-primary': 'var(--bg-primary)',
                'bg-secondary': 'var(--bg-secondary)',
                'bg-tertiary': 'var(--bg-tertiary)',
                'bg-card': 'var(--bg-card)',
                'bg-card-hover': 'var(--bg-card-hover)',
                'bg-glass': 'var(--bg-glass)',
                'text-primary': 'var(--text-primary)',
                'text-secondary': 'var(--text-secondary)',
                'text-tertiary': 'var(--text-tertiary)',
                'text-accent': '#3b82f6',
                'border-primary': 'var(--border-primary)',
                'border-secondary': 'var(--border-secondary)',
                'border-accent': '#1d4ed8',

                // Theme-aware accent colors (adapt based on light/dark theme)
                'text-emerald-theme': 'var(--text-emerald-theme)',
                'text-blue-theme': 'var(--text-blue-theme)',
                'text-purple-theme': 'var(--text-purple-theme)',
                'text-indigo-theme': 'var(--text-indigo-theme)',
                'text-sky-theme': 'var(--text-sky-theme)',
                'text-teal-theme': 'var(--text-teal-theme)',
                'text-cyan-theme': 'var(--text-cyan-theme)',

                // Background variants for theme-aware colors
                'bg-emerald-theme': 'var(--bg-emerald-theme)',
                'bg-blue-theme': 'var(--bg-blue-theme)',
                'bg-purple-theme': 'var(--bg-purple-theme)',
                'bg-indigo-theme': 'var(--bg-indigo-theme)',
                'bg-sky-theme': 'var(--bg-sky-theme)',

                // Border variants for theme-aware colors
                'border-emerald-theme': 'var(--border-emerald-theme)',
                'border-blue-theme': 'var(--border-blue-theme)',
                'border-purple-theme': 'var(--border-purple-theme)',
                'border-indigo-theme': 'var(--border-indigo-theme)',
                'border-sky-theme': 'var(--border-sky-theme)',
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)',
                'gradient-secondary': 'linear-gradient(135deg, #1e40af, #7c3aed, #0891b2)',
                'gradient-overlay-left': 'linear-gradient(to right, var(--gradient-overlay-left-bg) 0%, var(--gradient-overlay-left-bg-transparent) 50%, transparent 100%)',
                'gradient-overlay-right': 'linear-gradient(to left, var(--gradient-overlay-right-bg) 0%, var(--gradient-overlay-right-bg-transparent) 50%, transparent 100%)',
                'gradient-radial-1': 'var(--bg-gradient-radial-1)',
                'gradient-radial-2': 'var(--bg-gradient-radial-2)',
                'gradient-radial-3': 'var(--bg-gradient-radial-3)',
            },
            boxShadow: {
                'glass': '0 8px 32px var(--shadow-primary), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                'glass-hover': '0 12px 40px var(--shadow-secondary), inset 0 1px 0 rgba(255, 255, 255, 1)',
            }
        }
    },
    plugins: [
        function({ addUtilities }) {
            const rotateXUtilities = {};
            const rotateYUtilities = {};
            const rotateZUtilities = {};
            const rotateValues = [0, 5, 10, 15, 20, 30, 45, 75];

            // Generate rotate-x utilities
            rotateValues.forEach((value) => {
                rotateXUtilities[`.rotate-x-${value}`] = {
                    '--tw-rotate-x': `${value}deg`,
                    transform: `
                        translate3d(var(--tw-translate-x, 0), var(--tw-translate-y, 0), var(--tw-translate-z, 0))
                        rotateX(var(--tw-rotate-x, 0))
                        rotateY(var(--tw-rotate-y, 0))
                        rotateZ(var(--tw-rotate-z, 0))
                        skewX(var(--tw-skew-x, 0))
                        skewY(var(--tw-skew-y, 0))
                        scaleX(var(--tw-scale-x, 1))
                        scaleY(var(--tw-scale-y, 1))
                    `.replace(/\s+/g, ' ').trim(),
                };

                if (value !== 0) {
                    rotateXUtilities[`.-rotate-x-${value}`] = {
                        '--tw-rotate-x': `-${value}deg`,
                        transform: `
                            translate3d(var(--tw-translate-x, 0), var(--tw-translate-y, 0), var(--tw-translate-z, 0))
                            rotateX(var(--tw-rotate-x, 0))
                            rotateY(var(--tw-rotate-y, 0))
                            rotateZ(var(--tw-rotate-z, 0))
                            skewX(var(--tw-skew-x, 0))
                            skewY(var(--tw-skew-y, 0))
                            scaleX(var(--tw-scale-x, 1))
                            scaleY(var(--tw-scale-y, 1))
                        `.replace(/\s+/g, ' ').trim(),
                    };
                }
            });

            // Generate rotate-y utilities
            rotateValues.forEach((value) => {
                rotateYUtilities[`.rotate-y-${value}`] = {
                    '--tw-rotate-y': `${value}deg`,
                    transform: `
                        translate3d(var(--tw-translate-x, 0), var(--tw-translate-y, 0), var(--tw-translate-z, 0))
                        rotateX(var(--tw-rotate-x, 0))
                        rotateY(var(--tw-rotate-y, 0))
                        rotateZ(var(--tw-rotate-z, 0))
                        skewX(var(--tw-skew-x, 0))
                        skewY(var(--tw-skew-y, 0))
                        scaleX(var(--tw-scale-x, 1))
                        scaleY(var(--tw-scale-y, 1))
                    `.replace(/\s+/g, ' ').trim(),
                };

                if (value !== 0) {
                    rotateYUtilities[`.-rotate-y-${value}`] = {
                        '--tw-rotate-y': `-${value}deg`,
                        transform: `
                            translate3d(var(--tw-translate-x, 0), var(--tw-translate-y, 0), var(--tw-translate-z, 0))
                            rotateX(var(--tw-rotate-x, 0))
                            rotateY(var(--tw-rotate-y, 0))
                            rotateZ(var(--tw-rotate-z, 0))
                            skewX(var(--tw-skew-x, 0))
                            skewY(var(--tw-skew-y, 0))
                            scaleX(var(--tw-scale-x, 1))
                            scaleY(var(--tw-scale-y, 1))
                        `.replace(/\s+/g, ' ').trim(),
                    };
                }
            });

            // Generate rotate-z utilities
            rotateValues.forEach((value) => {
                rotateZUtilities[`.rotate-z-${value}`] = {
                    '--tw-rotate-z': `${value}deg`,
                    transform: `
                        translate3d(var(--tw-translate-x, 0), var(--tw-translate-y, 0), var(--tw-translate-z, 0))
                        rotateX(var(--tw-rotate-x, 0))
                        rotateY(var(--tw-rotate-y, 0))
                        rotateZ(var(--tw-rotate-z, 0))
                        skewX(var(--tw-skew-x, 0))
                        skewY(var(--tw-skew-y, 0))
                        scaleX(var(--tw-scale-x, 1))
                        scaleY(var(--tw-scale-y, 1))
                    `.replace(/\s+/g, ' ').trim(),
                };

                if (value !== 0) {
                    rotateZUtilities[`.-rotate-z-${value}`] = {
                        '--tw-rotate-z': `-${value}deg`,
                        transform: `
                            translate3d(var(--tw-translate-x, 0), var(--tw-translate-y, 0), var(--tw-translate-z, 0))
                            rotateX(var(--tw-rotate-x, 0))
                            rotateY(var(--tw-rotate-y, 0))
                            rotateZ(var(--tw-rotate-z, 0))
                            skewX(var(--tw-skew-x, 0))
                            skewY(var(--tw-skew-y, 0))
                            scaleX(var(--tw-scale-x, 1))
                            scaleY(var(--tw-scale-y, 1))
                        `.replace(/\s+/g, ' ').trim(),
                    };
                }
            });

            // Perspective utilities
            const perspectiveUtilities = {
                ".perspective-none": { perspective: "none" },
                ".perspective-dramatic": { perspective: "100px" },
                ".perspective-near": { perspective: "300px" },
                ".perspective-normal": { perspective: "500px" },
                ".perspective-midrange": { perspective: "800px" },
                ".perspective-distant": { perspective: "1200px" },
            };

            // Transform style utilities
            const transformStyleUtilities = {
                ".transform-style-preserve-3d": { "transform-style": "preserve-3d" },
                ".transform-style-flat": { "transform-style": "flat" },
            };

            addUtilities({
                ...rotateXUtilities,
                ...rotateYUtilities,
                ...rotateZUtilities,
                ...perspectiveUtilities,
                ...transformStyleUtilities,
            });
        }
    ]
};
