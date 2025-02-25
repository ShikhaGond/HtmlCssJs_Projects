// Sample data for movies and TV shows
const content = {
    continueWatching: [
        { id: 1, title: "Money Heist", year: 2017, type: "TV Show", progress: 70, image: "https://via.placeholder.com/250x150?text=Money+Heist" },
        { id: 2, title: "The Witcher", year: 2019, type: "TV Show", progress: 40, image: "https://via.placeholder.com/250x150?text=The+Witcher" },
        { id: 3, title: "Dune", year: 2021, type: "Movie", progress: 30, image: "https://via.placeholder.com/250x150?text=Dune" },
        { id: 4, title: "Breaking Bad", year: 2008, type: "TV Show", progress: 90, image: "https://via.placeholder.com/250x150?text=Breaking+Bad" },
        { id: 5, title: "Inception", year: 2010, type: "Movie", progress: 55, image: "https://via.placeholder.com/250x150?text=Inception" },
        { id: 6, title: "Peaky Blinders", year: 2013, type: "TV Show", progress: 20, image: "https://via.placeholder.com/250x150?text=Peaky+Blinders" }
    ],
    popular: [
        { id: 7, title: "Squid Game", year: 2021, type: "TV Show", image: "https://via.placeholder.com/250x150?text=Squid+Game" },
        { id: 8, title: "The Queen's Gambit", year: 2020, type: "TV Show", image: "https://via.placeholder.com/250x150?text=Queens+Gambit" },
        { id: 9, title: "No Time to Die", year: 2021, type: "Movie", image: "https://via.placeholder.com/250x150?text=No+Time+To+Die" },
        { id: 10, title: "Loki", year: 2021, type: "TV Show", image: "https://via.placeholder.com/250x150?text=Loki" },
        { id: 11, title: "Black Widow", year: 2021, type: "Movie", image: "https://via.placeholder.com/250x150?text=Black+Widow" },
        { id: 12, title: "Lupin", year: 2021, type: "TV Show", image: "https://via.placeholder.com/250x150?text=Lupin" }
    ],
    movies: [
        { id: 13, title: "The Shawshank Redemption", year: 1994, type: "Movie", image: "https://via.placeholder.com/250x150?text=Shawshank+Redemption" },
        { id: 14, title: "The Godfather", year: 1972, type: "Movie", image: "https://via.placeholder.com/250x150?text=The+Godfather" },
        { id: 15, title: "Pulp Fiction", year: 1994, type: "Movie", image: "https://via.placeholder.com/250x150?text=Pulp+Fiction" },
        { id: 16, title: "The Dark Knight", year: 2008, type: "Movie", image: "https://via.placeholder.com/250x150?text=The+Dark+Knight" },
        { id: 17, title: "Fight Club", year: 1999, type: "Movie", image: "https://via.placeholder.com/250x150?text=Fight+Club" },
        { id: 18, title: "Forrest Gump", year: 1994, type: "Movie", image: "https://via.placeholder.com/250x150?text=Forrest+Gump" }
    ],
    tvShows: [
        { id: 19, title: "Game of Thrones", year: 2011, type: "TV Show", image: "https://via.placeholder.com/250x150?text=Game+of+Thrones" },
        { id: 20, title: "Friends", year: 1994, type: "TV Show", image: "https://via.placeholder.com/250x150?text=Friends" },
        { id: 21, title: "The Office", year: 2005, type: "TV Show", image: "https://via.placeholder.com/250x150?text=The+Office" },
        { id: 22, title: "Stranger Things", year: 2016, type: "TV Show", image: "https://via.placeholder.com/250x150?text=Stranger+Things" },
        { id: 23, title: "Westworld", year: 2016, type: "TV Show", image: "https://via.placeholder.com/250x150?text=Westworld" },
        { id: 24, title: "The Crown", year: 2016, type: "TV Show", image: "https://via.placeholder.com/250x150?text=The+Crown" }
    ]
};

// Mock content detail data
const contentDetails = {
    1: {
        title: "Money Heist",
        year: 2017,
        type: "TV Show",
        seasons: 5,
        rating: "16+",
        duration: "50 min per episode",
        genres: ["Action", "Crime", "Thriller"],
        description: "A criminal mastermind who goes by 'The Professor' has a plan to pull off the biggest heist in recorded history -- to print billions of euros in the Royal Mint of Spain. To help him carry out the ambitious plan, he recruits eight people with certain abilities and who have nothing to lose.",
        cast: [
            { name: "Álvaro Morte", role: "The Professor", image: "https://via.placeholder.com/100x100?text=Morte" },
            { name: "Úrsula Corberó", role: "Tokyo", image: "https://via.placeholder.com/100x100?text=Corbero" },
            { name: "Pedro Alonso", role: "Berlin", image: "https://via.placeholder.com/100x100?text=Alonso" }
        ],
        related: [
            { id: 4, title: "Breaking Bad", image: "https://via.placeholder.com/150x100?text=Breaking+Bad" },
            { id: 6, title: "Peaky Blinders", image: "https://via.placeholder.com/150x100?text=Peaky+Blinders" },
            { id: 12, title: "Lupin", image: "https://via.placeholder.com/150x100?text=Lupin" }
        ],
        poster: "https://via.placeholder.com/900x350?text=Money+Heist+Banner"
    }
};

// DOM elements
const header = document.querySelector('header');
const modal = document.getElementById('movie-detail-modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.querySelector('.close-modal');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Populate content sections
    populateContentSection('continue-watching', content.continueWatching);
    populateContentSection('popular', content.popular);
    populateContentSection('movies', content.movies);
    populateContentSection('tv-shows', content.tvShows);

    // Setup carousel navigation
    setupCarousels();

    // Create mobile menu
    createMobileMenu();

    // Setup event listeners
    setupEventListeners();
});

// Function to populate content sections
function populateContentSection(sectionId, items) {
    const container = document.querySelector(`#${sectionId} .carousel-container`);
    container.innerHTML = '';

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'content-card';
        card.dataset.id = item.id;

        let cardContent = `
            <img src="${item.image}" alt="${item.title}">
            <div class="content-card-overlay">
                <div class="content-card-title">${item.title}</div>
                <div class="content-card-info">${item.year} · ${item.type}</div>
            </div>
        `;

        if (item.progress) {
            cardContent += `<div class="progress-bar" style="width: ${item.progress}%"></div>`;
        }

        card.innerHTML = cardContent;
        container.appendChild(card);

        // Add click event to open modal
        card.addEventListener('click', () => openContentModal(item.id));
    });
}

// Function to setup carousels
function setupCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const container = carousel.querySelector('.carousel-container');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        const cardWidth = 250; // Width of each card plus margin
        const scrollAmount = cardWidth * 3; // Scroll 3 cards at a time
        
        // Hide prev button initially
        prevBtn.style.opacity = '0.5';
        prevBtn.style.pointerEvents = 'none';
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            container.scrollLeft += scrollAmount;
            // Check if we can still scroll to the right
            if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
                nextBtn.style.opacity = '0.5';
                nextBtn.style.pointerEvents = 'none';
            }
            
            // Enable prev button
            prevBtn.style.opacity = '1';
            prevBtn.style.pointerEvents = 'auto';
        });
        
        // Prev button click
        prevBtn.addEventListener('click', () => {
            container.scrollLeft -= scrollAmount;
            // Check if we can still scroll to the left
            if (container.scrollLeft <= 10) {
                prevBtn.style.opacity = '0.5';
                prevBtn.style.pointerEvents = 'none';
            }
            
            // Enable next button
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
        });
        
        // Listen to scroll events
        container.addEventListener('scroll', () => {
            // Check if we can still scroll to the left
            if (container.scrollLeft <= 10) {
                prevBtn.style.opacity = '0.5';
                prevBtn.style.pointerEvents = 'none';
            } else {
                prevBtn.style.opacity = '1';
                prevBtn.style.pointerEvents = 'auto';
            }
            
            // Check if we can still scroll to the right
            if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
                nextBtn.style.opacity = '0.5';
                nextBtn.style.pointerEvents = 'none';
            } else {
                nextBtn.style.opacity = '1';
                nextBtn.style.pointerEvents = 'auto';
            }
        });
    });
}

// Function to create mobile menu
function createMobileMenu() {
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <div class="mobile-menu-header">
            <div class="logo">StreamVerse</div>
            <button class="mobile-menu-close"><i class="fas fa-times"></i></button>
        </div>
        <div class="mobile-menu-links">
            <a href="#" class="active">Home</a>
            <a href="#">Movies</a>
            <a href="#">TV Shows</a>
            <a href="#">My List</a>
        </div>
        <div class="mobile-search">
            <input type="text" placeholder="Search...">
        </div>
    `;
    document.body.appendChild(mobileMenu);
    
    // Add close functionality
    const closeBtn = mobileMenu.querySelector('.mobile-menu-close');
    closeBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
    
    // Mobile search functionality
    const mobileSearchInput = mobileMenu.querySelector('.mobile-search input');
    mobileSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchContent(mobileSearchInput.value);
            mobileMenu.classList.remove('active');
        }
    });
}

// Function to setup event listeners
function setupEventListeners() {
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        document.querySelector('.mobile-menu').classList.add('active');
    });
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    searchBtn.addEventListener('click', () => {
        searchContent(searchInput.value);
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchContent(searchInput.value);
        }
    });
    
    // Adding keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

function openContentModal(id) {
    const details = contentDetails[id];
    
    // If details not found, create a fallback using the content lists
    let item;
    if (!details) {
        // Searching in all content sections
        for (const section in content) {
            const found = content[section].find(item => item.id === parseInt(id));
            if (found) {
                item = found;
                break;
            }
        }
        
        if (!item) {
            console.error('Content not found');
            return;
        }
        
        const basicDetails = {
            title: item.title,
            year: item.year,
            type: item.type,
            rating: "PG-13",
            duration: item.type === 'Movie' ? "2h 15m" : "45 min per episode",
            genres: ["Drama"],
            description: "No detailed description available for this title.",
            poster: item.image,
            cast: [],
            related: []
        };
        
        populateModalContent(basicDetails);
    } else {
        populateModalContent(details);
    }
    
    // Display modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevents scrolling
}

// Function to populate modal content
function populateModalContent(details) {
    let genresHTML = details.genres.map(genre => `<span>${genre}</span>`).join(', ');
    
    let castHTML = '';
    if (details.cast && details.cast.length > 0) {
        castHTML = `
            <div class="modal-cast">
                <h3>Cast</h3>
                <div class="cast-list">
                    ${details.cast.map(person => `
                        <div class="cast-item">
                            <img class="cast-image" src="${person.image}" alt="${person.name}">
                            <div class="cast-name">${person.name}</div>
                            <div class="cast-role">${person.role}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    let relatedHTML = '';
    if (details.related && details.related.length > 0) {
        relatedHTML = `
            <div class="modal-related">
                <h3>More Like This</h3>
                <div class="related-list">
                    ${details.related.map(item => `
                        <div class="related-item" data-id="${item.id}">
                            <img class="related-image" src="${item.image}" alt="${item.title}">
                            <div class="related-title">${item.title}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    modalContent.innerHTML = `
        <img class="modal-poster" src="${details.poster}" alt="${details.title}">
        <h2 class="modal-title">${details.title}</h2>
        <div class="modal-info">
            <span>${details.year}</span>
            <span>${details.rating}</span>
            <span>${details.type === 'TV Show' ? details.seasons + ' Seasons' : details.duration}</span>
            <span>${genresHTML}</span>
        </div>
        <p class="modal-description">${details.description}</p>
        <div class="modal-actions">
            <button class="btn-primary"><i class="fas fa-play"></i> Play</button>
            <button class="btn-secondary"><i class="fas fa-plus"></i> My List</button>
            <button class="btn-secondary"><i class="fas fa-thumbs-up"></i> Like</button>
        </div>
        ${castHTML}
        ${relatedHTML}
    `;
    
    // Adding event listeners to related content
    const relatedItems = modalContent.querySelectorAll('.related-item');
    relatedItems.forEach(item => {
        item.addEventListener('click', () => {
            openContentModal(item.dataset.id);
        });
    });
}

// Function for search functionality
function searchContent(query) {
    if (!query.trim()) return;
    
    // Creating the arrays of all content
    const allContent = [
        ...content.continueWatching,
        ...content.popular,
        ...content.movies,
        ...content.tvShows
    ];
    
    // Filtering for matching items
    const searchResults = allContent.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
    );
    
    // Displaying results in a new section
    const mainElement = document.querySelector('main');
    
    // Removing previous search results if any
    const prevResults = document.getElementById('search-results');
    if (prevResults) {
        prevResults.remove();
    }
    
    // Creating new search results section
    const searchSection = document.createElement('section');
    searchSection.id = 'search-results';
    searchSection.className = 'content-section';
    
    if (searchResults.length === 0) {
        searchSection.innerHTML = `
            <h2>Search Results for "${query}"</h2>
            <p>No results found. Try a different search term.</p>
        `;
    } else {
        const carouselHTML = `
            <h2>Search Results for "${query}"</h2>
            <div class="carousel" id="search-carousel">
                <button class="carousel-btn prev-btn"><i class="fas fa-chevron-left"></i></button>
                <div class="carousel-container">
                    ${searchResults.map(item => `
                        <div class="content-card" data-id="${item.id}">
                            <img src="${item.image}" alt="${item.title}">
                            <div class="content-card-overlay">
                                <div class="content-card-title">${item.title}</div>
                                <div class="content-card-info">${item.year} · ${item.type}</div>
                            </div>
                            ${item.progress ? `<div class="progress-bar" style="width: ${item.progress}%"></div>` : ''}
                        </div>
                    `).join('')}
                </div>
                <button class="carousel-btn next-btn"><i class="fas fa-chevron-right"></i></button>
            </div>
        `;
        
        searchSection.innerHTML = carouselHTML;
    }
    
    // Inserting the search results section after hero section
    const heroSection = document.querySelector('.hero');
    heroSection.insertAdjacentElement('afterend', searchSection);
    
    // Adding click events to search results
    const resultCards = searchSection.querySelectorAll('.content-card');
    resultCards.forEach(card => {
        card.addEventListener('click', () => {
            openContentModal(card.dataset.id);
        });
    });
    
    // Setup carousel for search results
    if (searchResults.length > 0) {
        setupCarousels();
    }
    
    // Clear the search input
    searchInput.value = '';
    
    // Scroll to search results
    searchSection.scrollIntoView({ behavior: 'smooth' });
}

// Generate content details for all items (in a real application, this would be from an API)
function generateContentDetails() {
    // Generate details for all content items (real application case: fetched from backend API)
}