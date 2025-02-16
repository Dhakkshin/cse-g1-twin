document.addEventListener('DOMContentLoaded', function () {
    // Quiz show/hide functionality
    const startQuizButton = document.getElementById('start-quiz');
    const quizSection = document.getElementById('quiz-section');
    const quizIntro = document.querySelector('.quiz-intro');

    if (startQuizButton && quizSection) {
        startQuizButton.addEventListener('click', () => {
            quizSection.classList.remove('hidden');
            quizIntro.classList.add('hidden');
            window.scrollTo({
                top: quizSection.offsetTop - 20,
                behavior: 'smooth'
            });
            loadQuestions(); 
        });
    }

    // Update quiz show/hide functionality
    const headerCTA = document.getElementById('header-cta');

    if (headerCTA && quizSection) {
        headerCTA.addEventListener('click', () => {
            quizSection.classList.remove('hidden');
            window.scrollTo({
                top: quizSection.offsetTop - 20,
                behavior: 'smooth'
            });
            loadQuestions(); 
        });
    }

    // Signup form show/hide functionality
    const showSignupButton = document.getElementById('show-signup');
    const signupFormSection = document.getElementById('signup-form-section');
    const signupIntro = document.querySelector('.signup-intro');

    if (showSignupButton && signupFormSection) {
        showSignupButton.addEventListener('click', () => {
            signupFormSection.classList.remove('hidden');
            signupIntro.classList.add('hidden');
            window.scrollTo({
                top: signupFormSection.offsetTop - 20,
                behavior: 'smooth'
            });
        });
    }

    // Back to Top functionality
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Progress bar update
    const updateProgress = () => {
        const questions = document.querySelectorAll('input[type="radio"]:checked');
        const progressBar = document.querySelector('.progress-bar-fill');
        const progress = (questions.length / 4) * 100;
        progressBar.style.width = `${progress}%`;
    };

    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', updateProgress);
    });

    // Existing form handling
    const form = document.getElementById('signup-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            let valid = true;

            // Show loading indicator
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.innerHTML = '<span class="loading"></span> Submitting...';
            submitButton.disabled = true;

            // Name Validation
            const name = document.getElementById('name').value.trim();
            if (!name.match(/^[A-Za-z\s]+$/)) {
                document.getElementById('name-error').textContent = "Name must contain only letters and spaces.";
                valid = false;
            } else {
                document.getElementById('name-error').textContent = "";
            }

            // Age Validation
            const age = parseInt(document.getElementById('age').value, 10);
            if (isNaN(age) || age < 10 || age > 120) {
                document.getElementById('age-error').textContent = "Please enter a valid age between 10 and 120.";
                valid = false;
            } else {
                document.getElementById('age-error').textContent = "";
            }

            // Email Validation
            const email = document.getElementById('email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('email-error').textContent = "Please enter a valid email.";
                valid = false;
            } else {
                document.getElementById('email-error').textContent = "";
            }

            // Unique Details Validation
            const details = document.getElementById('unique-details').value.trim();
            if (details === "") {
                document.getElementById('details-error').textContent = "Please share something unique about yourself.";
                valid = false;
            } else {
                document.getElementById('details-error').textContent = "";
            }

            // If valid, submit form via AJAX
            if (valid) {
                const formData = new FormData(form);
                const data = {};
                formData.forEach((value, key) => data[key] = value); // Convert FormData to a plain object

                fetch('/form/submit-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Ensure JSON content type
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data) // Convert data object to JSON string
                })
                .then(response => response.text())
                .then(data => {
                    submitButton.innerHTML = '✓ Submitted';
                    console.log('Success:', data);
                    document.getElementById('form-feedback').textContent = data;
                    document.getElementById('form-feedback').style.color = "green";
                    form.reset();
                })
                .catch(error => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    console.error('Error:', error);
                    document.getElementById('form-feedback').textContent = "An error occurred while submitting the form.";
                    document.getElementById('form-feedback').style.color = "red";
                });
            } else {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    } else {
        console.error('Form element not found');
    }

    updateLeaderboard();
});

let questions = null;
let currentQuestionId = 1;

async function loadQuestions() {
    try {
        const response = await fetch('/quiz/questions');
        const data = await response.json();
        questions = data.questions;
        displayQuestion(currentQuestionId);
        
        // Set up next button handler
        const nextButton = document.getElementById('next-button');
        nextButton.addEventListener('click', handleNextQuestion);
    } catch (error) {
        console.error('Error loading questions:', error);
        document.getElementById('current-question').innerHTML = 
            '<p class="error">Failed to load questions. Please try again later.</p>';
    }
}

function displayQuestion(questionId) {
    const question = questions.find(q => q.id === questionId);
    if (!question) {
        console.error('Question not found:', questionId);
        return;
    }

    const container = document.getElementById('current-question');
    container.innerHTML = `
        <div class="question">
            <h3>${question.text}</h3>
            <div class="options">
                ${question.options.map(option => `
                    <label class="option">
                        <input type="radio" name="q${question.id}" value="${option.value}">
                        <span class="option-text">${option.text}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `;

    // Enable next button only when an option is selected
    const nextButton = document.getElementById('next-button');
    nextButton.disabled = true;

    const radioButtons = container.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            nextButton.disabled = false;
        });
    });
}

function handleNextQuestion() {
    const currentQuestion = questions.find(q => q.id === currentQuestionId);
    const selectedOption = document.querySelector(`input[name="q${currentQuestionId}"]:checked`);
    
    if (!selectedOption) return;

    const selectedValue = selectedOption.value;
    const selectedOutcome = currentQuestion.options.find(opt => opt.value === selectedValue);

    if (selectedOutcome.result) {
        // Show the result and end the quiz
        showResult(selectedOutcome.result);
    } else if (selectedOutcome.error) {
        // Show error message without updating leaderboard
        showResult(selectedOutcome.error);
    } else if (selectedOutcome.next) {
        // Load the next question
        currentQuestionId = selectedOutcome.next;
        displayQuestion(currentQuestionId);
    }
}

async function updateLeaderboard() {
    try {
        const response = await fetch('/quiz/leaderboard');
        const data = await response.json();
        
        const leaderboardList = document.querySelector('.leaderboard ul');
        leaderboardList.innerHTML = data.map((item, index) => 
            `<li>${index + 1}. ${item.name} - ${item.score} matches</li>`
        ).join('');
    } catch (error) {
        console.error('Error updating leaderboard:', error);
    }
}

async function updateScore(name) {
    console.log('updateScore called with name:', name); // Debug log

    try {
        const response = await fetch('/quiz/update-score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name })
        });

        const data = await response.json();
        console.log('Response from server:', data); // Debug log

        if (!response.ok) {
            throw new Error(data.error || 'Failed to update score');
        }

        // Update the leaderboard immediately after successful score update
        await updateLeaderboard();
    } catch (error) {
        console.error('Error in updateScore:', error);
    }
}

// Modify the showResult function to update leaderboard
function showResult(result) {
    console.log('showResult called with:', result); // Debug log
    
    const container = document.getElementById('current-question');
    const navigation = document.querySelector('.quiz-navigation');
    
    const isError = result.includes("Character not found");
    
    container.innerHTML = `
        <div class="result ${isError ? 'error' : ''}">
            <h3>${isError ? 'Oops!' : 'Your CSE G1 Twin is:'}</h3>
            <div class="result-name">${result}</div>
            <button type="button" onclick="restartQuiz()" class="primary-button">
                Try Again
            </button>
        </div>
    `;
    
    navigation.style.display = 'none';
    
    if (!isError) {
        console.log('Calling updateScore for:', result); // Debug log
        updateScore(result);
    }
}

function restartQuiz() {
    currentQuestionId = 1;
    const navigation = document.querySelector('.quiz-navigation');
    navigation.style.display = 'flex';
    displayQuestion(currentQuestionId);
}
