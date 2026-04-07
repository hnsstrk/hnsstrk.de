document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const switcher = document.getElementById('theme-switcher');
    const buttons = switcher ? switcher.querySelectorAll('button') : [];
    const indicator = switcher ? switcher.querySelector('.theme-indicator') : null;
    const THEMES = ['light', 'mirage', 'dark'];

    function setTheme(theme, save = true) {
        root.setAttribute('data-theme', theme);
        if (save) localStorage.setItem('theme', theme);

        // Update active states
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-theme-value') === theme);
        });

        // Slide indicator to active button position
        if (indicator) {
            const index = THEMES.indexOf(theme);
            // Each button is 36px wide + 2px gap = 38px offset per step
            indicator.style.transform = `translateX(${index * 38}px)`;
        }

        // Notify other components (e.g. Board)
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    }

    // Init: saved > system preference > light
    const saved = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

    if (saved && THEMES.includes(saved)) {
        setTheme(saved, false);
    } else {
        setTheme(systemDark.matches ? 'mirage' : 'light', false);
    }

    // Listen for system preference changes (only if user hasn't manually chosen)
    systemDark.addEventListener('change', () => {
        if (!localStorage.getItem('theme')) {
            setTheme(systemDark.matches ? 'mirage' : 'light', false);
        }
    });

    // Direct click on each theme button
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme-value');
            if (theme && THEMES.includes(theme)) {
                setTheme(theme);
            }
        });
    });
});
