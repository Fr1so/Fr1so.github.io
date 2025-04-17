export default class POIContent {
    constructor(name, content, audioFile) {
        this.name = name;
        this.content = content;
        this.audio = new Audio(audioFile);
    }

    getContent(){
        return `
        <h2>${this.name}</h2>
        <span>${this.content}</span>
        `
    }

    getAudio() {
        return this.audio;
    }
}