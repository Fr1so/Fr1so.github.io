export default class QuizOverlay {
    constructor(updateAreaCallback) {
        this.updateAreaCallback = updateAreaCallback;
        this.poi = null;
    }

    setPoi(poi) {
        this.poi = poi;
    }

    show() {
        if(!this.poi) {
            console.error('Cant show quiz overlay: no poi set');
        }

        const content = this.poi.getContent();

        const modal = document.getElementById('poi-modal');
        const titleElement = document.getElementById('poi-title');
        const descriptionElement = document.getElementById('poi-description');

        titleElement.textContent = content.getTitle();
        descriptionElement.innerHTML = this.getQuizFormHtml();
        modal.classList.remove('hidden');

        this.handleQuizSubmission();
    }

    hide() {
        const modal = document.getElementById('poi-modal');
        modal.classList.add('hidden');
    }

    getQuizFormHtml() {
        const content = this.poi.getContent();

        // Only show quiz if a question is provided
        if (!content.getQuestion() || content.getAnswerOptions().length === 0) return '';

        const optionsHtml = content.getAnswerOptions()
            .map((option, index) => `
                <label class="quiz-option">
                    <input type="radio" name="quiz-option" value="${index}">
                    ${option}
                </label>
            `)
            .join('');

        return `
            <div class="quiz-container">
                <h3>${content.getQuestion()}</h3>
                <form id="quiz-form">
                    ${optionsHtml}
                    <button type="button" id="submit-answer">Submit</button>
                </form>
                <p id="quiz-feedback" class="quiz-feedback"></p>
            </div>
        `;
    }

    handleQuizSubmission() {
        const form = document.getElementById('quiz-form');
        const feedbackElement = document.getElementById('quiz-feedback');

        if (!form || !this.poi) return;

        const content = this.poi.getContent();
        const correctIndex = content.getCorrectAnswer();

        form.addEventListener('click', (event) => {
            if (event.target.id === 'submit-answer') {
                const selectedOption = form.querySelector('input[name="quiz-option"]:checked');

                if (selectedOption) {
                    const selectedIndex = parseInt(selectedOption.value, 10);
                    const isCorrect = selectedIndex === correctIndex;

                    feedbackElement.textContent = isCorrect 
                        ? '✅ Correct! Well done!' 
                        : '❌ Incorrect, try again.';

                    feedbackElement.classList.toggle('correct', isCorrect);
                    feedbackElement.classList.toggle('incorrect', !isCorrect);

                    if(isCorrect) {
                        this.poi.setFound(true);
                        this.updateAreaCallback(this.poi);
                    }
                } else {
                    feedbackElement.textContent = '⚠️ Please select an option before submitting.';
                    feedbackElement.classList.remove('correct', 'incorrect');
                }
            }
        });
    }
};