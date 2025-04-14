document.addEventListener('DOMContentLoaded', () => {
    // Game elements
    const gameArea = document.getElementById('gameArea');
    const scoreElement = document.getElementById('score');
    const levelElement = document.getElementById('level');
    const startBtn = document.getElementById('startBtn');
    const restartBtn = document.getElementById('restartBtn');
    const levelUpModal = document.getElementById('levelUp');
    const newLevelElement = document.getElementById('newLevel');
    const continueBtn = document.getElementById('continueBtn');
    const gameOverModal = document.getElementById('gameOver');
    const finalScoreElement = document.getElementById('finalScore');
    const finalLevelElement = document.getElementById('finalLevel');
    const playAgainBtn = document.getElementById('playAgainBtn');

    // Game variables
    let score = 0;
    let level = 1;
    let gameActive = false;
    let bubbleInterval;
    let gameSpeed = 3000; // Initial bubble creation speed in ms
    let bubbleColors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'];
    let missedBubbles = 0;
    let maxMissedBubbles = 5;
    let bubbleSizes = {
        min: 50,
        max: 80
    };
    let bubblePoints = 10;
    let activeBubbles = [];

    // Sound effects (placeholder functions for now)
    const playPopSound = () => {
        // You could implement actual sounds here
        // For example: new Audio('pop.mp3').play();
    };

    const playLevelUpSound = () => {
        // new Audio('levelup.mp3').play();
    };

    const playGameOverSound = () => {
        // new Audio('gameover.mp3').play();
    };

    // Game functions
    const startGame = () => {
        resetGame();
        gameActive = true;
        startBtn.classList.add('hidden');
        createBubbles();
    };

    const resetGame = () => {
        score = 0;
        level = 1;
        missedBubbles = 0;
        gameSpeed = 3000;
        scoreElement.textContent = score;
        levelElement.textContent = level;
        gameArea.innerHTML = '';
        activeBubbles = [];
    };

    const createBubbles = () => {
        if (!gameActive) return;
        
        bubbleInterval = setInterval(() => {
            if (!gameActive) {
                clearInterval(bubbleInterval);
                return;
            }
            
            createBubble();
        }, gameSpeed / level);
    };

    const createBubble = () => {
        if (!gameActive) return;
        
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        // Random size based on level
        const size = Math.floor(Math.random() * (bubbleSizes.max - bubbleSizes.min + 1)) + bubbleSizes.min;
        
        // Random position
        const maxWidth = gameArea.clientWidth - size;
        const xPos = Math.floor(Math.random() * maxWidth);
        
        // Random color
        const colorIndex = Math.floor(Math.random() * bubbleColors.length);
        const color = bubbleColors[colorIndex];
        
        // Set bubble properties
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${xPos}px`;
        bubble.style.backgroundColor = color;
        
        // Add point value inside bubble
        const points = bubblePoints * level;
        bubble.textContent = points;
        
        // Calculate animation duration based on level (faster as level increases)
        const duration = Math.max(3, 10 - level * 0.5);
        bubble.style.animationDuration = `${duration}s`;
        
        // Add click event to pop bubble
        bubble.addEventListener('click', () => {
            if (!gameActive) return;
            
            popBubble(bubble, points);
        });
        
        // Track when bubbles leave the screen
        bubble.addEventListener('animationend', () => {
            if (gameArea.contains(bubble)) {
                missedBubbles++;
                gameArea.removeChild(bubble);
                
                // Remove from active bubbles
                const index = activeBubbles.indexOf(bubble);
                if (index > -1) {
                    activeBubbles.splice(index, 1);
                }
                
                // Check if game over
                if (missedBubbles >= maxMissedBubbles) {
                    endGame();
                }
            }
        });
        
        // Add to active bubbles array
        activeBubbles.push(bubble);
        
        // Add bubble to game area
        gameArea.appendChild(bubble);
    };

    const popBubble = (bubble, points) => {
        // Add popping animation class
        bubble.classList.add('popping');
        
        // Play sound
        playPopSound();
        
        // Update score
        updateScore(points);
        
        // Remove bubble after animation
        setTimeout(() => {
            if (gameArea.contains(bubble)) {
                gameArea.removeChild(bubble);
                
                // Remove from active bubbles
                const index = activeBubbles.indexOf(bubble);
                if (index > -1) {
                    activeBubbles.splice(index, 1);
                }
            }
        }, 300);
    };

    const updateScore = (points) => {
        score += points;
        scoreElement.textContent = score;
        
        // Check for level up (every 100 points)
        if (score >= level * 100) {
            levelUp();
        }
    };

    const levelUp = () => {
        // Pause the game
        gameActive = false;
        clearInterval(bubbleInterval);
        
        // Remove all active bubbles
        activeBubbles.forEach(bubble => {
            if (gameArea.contains(bubble)) {
                gameArea.removeChild(bubble);
            }
        });
        activeBubbles = [];
        
        // Increase level
        level++;
        levelElement.textContent = level;
        
        // Show level up modal
        newLevelElement.textContent = level;
        levelUpModal.classList.remove('hidden');
        
        // Play level up sound
        playLevelUpSound();
    };

    const continueGame = () => {
        // Hide level up modal
        levelUpModal.classList.add('hidden');
        
        // Resume game with increased difficulty
        gameActive = true;
        missedBubbles = 0; // Reset missed bubbles count
        
        // Increase bubble speed
        gameSpeed = Math.max(500, 3000 - (level * 200));
        
        // Continue creating bubbles
        createBubbles();
    };

    const endGame = () => {
        // Stop the game
        gameActive = false;
        clearInterval(bubbleInterval);
        
        // Remove all bubbles
        gameArea.innerHTML = '';
        activeBubbles = [];
        
        // Show game over screen
        finalScoreElement.textContent = score;
        finalLevelElement.textContent = level;
        gameOverModal.classList.remove('hidden');
        restartBtn.classList.remove('hidden');
        
        // Play game over sound
        playGameOverSound();
    };

    // Event listeners
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
    continueBtn.addEventListener('click', continueGame);
    playAgainBtn.addEventListener('click', () => {
        gameOverModal.classList.add('hidden');
        startGame();
    });

    // Window resize handler for responsive design
    window.addEventListener('resize', () => {
        if (gameActive) {
            // Adjust bubble positions if window is resized
            const maxWidth = gameArea.clientWidth;
            activeBubbles.forEach(bubble => {
                const bubbleWidth = parseInt(bubble.style.width);
                let xPos = parseInt(bubble.style.left);
                
                // Make sure bubbles stay within bounds
                if (xPos + bubbleWidth > maxWidth) {
                    xPos = maxWidth - bubbleWidth;
                    bubble.style.left = `${xPos}px`;
                }
            });
        }
    });
});