document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const textDisplay = document.getElementById('text-display');
    const typingInput = document.getElementById('typing-input');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const difficultySelect = document.getElementById('difficulty');
    const wpmDisplay = document.getElementById('wpm');
    const accuracyDisplay = document.getElementById('accuracy');
    const timerDisplay = document.getElementById('timer');

    // Sample texts for different difficulty levels
    const texts = {
        easy: [
            "The quick brown fox jumps over the lazy dog. Simple sentences are easy to type.",
            "Learning to type quickly can save you a lot of time in your daily work.",
            "Practice makes perfect. Keep typing to improve your speed and accuracy."
        ],
        medium: [
            "The five boxing wizards jump quickly. Amazingly few discotheques provide jukeboxes.",
            "How vexingly quick daft zebras jump! Pack my box with five dozen liquor jugs.",
            "We promptly judged antique ivory buckles for the next prize. The job requires extra pluck and zeal."
        ],
        hard: [
            "Amazingly few discotheques provide jukeboxes. How vexingly quick daft zebras jump! The five boxing wizards jump quickly.",
            "Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs.",
            "The job requires extra pluck and zeal from every young wage earner. We promptly judged antique ivory buckles for the next prize."
        ]
    };

    // Variables
    let timer;
    let timeRemaining = 60;
    let isTestActive = false;
    let currentText = '';
    let startTime;
    let totalTypedChars = 0;
    let correctTypedChars = 0;

    // Initialize
    function init() {
        typingInput.disabled = true;
        typingInput.value = '';
        textDisplay.innerHTML = '<p>Start typing to begin the test...</p>';
        wpmDisplay.textContent = '0';
        accuracyDisplay.textContent = '100%';
        timerDisplay.textContent = '60';
        timeRemaining = 60;
        isTestActive = false;
        clearInterval(timer);
    }

    // Start test
    function startTest() {
        if (isTestActive) return;
        
        // Get random text based on difficulty
        const difficulty = difficultySelect.value;
        const randomIndex = Math.floor(Math.random() * texts[difficulty].length);
        currentText = texts[difficulty][randomIndex];
        
        // Format text for display
        const formattedText = currentText.split('').map(char => 
            `<span class="char">${char}</span>`
        ).join('');
        
        textDisplay.innerHTML = formattedText;
        
        // Reset stats
        typingInput.disabled = false;
        typingInput.value = '';
        typingInput.focus();
        timeRemaining = 60;
        timerDisplay.textContent = timeRemaining;
        isTestActive = true;
        totalTypedChars = 0;
        correctTypedChars = 0;
        
        // Start timer
        startTime = new Date().getTime();
        timer = setInterval(updateTimer, 1000);
        
        // Highlight first character
        highlightCurrentChar(0);
    }

    // Update timer
    function updateTimer() {
        timeRemaining--;
        timerDisplay.textContent = timeRemaining;
        
        // Calculate current WPM
        const minutesPassed = (new Date().getTime() - startTime) / 60000;
        const wordsTyped = correctTypedChars / 5; // Estimate: 5 chars = 1 word
        const currentWPM = Math.round(wordsTyped / minutesPassed);
        
        wpmDisplay.textContent = currentWPM;
        
        if (timeRemaining <= 0) {
            endTest();
        }
    }

    // End test
    function endTest() {
        clearInterval(timer);
        typingInput.disabled = true;
        isTestActive = false;
        
        // Calculate final stats
        const minutesPassed = (new Date().getTime() - startTime) / 60000;
        const wordsTyped = correctTypedChars / 5;
        const finalWPM = Math.round(wordsTyped / minutesPassed);
        
        const accuracy = totalTypedChars > 0 
            ? Math.round((correctTypedChars / totalTypedChars) * 100) 
            : 100;
        
        wpmDisplay.textContent = finalWPM;
        accuracyDisplay.textContent = `${accuracy}%`;
        
        // Display result message
        textDisplay.innerHTML = `
            <p>Test complete! Your typing speed is ${finalWPM} WPM with ${accuracy}% accuracy.</p>
            <p>Press "Start Test" to try again.</p>
        `;
    }

    // Highlight current character
    function highlightCurrentChar(index) {
        const charSpans = textDisplay.querySelectorAll('.char');
        
        // Remove previous current class
        charSpans.forEach(span => span.classList.remove('current'));
        
        // Add current class to current character
        if (index < charSpans.length) {
            charSpans[index].classList.add('current');
        }
    }

    // Check typing input
    function checkTyping() {
        if (!isTestActive) return;
        
        const typedText = typingInput.value;
        const charSpans = textDisplay.querySelectorAll('.char');
        
        totalTypedChars = typedText.length;
        correctTypedChars = 0;
        
        // Compare typed text with original text
        for (let i = 0; i < charSpans.length; i++) {
            // Reset classes
            charSpans[i].classList.remove('correct', 'incorrect');
            
            if (i < typedText.length) {
                if (typedText[i] === currentText[i]) {
                    charSpans[i].classList.add('correct');
                    correctTypedChars++;
                } else {
                    charSpans[i].classList.add('incorrect');
                }
            }
        }
        
        // Update accuracy
        const accuracy = totalTypedChars > 0 
            ? Math.round((correctTypedChars / totalTypedChars) * 100) 
            : 100;
        
        accuracyDisplay.textContent = `${accuracy}%`;
        
        // Highlight current character
        highlightCurrentChar(typedText.length);
        
        // Check if test is complete (typed all text)
        if (typedText.length >= currentText.length) {
            endTest();
        }
    }

    // Event listeners
    startBtn.addEventListener('click', startTest);
    resetBtn.addEventListener('click', init);
    typingInput.addEventListener('input', checkTyping);
// load initial state
    init();
});