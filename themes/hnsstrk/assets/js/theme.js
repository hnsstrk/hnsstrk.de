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

// Mobile: Theme-Switcher ins Nav-Dropdown verschieben
document.addEventListener('DOMContentLoaded', function() {
    const switcher = document.getElementById('theme-switcher');
    const nav = document.querySelector('.nav-links');
    const headerInner = document.querySelector('.header-inner');
    const navToggle = document.querySelector('.nav-toggle');
    if (!switcher || !nav || !headerInner) return;

    const mq = window.matchMedia('(max-width: 768px)');
    function handleMobile(e) {
        if (e.matches) {
            nav.appendChild(switcher);
        } else {
            headerInner.insertBefore(switcher, navToggle);
        }
    }
    mq.addEventListener('change', handleMobile);
    handleMobile(mq);
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav-links');
    if (toggle && nav) {
        toggle.addEventListener('click', function() {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !expanded);
            nav.classList.toggle('open');
        });
        // Schließen bei Klick auf Link
        nav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                toggle.setAttribute('aria-expanded', 'false');
                nav.classList.remove('open');
            });
        });
    }
});
