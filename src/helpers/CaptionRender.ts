import { Container } from '@pixi/display';
import { Text } from '@pixi/text';
import {IRender} from 'springroll';

export default class CaptionRender extends Container implements IRender {

    public text:Text;
    public captionsElement:HTMLElement;

    constructor() {
        super();
        this.captionsElement = document.getElementById("captions");
        this.captionsElement.style.visibility = "hidden";
    }

    start() {
        this.captionsElement.style.visibility = "visible";
    }

    stop() {
        this.captionsElement.style.visibility = "hidden";
    }

    //TODO: should be lineBegin(line:Timedline){, but current SpringRoll typings are wrong.
    lineBegin(line:any) {
        this.captionsElement.innerHTML = line.content;
    }

    lineEnd() {
        this.captionsElement.innerHTML = '';
    }
}