export default class POIContent {
    constructor(name, content, audioFile, question = null, options = [], correctAnswer = null) {
        this.name = name;
        this.content = content;
        this.audio = new Audio(audioFile);
        this.question = question;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }

    getTitle() {
        return this.name;
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

    getAudio() {
        return this.audio;
    }
}