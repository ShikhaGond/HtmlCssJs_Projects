document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Pop-out effect with 3-second timeout
    const navLinks = document.querySelectorAll('.nav-link');
    let activeTimeouts = {};
    
    navLinks.forEach((link, index) => {
        // Create unique ID for each link
        const linkId = `nav-link-${index}`;
        link.setAttribute('data-id', linkId);
        
        // Mouse enter - pop out
        link.addEventListener('mouseenter', function() {
            // Clear any existing timeout for this link
            if (activeTimeouts[linkId]) {
                clearTimeout(activeTimeouts[linkId]);
            }
            
            // Add popped class
            this.classList.add('popped');
            
            // Apply 3D transform based on screen position
            const rect = this.getBoundingClientRect();
            const centerX = window.innerWidth / 2;
            const direction = rect.left < centerX ? 1 : -1;
            
            // Create a more dramatic pop-out effect
            this.style.transform = `translateZ(50px) scale(1.1) rotateY(${direction * 15}deg)`;
            
            // Set perspective origin for better 3D effect
            const navItem = this.closest('.nav-item');
            const perspectiveOriginX = rect.left < centerX ? '75%' : '25%';
            navItem.style.perspectiveOrigin = `${perspectiveOriginX} 50%`;
            
            // Set timeout to revert after 3 seconds
            activeTimeouts[linkId] = setTimeout(() => {
                this.classList.remove('popped');
                this.style.transform = '';
                navItem.style.perspectiveOrigin = '';
                delete activeTimeouts[linkId];
            }, 3000);
        });
        
        // Mouse leave - only revert if no timeout is active
        link.addEventListener('mouseleave', function() {
            // Don't revert immediately, let the timeout handle it
            // This ensures the 3-second effect runs fully
            // But we can optionally add a subtle transition here
            if (this.classList.contains('popped')) {
                this.style.transform = `translateZ(50px) scale(1.05)`;
            }
        });
    });
    
    // Add 3D effect to logo
    const logo = document.querySelector('.logo');
    
    document.addEventListener('mousemove', function(e) {
        if (window.innerWidth <= 768) return;
        
        const rotateX = (window.innerHeight / 2 - e.pageY) / 20;
        const rotateY = (e.pageX - window.innerWidth / 2) / 20;
        
        logo.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    // Enhanced 3D environment
    const navbar = document.querySelector('.navbar');
    navbar.style.perspective = '2000px';
    navbar.style.perspectiveOrigin = '50% 50%';
});