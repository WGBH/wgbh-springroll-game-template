import {IRender,CaptionLine} from 'springroll';

export default class CaptionRender extends PIXI.Container implements IRender {

    public args:any;
    public text:PIXI.Text;
    public captionsElement:HTMLElement;

    constructor() {
        super();
        this.captionsElement = document.getElementById("captions");
        this.captionsElement.style.visibility = "hidden";
    }

    start(args:any) {
        this.args = args;
        this.captionsElement.style.visibility = "visible";
    }

    stop() {
        this.captionsElement.style.visibility = "hidden";
    }

    lineBegin(line:CaptionLine) {
        this.captionsElement.innerHTML = line.content;
    }

    lineEnd() {
        this.captionsElement.innerHTML = '';
    }
}