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
        const imageElement = document.getElementById('modal-banner');
        const descriptionElement = document.getElementById('poi-description');

        titleElement.textContent = content.getTitle();
        imageElement.src = content.getImage();
        imageElement.alt = content.getTitle();
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
        const isMultiple = content.isMultipleChoice();
        const isImageQuiz = content.hasImageOptions();

        if (!content.getQuestion() || content.getAnswerOptions().length === 0) return '';

        const optionsHtml = content.getAnswerOptions()
            .map((option, index) => {
                const value = isImageQuiz ? JSON.stringify(option) : option;
                const inputType = isMultiple ? 'checkbox' : 'radio';

                return `
                    <label class="quiz-option image-option">
                        <input type="${inputType}" name="quiz-option" value="${index}">
                        ${typeof option === 'object' && option.image 
                            ? `<img src="${option.image}" alt="${option.alt || ''}" class="quiz-image-option">`
                            : option}
                    </label>
                `;
            }).join('');

        return `
            <div class="quiz-container">
                <h3>${content.getQuestion()}</h3>
                <form id="quiz-form">
                    ${optionsHtml}
                    <button type="button" id="submit-answer">Controleer</button>
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
        const correctAnswer = content.getCorrectAnswer();
        const isMultiple = Array.isArray(correctAnswer);

        form.addEventListener('click', (event) => {
            if (event.target.id === 'submit-answer') {
                const selectedInputs = form.querySelectorAll('input[name="quiz-option"]:checked');

                if (selectedInputs.length > 0) {
                    const selectedIndexes = Array.from(selectedInputs).map(input => parseInt(input.value, 10));

                    let isCorrect = false;

                    if (isMultiple) {
                        const sortedSelected = selectedIndexes.slice().sort();
                        const sortedCorrect = correctAnswer.slice().sort();
                        isCorrect = JSON.stringify(sortedSelected) === JSON.stringify(sortedCorrect);
                    } else {
                        isCorrect = selectedIndexes[0] === correctAnswer;
                    }

                    feedbackElement.innerHTML = isCorrect 
                        ? `✅ Juist! Goed gedaan!<br><br>${content.getFunFact()}`
                        : '❌ Onjuist, probeer het opnieuw.';

                    feedbackElement.classList.toggle('correct', isCorrect);
                    feedbackElement.classList.toggle('incorrect', !isCorrect);

                    if (isCorrect) {
                        this.poi.setFound(true);
                        this.updateAreaCallback(this.poi);
                    }
                } else {
                    feedbackElement.textContent = '⚠️ Selecteer een antwoord voordat je controleert.';
                    feedbackElement.classList.remove('correct', 'incorrect');
                }
            }
        });
    }
};