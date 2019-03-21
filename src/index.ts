/// <reference types='pixi-sound' />
/// <reference types='pixi-animate' />
/// <reference types='springroll' />
import 'pixi.js';
import 'pixi-sound';
import 'pixi-animate';
import TemplateGame from './TemplateGame';
import * as Transition from './assets/Transition';

const game = new TemplateGame({
    containerID: 'content',
    width:1536,
    height:768,
    altWidth:1024,
    transition: Transition.stage,
    springRollConfig: {
        features: {
            sound:true
        }
    }
});