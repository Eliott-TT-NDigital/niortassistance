// Gestion du thème
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
    const themeIcon = document.querySelector('.theme-icon');
    const themeText = document.querySelector('.theme-text');
    
    if (theme === 'dark') {
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Mode clair';
    } else {
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Mode sombre';
    }
}

// Animation des cartes FAQ - Version corrigée
function initFAQ() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const question = card.querySelector('.question');
        const answer = card.querySelector('.answer');
        
        const toggleCard = () => {
            // Toggle uniquement la carte cliquée
            card.classList.toggle('expanded');
            answer.classList.toggle('expanded');
        };
        
        card.addEventListener('click', toggleCard);
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCard();
            }
        });
    });
}

// Fonction scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Animation d'entrée progressive
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les éléments fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Effets sur le logo
function initLogoEffects() {
    const logo = document.querySelector('.logo');
    
    logo.addEventListener('mouseenter', () => {
        logo.style.transform = 'translateY(-3px) scale(1.03) rotate(5deg)';
    });
    
    logo.addEventListener('mouseleave', () => {
        logo.style.transform = 'translateY(-3px) scale(1.03)';
    });
    
    logo.addEventListener('click', () => {
        logo.style.transform = 'translateY(-3px) scale(0.95) rotate(-5deg)';
        setTimeout(() => {
            logo.style.transform = 'translateY(-3px) scale(1.03)';
        }, 150);
    });
}

// Gestion du bouton flottant - Supprimé
function initFloatingButton() {
    // Fonction supprimée car le bouton flottant a été retiré
}

// Détection du système de couleurs préféré
function detectSystemTheme() {
    if (!localStorage.getItem('theme')) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const systemTheme = prefersDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', systemTheme);
        updateThemeButton(systemTheme);
    }
}

// Écoute des changements de préférence système
function watchSystemTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const systemTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', systemTheme);
            updateThemeButton(systemTheme);
        }
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    detectSystemTheme();
    initTheme();
    initFAQ();
    initAnimations();
    initLogoEffects();
    initFloatingButton();
    watchSystemTheme();
});

// Gestion des raccourcis clavier
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + D pour changer de thème
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
    }
    
    // Echap pour fermer toutes les cartes FAQ
    if (e.key === 'Escape') {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('expanded');
            card.querySelector('.answer').classList.remove('expanded');
        });
    }
});