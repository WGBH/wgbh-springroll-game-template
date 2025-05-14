import { Animator, MovieClip } from '@pixi/animate';
import { Scene, AssetList, PauseableTimer } from 'wgbh-springroll-game';
import * as GameArt from '../assets/Game';
import { Container, Sprite } from 'pixi.js';

export default class GameScene extends Scene {

    private art: Art;

    private tvOn = false;

    private counter:PauseableTimer;

    preload():AssetList{
        return [
            {type:'animate', id:'gameArt', asset:GameArt, cacheInstance:true},
            {type:'sound', id:'tvOn', path:['sounds/sfx/on.ogg', 'sounds/sfx/on.mp3'],context:'sfx'},
            {type:'sound', id:'tvOff', path:['sounds/sfx/off.ogg', 'sounds/sfx/off.mp3'], volume:0.3,context:'sfx'},
            {type:'sound',id:'hello',path:['sounds/vo/hello.ogg', 'sounds/vo/hello.mp3'],context:'vo'},
            {type:'sound',id:'bye',path:['sounds/vo/bye.ogg', 'sounds/vo/bye.mp3'],context:'vo'},
            {type:'spritesheet', id:'ruff', path:'images/Game_atlas_1.json'}
        ];
    }

    setup(){
        this.art = this.cache.animations.gameArt as Art;
        this.art.remote.button.gotoAndStop(0);
        this.art.screen.gotoAndStop(0);
        this.addChild(this.art);
        this.addChild(new Sprite(this.cache.spritesheets.ruff.textures['Adult1_Body1']));
        this.eventMode = 'none';

        this.art.remote.cursor = 'pointer';
        this.art.remote.eventMode = 'static';
        this.art.remote.on('pointerdown', this.buttonDown);
        this.art.remote.on('pointerup', this.buttonUp);
        this.art.remote.on('pointerupoutside', this.buttonUp);
        this.art.remote.on('pointertap', this.toggleTV);

        this.art.lipsyncScene.cursor = 'pointer';
        this.art.lipsyncScene.eventMode = 'static';
        this.art.lipsyncScene.on('pointerup', ()=>{
            this.changeScene('lipsync');
        });

        this.art.dragScene.cursor = 'pointer';
        this.art.dragScene.eventMode = 'static';
        this.art.dragScene.on('pointerup', ()=>{
            this.changeScene('drag');
        });

        this.art.screen.cursor = 'pointer';
        this.art.screen.on('pointertap', ()=>{
            this.changeScene('congratulation');
        });
    }

    get score():number{
        if(!this.dataStore.score){
            this.dataStore.score = 0;
        }
        return this.dataStore.score;
    }
    set score(score:number){
        this.dataStore.score = score;
    }

    start(){
        //passive mode allows pointer events from child objects, but not on this element
        this.eventMode = 'passive';
    }

    toggleTV = ()=>{
        this.art.remote.eventMode = 'none';
        if(this.tvOn){
            this.clearInterval(this.counter);
            this.art.screen.eventMode = 'none';
            this.sound.play('tvOff');
            Animator.play(this.art.screen, 'turnOff', this.enableRemote);
            this.sound.play('bye');
            this.stageManager.showCaption('bye');            
        }
        else{
            this.sound.play('tvOn');
            Animator.play(this.art.screen, 'turnOn', this.watchTV);
            this.sound.play('hello');
            this.stageManager.showCaption('hello');
        }
        this.tvOn = !this.tvOn;
    }

    watchTV = ()=>{
        this.enableRemote();
        this.art.screen.eventMode = 'static';
        Animator.play(this.art.screen, 'watchTV');
        this.counter = this.setInterval(this.countTime, 1000);
    }

    countTime = ()=>{
        this.score++;
    }

    enableRemote = ()=>{
        this.art.remote.eventMode = 'static';
    }

    buttonDown = ()=>{
        this.art.remote.button.gotoAndStop(1);
    }

    buttonUp = ()=>{
        this.art.remote.button.gotoAndStop(0);
    }

    cleanup(){
        this.clearInterval(this.counter);
    }
}

interface Art extends MovieClip {
    remote: MovieClip & {
        button: MovieClip;
    };
    screen: MovieClip;
    lipsyncScene: MovieClip;
    dragScene:Container;
}