const API_URL = "https://the-trivia-api.com/api/questions?limit=1";

let questionRotationInterval = null;
let isStopped = false;

function fetchRandomQuestion() {
    if (isStopped) return;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            if (isStopped) return;
            if (!Array.isArray(data) || !data[0] || !data[0].question) return;

            const questionEl = document.querySelector('.question-container .question');
            if (questionEl) questionEl.textContent = data[0].question;
        })
        .catch(error => console.error('Error fetching question:', error));
}

function startQuestionRotation() {
    isStopped = false;
    if (questionRotationInterval) {
        clearInterval(questionRotationInterval);

    }

    fetchRandomQuestion();
    questionRotationInterval = setInterval(fetchRandomQuestion, 5000);
}

function stopQuestions() {
    isStopped = true;
    clearInterval(questionRotationInterval);
    questionRotationInterval = null;

    const stopButton = document.querySelector('#stopButton');
    if (stopButton) {
        stopButton.classList.add('stopped');
        stopButton.disabled = true;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    startQuestionRotation();

    const stopButton = document.querySelector('#stopButton');
    if (stopButton) stopButton.addEventListener('click', stopQuestions);
});
