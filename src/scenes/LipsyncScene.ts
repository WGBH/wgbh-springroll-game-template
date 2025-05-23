import { Scene, AssetList } from 'wgbh-springroll-game';
import * as ArtAsset from '../assets/Lipsync';
import * as Puppet from '../helpers/puppet/PuppetMouth';
import {CONFIG} from '../config/config';
import { MovieClip } from '@pixi/animate';
import { IMediaInstance } from '@pixi/sound';
import { FederatedPointerEvent } from 'pixi.js';

export default class LipsyncScene extends Scene {

    private art: Art;

    /* README FOR SET-UP

        Captions and Lipsync are generated with a similar process. You can have one or the other or both.

        (reference the package.json file for variable definitions, e.g. captionconf.audioDirectory)

        A. to generate captions:

        prerequisites: 
            - src/config/captions.txt, which is a tsv of [filename \t captiontext]
            - audio files in the captionconf.audioDirectory, e.g. static/sounds/vo/filename.ogg
        run the command below to generate captions.json: (the command also compresses and copies result to config.ts)
        > npm run quickcaptions (this will process only stuff in captions.txt) => makes/updates/appends captions.json in your captionconf.outputDirectory

        B. to generate lipsync:

        software:
            - install rhubarb globally, since you will run this from cli (https://github.com/DanielSWolf/rhubarb-lip-sync/releases)
            - set the path for rhubarbconf.rhubarbBinary in your package.json file, e.g. "rhubarbBinary": "/Applications/rhubarb-lip-sync-1.10.0-osx/rhubarb"
        prerequisites:
            - src/config/captions.txt, which is a tsv of [filename \t captiontext] (or whatever file is in rhubarbconf.audioListFile location)
            - audio files in the  rhubarbconf.audioDirectory (same audio for captions)
         run the command below to generate lipsync.json: (the command also compresses and copies result to config.ts)
        > npm run rhubarb => makes/updates/appends lipsync.json file in rhubarbconf.outputDirectory

        use config.lipsync and config.captions in your code. See this file for examples.

        note that running the rhubarb will replace existing entries and add new entries (it will not delete existing entries, same for the captions). If you want to delete the contents of lipsync.json then do it manually.
    */

    private mouthpuppet:Puppet.PuppetMouth;

    private lipsync = CONFIG.lipsync as Puppet.RhubarbConfig;

    private current_soundinstance: IMediaInstance;

    preload():AssetList{
        return [
            {type:'animate', id:'Art', asset:ArtAsset, cacheInstance:true},
            {type:'sound',id:'hello',path:['sounds/vo/hello.ogg', 'sounds/vo/hello.mp3'],context:'vo'},
            {type:'sound',id:'bye',path:['sounds/vo/bye.ogg', 'sounds/vo/bye.mp3'],context:'vo'}
        ];
    }

    setup(){
        this.art = this.cache.animations.Art as Art;
        this.addChild(this.art);
        this.mouthpuppet = new Puppet.PuppetMouth(this.art.mouth);
        this.mouthpuppet.rest();

        this.eventMode = 'none';

        this.art.playBtn.cursor = 'pointer';
        this.art.playBtn.eventMode = 'static';
        this.art.playBtn.on('pointerup', (ev:FederatedPointerEvent) => {
            this.stageManager.showCaption('hello');
            this.playPuppetExample(this.mouthpuppet, "hello");
        } );

        this.art.stopBtn.cursor = 'pointer';
        this.art.stopBtn.eventMode = 'static';
        this.art.stopBtn.on('pointerup', (ev:FederatedPointerEvent) => {
            this.stopPuppetExample(this.mouthpuppet);
        } );

        this.art.homeBtn.cursor = 'pointer';
        this.art.homeBtn.eventMode = 'static';
        this.art.homeBtn.on('pointerup', (ev:FederatedPointerEvent) => {  
            this.stopPuppetExample(this.mouthpuppet);
            this.changeScene('game');
        } );
    }

    start(){
        this.eventMode = 'passive';
    }

    stopPuppetExample = (mouthpuppet:Puppet.PuppetMouth) => {

        // used to completely shut down the puppet, captions, etc
        console.log("stop the sound, lipsync, and captions");   
        if(this.current_soundinstance){
            this.current_soundinstance.stop(); // hopefully that won't mess up the this.sound.vo
        }
        mouthpuppet.stop();
        this.stageManager.stopCaption();
    }

    playPuppetExample = (mouthpuppet:Puppet.PuppetMouth, soundname: string) => {

        if(this.lipsync[soundname]) {
            this.current_soundinstance = this.sound.play(soundname) as IMediaInstance;
            mouthpuppet.lipSync(this.current_soundinstance, this.lipsync[soundname]);
        } else {
            console.warn("No lipsync for ", soundname);
        }
    }

    cleanup(){    
        // emtpy
    }
}

interface Art extends MovieClip {
    mouth: MovieClip;
    playBtn: MovieClip;
    stopBtn: MovieClip;
    homeBtn: MovieClip;
}
