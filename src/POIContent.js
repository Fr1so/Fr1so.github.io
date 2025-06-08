export default class POIContent {
    constructor(name, audioFile, image, question = null, options = [], correctAnswer, funFact) {
        this.name = name;
        this.audio = new Audio(audioFile);
        this.image = image;
        this.question = question;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.funFact = funFact;
    }

    getTitle() {
        return this.name;
    }

    getImage() {
        return this.image;
    }

    getQuestion() {
        return this.question;
    }

    getAnswerOptions() {
        return this.options;
    }

    getCorrectAnswer() {
        return this.correctAnswer;
    }

    isMultipleChoice() {
        return Array.isArray(this.correctAnswer);
    }

    hasImageOptions() {
        return this.options.some(opt => typeof opt === 'object' && opt.image);
    }

    getFunFact() {
        return this.funFact;
    }

    getAudio() {
        return this.audio;
    }
}