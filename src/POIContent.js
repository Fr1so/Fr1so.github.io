export default class POIContent {
    constructor(name, content) {
        this.name = name;
        this.content = content;
    }

    getContent(){
        return `
        <h2>${this.name}</h2>
        <span>${this.content}</span>
        `
    }
}