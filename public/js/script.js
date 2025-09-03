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

// ===== FONCTIONNALITÉ DE RECHERCHE =====

// Configuration de la recherche
const SEARCH_CONFIG = {
    minLength: 2,
    debounceDelay: 300,
    highlightClass: 'search-highlight'
};

// Variables globales pour la recherche
let searchTimeout = null;
let questionsData = [];
let isSearchActive = false;
let currentSearchResults = [];
let highlightTimeout = null;

// Initialisation de la recherche
function initSearch() {
    try {
        const searchInput = document.getElementById('searchInput');
        const searchClear = document.getElementById('searchClear');
        const searchResultsInfo = document.getElementById('searchResultsInfo');

        if (!searchInput || !searchClear || !searchResultsInfo) {
            console.warn('⚠️ Éléments de recherche manquants - recherche désactivée');
            return;
        }

        // Construire les données des questions depuis le DOM
        buildQuestionsData();

        // Gestionnaires d'événements
        searchInput.addEventListener('input', handleSearchInput);
        searchInput.addEventListener('keydown', handleSearchKeydown);
        searchClear.addEventListener('click', clearSearch);

        console.log('✅ Recherche initialisée avec', questionsData.length, 'questions');
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation de la recherche:', error);
    }
}

// Construire les données des questions depuis le DOM
function buildQuestionsData() {
    questionsData = [];
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        try {
            const questionElement = card.querySelector('.question');
            const answerElement = card.querySelector('.answer');
            const categoryElement = card.closest('.category-section')?.querySelector('.category-title');
            
            if (questionElement && answerElement) {
                const questionData = {
                    id: index,
                    element: card,
                    question: questionElement.textContent.trim(),
                    answer: answerElement.textContent.trim(),
                    category: categoryElement ? categoryElement.textContent.trim() : 'Non catégorisé'
                };
                questionsData.push(questionData);
                
                // Ajouter un ID unique à la carte
                card.dataset.questionId = index.toString();
            }
        } catch (error) {
            console.warn('⚠️ Erreur lors du traitement de la carte:', error);
        }
    });
}

// Gestionnaire de saisie dans le champ de recherche
function handleSearchInput(e) {
    try {
        const query = e.target.value.trim();
        const searchClear = document.getElementById('searchClear');
        
        // Afficher/masquer le bouton de suppression
        if (query.length > 0) {
            searchClear.classList.add('visible');
        } else {
            searchClear.classList.remove('visible');
        }
        
        // Debounce de la recherche
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, SEARCH_CONFIG.debounceDelay);
    } catch (error) {
        console.error('❌ Erreur dans handleSearchInput:', error);
    }
}

// Gestionnaire des touches clavier dans la recherche
function handleSearchKeydown(e) {
    try {
        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                const query = e.target.value.trim();
                if (query.length >= SEARCH_CONFIG.minLength) {
                    performSearch(query, true);
                }
                break;
            case 'Escape':
                e.target.blur();
                clearSearch();
                break;
        }
    } catch (error) {
        console.error('❌ Erreur dans handleSearchKeydown:', error);
    }
}

// Effectuer une recherche
function performSearch(query, forceSearch = false) {
    try {
        if (!forceSearch && query.length < SEARCH_CONFIG.minLength) {
            clearSearchFilters();
            updateSearchResultsInfo('');
            isSearchActive = false;
            currentSearchResults = [];
            return;
        }

        isSearchActive = true;
        const results = searchQuestions(query);
        currentSearchResults = results;
        
        if (results.length > 0) {
            const firstMatch = results[0];
            openAndScrollToQuestion(firstMatch.element);
            applySearchFilters(results);
            updateSearchResultsInfo(query, results.length, 'success');
        } else {
            clearSearchFilters();
            updateSearchResultsInfo(query, 0, 'error');
        }
    } catch (error) {
        console.error('❌ Erreur dans performSearch:', error);
    }
}

// Rechercher dans les questions avec système de scoring
function searchQuestions(query) {
    try {
        const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
        const results = [];

        questionsData.forEach(item => {
            let score = 0;
            const questionLower = item.question.toLowerCase();
            const answerLower = item.answer.toLowerCase();
            const categoryLower = item.category.toLowerCase();
            
            searchTerms.forEach(term => {
                if (questionLower.includes(term)) {
                    score += questionLower.indexOf(term) === 0 ? 10 : 5;
                }
                
                if (answerLower.includes(term)) {
                    score += 2;
                }
                
                if (categoryLower.includes(term)) {
                    score += 3;
                }
            });
            
            if (score > 0) {
                results.push({ ...item, score });
            }
        });

        return results.sort((a, b) => b.score - a.score);
    } catch (error) {
        console.error('❌ Erreur dans searchQuestions:', error);
        return [];
    }
}

// Fonction pour nettoyer complètement la surbrillance d'une carte
function removeCardHighlight(cardElement) {
    try {
        if (!cardElement) return;
        
        // Supprimer la classe de surbrillance
        cardElement.classList.remove('search-highlight-active');
        
        // Simuler un mouseout pour forcer la suppression du hover
        const mouseOutEvent = new MouseEvent('mouseout', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        cardElement.dispatchEvent(mouseOutEvent);
        
        // Forcer la suppression complète
        cardElement.style.cssText = '';
        cardElement.removeAttribute('style');
        
        // Double reflow pour être sûr
        cardElement.offsetHeight;
        cardElement.offsetWidth;
        
    } catch (error) {
        console.error('❌ Erreur dans removeCardHighlight:', error);
    }
}

// Ouvrir une carte et faire défiler vers elle
function openAndScrollToQuestion(cardElement) {
    try {
        if (!cardElement) return;
        
        // Nettoyer tout timeout de surbrillance précédent
        if (highlightTimeout) {
            clearTimeout(highlightTimeout);
        }
        
        // Nettoyer toute surbrillance existante sur cette carte
        removeCardHighlight(cardElement);
        
        // Ouvrir la carte si elle n'est pas déjà ouverte
        if (!cardElement.classList.contains('expanded')) {
            toggleCard(cardElement);
        }
        
        // Faire défiler vers la carte avec un délai pour l'animation
        setTimeout(() => {
            cardElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            
            // Appliquer l'effet de surbrillance temporaire
            applyTemporaryHighlight(cardElement);
            
        }, cardElement.classList.contains('expanded') ? 0 : 300);
    } catch (error) {
        console.error('❌ Erreur dans openAndScrollToQuestion:', error);
    }
}

// Fonction pour appliquer la surbrillance temporaire
function applyTemporaryHighlight(cardElement) {
    try {
        // Ajouter une classe CSS temporaire pour la surbrillance
        cardElement.classList.add('search-highlight-active');
        
        // Programmer la suppression de l'effet après 2 secondes
        highlightTimeout = setTimeout(() => {
            removeCardHighlight(cardElement);
            highlightTimeout = null;
        }, 2000);
        
    } catch (error) {
        console.error('❌ Erreur dans applyTemporaryHighlight:', error);
    }
}

// Appliquer les filtres visuels aux résultats de recherche
function applySearchFilters(results) {
    try {
        clearSearchFilters();
        
        const resultIds = results.map(r => r.id.toString());
        const allCards = document.querySelectorAll('.card');
        
        allCards.forEach(card => {
            const cardId = card.dataset.questionId;
            
            if (resultIds.includes(cardId)) {
                card.classList.add('search-match');
            } else {
                card.classList.add('search-filtered');
            }
        });
    } catch (error) {
        console.error('❌ Erreur dans applySearchFilters:', error);
    }
}

// Nettoyer tous les filtres de recherche
function clearSearchFilters() {
    try {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            card.classList.remove('search-filtered', 'search-match');
            removeCardHighlight(card);
        });
        
        if (highlightTimeout) {
            clearTimeout(highlightTimeout);
            highlightTimeout = null;
        }
    } catch (error) {
        console.error('❌ Erreur dans clearSearchFilters:', error);
    }
}

// Mettre à jour l'affichage des informations de résultats
function updateSearchResultsInfo(query, resultCount = 0, type = '') {
    try {
        const infoElement = document.getElementById('searchResultsInfo');
        if (!infoElement) return;
        
        if (!query || !isSearchActive) {
            infoElement.classList.remove('visible', 'error', 'success');
            return;
        }
        
        let message = '';
        let className = '';
        
        if (resultCount === 0) {
            message = `🚫 Aucun résultat pour "<strong>${escapeHtml(query)}</strong>". <a href="#" class="chatbot-link" onclick="openChatbot('${escapeHtml(query)}')">Poser la question à notre chatbot !</a>`;
            className = 'error';
        } else if (resultCount === 1) {
            message = `✅ 1 question trouvée pour "<strong>${escapeHtml(query)}</strong>"`;
            className = 'success';
        } else {
            message = `✅ ${resultCount} questions trouvées pour "<strong>${escapeHtml(query)}</strong>"`;
            className = 'success';
        }
        
        infoElement.innerHTML = message;
        infoElement.classList.remove('error', 'success');
        infoElement.classList.add('visible', className);
    } catch (error) {
        console.error('❌ Erreur dans updateSearchResultsInfo:', error);
    }
}

// Effacer complètement la recherche
function clearSearch() {
    try {
        const searchInput = document.getElementById('searchInput');
        const searchClear = document.getElementById('searchClear');
        const searchResultsInfo = document.getElementById('searchResultsInfo');
        
        if (searchInput) {
            searchInput.value = '';
            searchInput.focus();
        }
        
        if (searchClear) {
            searchClear.classList.remove('visible');
        }
        
        if (searchResultsInfo) {
            searchResultsInfo.classList.remove('visible', 'error', 'success');
        }
        
        clearSearchFilters();
        isSearchActive = false;
        currentSearchResults = [];
        
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            removeCardHighlight(card);
        });
        
        if (highlightTimeout) {
            clearTimeout(highlightTimeout);
            highlightTimeout = null;
        }
    } catch (error) {
        console.error('❌ Erreur dans clearSearch:', error);
    }
}

// Fonction utilitaire pour échapper le HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== GESTION DU CHATBOT =====

// Ouvrir le chatbot avec une question pré-remplie - NOUVELLE VERSION CENTRÉE
function openChatbot(query = '') {
    try {
        let overlay = document.getElementById('chatbot-overlay');
        
        // Créer l'overlay s'il n'existe pas
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'chatbot-overlay';
            overlay.className = 'chatbot-overlay';
            
            const container = document.createElement('div');
            container.className = 'chatbot-container';
            
            // Pas de header - directement l'iframe
            const iframe = document.createElement('iframe');
            iframe.className = 'chatbot-iframe';
            iframe.src = 'https://www.chatbase.co/chatbot-iframe/6knjac3THVFxv9czJZUqt?theme=dark';
            iframe.allow = 'microphone';
            iframe.title = 'Chatbot Niort Assistant';
            
            // SUPPRIMER LE BOUTON DE FERMETURE FLOTTANT
            // const closeButton = document.createElement('button');
            // closeButton.className = 'chatbot-close-floating';
            // closeButton.innerHTML = '✕';
            // closeButton.setAttribute('aria-label', 'Fermer le chatbot');
            // closeButton.onclick = closeChatbot;
            
            container.appendChild(iframe);
            // container.appendChild(closeButton); // COMMENTÉ POUR SUPPRIMER LA CROIX
            overlay.appendChild(container);
            document.body.appendChild(overlay);
        }
        
        // Afficher avec animation
        overlay.classList.add('active');
        document.body.classList.add('no-scroll');
        
        // Gestionnaire pour fermer en cliquant sur le backdrop
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                closeChatbot();
            }
        };
        
        console.log('✅ Chatbot ouvert');
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'ouverture du chatbot:', error);
        // Fallback : ouvrir dans un nouvel onglet
        window.open('https://www.chatbase.co/chatbot-iframe/6knjac3THVFxv9czJZUqt?theme=dark', '_blank');
    }
}

// Fermer le chatbot
function closeChatbot() {
    try {
        const overlay = document.getElementById('chatbot-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // NE PAS masquer avec display: none pour permettre la réouverture
            // L'overlay est caché par opacity: 0 via la classe CSS
        }
        
        console.log('✅ Chatbot fermé');
    } catch (error) {
        console.error('❌ Erreur lors de la fermeture du chatbot:', error);
    }
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
        
        setTimeout(() => {
            initSearch();
        }, 100);
        
        console.log('✅ Niort Assistant initialisé avec succès');
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation:', error);
        // Initialisation minimale en cas d'erreur
        initTheme();
        initFAQ();
        setTimeout(() => {
            try {
                initSearch();
            } catch (searchError) {
                console.warn('⚠️ Recherche non disponible:', searchError);
            }
        }, 200);
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', initApplication);

// Gestion des raccourcis clavier
document.addEventListener('keydown', (e) => {
    try {
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            toggleTheme();
        }
        
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
        
        if (e.key === 'Escape') {
            const overlay = document.getElementById('chatbot-overlay');
            if (overlay && overlay.classList.contains('active')) {
                closeChatbot();
                return;
            }
            
            closeAllCards();
            const searchInput = document.getElementById('searchInput');
            if (searchInput && document.activeElement === searchInput) {
                searchInput.blur();
                clearSearch();
            }
        }
        
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'O') {
            e.preventDefault();
            openAllCards();
        }
        
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            closeAllCards();
        }
        
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
window.initSearch = initSearch;
window.clearSearch = clearSearch;
window.performSearch = performSearch;
window.openChatbot = openChatbot;
window.closeChatbot = closeChatbot;

// Fonction de nettoyage pour éviter les fuites mémoire
window.addEventListener('beforeunload', () => {
    // Nettoyer les observers et listeners si nécessaire
    document.removeEventListener('keydown', () => {});
    
    // Nettoyer le chatbot
    const overlay = document.getElementById('chatbot-overlay');
    if (overlay) {
        overlay.remove();
    }
    
    // Restaurer le scroll de la page
    document.body.classList.remove('no-scroll');
    
    // Nettoyer les timeouts de surbrillance
    if (highlightTimeout) {
        clearTimeout(highlightTimeout);
        highlightTimeout = null;
    }
});

// Export pour utilisation en module si nécessaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleTheme,
        toggleCard,
        handleCardKeydown,
        initApplication,
        openChatbot,
        closeChatbot
    };
}