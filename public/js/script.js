// Gestion du thème - Version améliorée
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeButton(savedTheme);
    } else {
        detectSystemTheme();
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
    const themeIcon = document.querySelector('.theme-icon');
    const themeText = document.querySelector('.theme-text');
    
    if (themeIcon) {
        if (theme === 'light') {
            themeIcon.textContent = '☀️';
            if (themeText) {
                themeText.textContent = 'Mode clair';
            }
        } else {
            themeIcon.textContent = '🌙';
            if (themeText) {
                themeText.textContent = 'Mode sombre';
            }
        }
    }
}

// Animation des cartes FAQ - Version consolidée et améliorée
function toggleCard(card) {
    const answer = card.querySelector('.answer');
    const isExpanded = card.classList.contains('expanded');
    
    if (isExpanded) {
        card.classList.remove('expanded');
        answer.classList.remove('expanded');
        card.setAttribute('aria-expanded', 'false');
    } else {
        card.classList.add('expanded');
        answer.classList.add('expanded');
        card.setAttribute('aria-expanded', 'true');
    }
}

// Gestion du clavier pour l'accessibilité
function handleCardKeydown(event, card) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleCard(card);
    }
}

function initFAQ() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Initialiser les attributs d'accessibilité
        card.setAttribute('role', 'button');
        card.setAttribute('aria-expanded', 'false');
        card.setAttribute('tabindex', '0');
        
        // Gestionnaire de clic
        card.addEventListener('click', () => toggleCard(card));
        
        // Gestionnaire de clavier
        card.addEventListener('keydown', (e) => handleCardKeydown(e, card));
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
    // Vérifier si l'utilisateur préfère les animations réduites
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Afficher tous les éléments immédiatement
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.filter = 'blur(0px)';
        });
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.filter = 'blur(0px)';
            }
        });
    }, observerOptions);
    
    // Observer les éléments fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Effets sur le logo - Version améliorée
function initLogoEffects() {
    const logo = document.querySelector('.logo');
    
    if (!logo) return;
    
    logo.addEventListener('mouseenter', () => {
        logo.style.transform = 'translateY(-8px) scale(1.1)';
    });
    
    logo.addEventListener('mouseleave', () => {
        logo.style.transform = 'translateY(-8px) scale(1.1)';
        // Reset après un délai pour revenir à l'état normal
        setTimeout(() => {
            logo.style.transform = '';
        }, 300);
    });
    
    logo.addEventListener('click', () => {
        logo.style.transform = 'translateY(-4px) scale(0.95) rotate(-5deg)';
        setTimeout(() => {
            logo.style.transform = 'translateY(-8px) scale(1.1)';
        }, 150);
        
        // Effet de scroll vers le haut
        scrollToTop();
    });
}

// Détection du système de couleurs préféré
function detectSystemTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemTheme = prefersDark ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', systemTheme);
    updateThemeButton(systemTheme);
}

// Écoute des changements de préférence système
function watchSystemTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        // Seulement si l'utilisateur n'a pas de préférence sauvegardée
        if (!localStorage.getItem('theme')) {
            const systemTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', systemTheme);
            updateThemeButton(systemTheme);
        }
    });
}

// Fonction utilitaire pour fermer toutes les cartes
function closeAllCards() {
    document.querySelectorAll('.card').forEach(card => {
        const answer = card.querySelector('.answer');
        card.classList.remove('expanded');
        answer.classList.remove('expanded');
        card.setAttribute('aria-expanded', 'false');
    });
}

// Fonction utilitaire pour ouvrir toutes les cartes
function openAllCards() {
    document.querySelectorAll('.card').forEach(card => {
        const answer = card.querySelector('.answer');
        card.classList.add('expanded');
        answer.classList.add('expanded');
        card.setAttribute('aria-expanded', 'true');
    });
}

// Gestion des erreurs globales pour la robustesse
function initErrorHandling() {
    window.addEventListener('error', (e) => {
        console.warn('Erreur JavaScript interceptée:', e.error);
        // Ne pas faire crasher l'application, juste logger
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.warn('Promise rejetée non gérée:', e.reason);
        // Empêcher le crash de l'application
        e.preventDefault();
    });
}

// Optimisation des performances
function initPerformanceOptimizations() {
    // Lazy loading pour les images si présentes
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Debounce pour les événements de resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculer les animations si nécessaire
            initAnimations();
        }, 250);
    });
}

// Fonction d'initialisation principale
function initApplication() {
    try {
        detectSystemTheme();
        initTheme();
        initFAQ();
        initAnimations();
        initLogoEffects();
        watchSystemTheme();
        initErrorHandling();
        initPerformanceOptimizations();
        
        console.log('✅ Niort Assistant initialisé avec succès');
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation:', error);
        // Application minimale en cas d'erreur
        initTheme();
        initFAQ();
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', initApplication);

// Gestion des raccourcis clavier - Version étendue
document.addEventListener('keydown', (e) => {
    try {
        // Ctrl/Cmd + D pour changer de thème
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            toggleTheme();
        }
        
        // Echap pour fermer toutes les cartes FAQ
        if (e.key === 'Escape') {
            closeAllCards();
        }
        
        // Ctrl/Cmd + Shift + O pour ouvrir toutes les cartes
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'O') {
            e.preventDefault();
            openAllCards();
        }
        
        // Ctrl/Cmd + Shift + C pour fermer toutes les cartes
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            closeAllCards();
        }
        
        // Home pour scroll vers le haut
        if (e.key === 'Home' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            scrollToTop();
        }
    } catch (error) {
        console.warn('Erreur dans la gestion des raccourcis clavier:', error);
    }
});

// Exposition des fonctions globales pour compatibilité
window.toggleTheme = toggleTheme;
window.toggleCard = toggleCard;
window.handleCardKeydown = handleCardKeydown;
window.scrollToTop = scrollToTop;
window.closeAllCards = closeAllCards;
window.openAllCards = openAllCards;

// Fonction de nettoyage pour éviter les fuites mémoire
window.addEventListener('beforeunload', () => {
    // Nettoyer les observers et listeners si nécessaire
    document.removeEventListener('keydown', () => {});
});

// Export pour utilisation en module si nécessaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleTheme,
        toggleCard,
        handleCardKeydown,
        initApplication
    };
}