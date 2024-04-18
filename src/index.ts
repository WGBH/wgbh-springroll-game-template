import TemplateGame from './TemplateGame';
import * as Transition from './assets/Transition';
import { CONFIG } from './config/config';
import CaptionRender from './helpers/CaptionRender';
import Patches from './helpers/Patches';

const game = new TemplateGame({
    containerID: 'content',
    width:1624,
    height:750,
    altWidth:1000,
    transition: Transition,
    captions:{
        config:CONFIG.captions,
        display: new CaptionRender()
    },
    springRollConfig: {
        features: {
            sound:true,
            soundVolume:true,
            vo:true,
            voVolume:true,
            sfx:true,
            sfxVolume:true,
            music:true,
            musicVolume:true,
            captions:true
        }
    }
});

//for accessing game from the console at runtime:
(window as any).game = game;

//Enable all patches to external library bugs, etc.
Patches.enableAll(game);