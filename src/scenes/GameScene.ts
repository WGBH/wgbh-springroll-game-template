import { Scene, AssetList } from 'wgbh-springroll-game';
import * as GameArt from '../assets/Game';

export default class GameScene extends Scene {

    private art: Art;

    private tvOn = false;

    private counter:number;

    preload():AssetList{
        return [
            {type:'animate', id:'gameArt', stage:GameArt.stage, cacheInstance:true},
            {type:'sound', id:'tvOn', path:'sounds/on.{ogg,mp3}'},
            {type:'sound', id:'tvOff', path:'sounds/off.{ogg,mp3}', volume:0.3}
        ];
    }

    setup(){
        this.dataStore.score = 0;
        this.art = this.cache.animations.gameArt as Art;
        this.art.remote.button.gotoAndStop(0);
        this.art.screen.gotoAndStop(0);
        this.addChild(this.art);
    }

    start(){
        this.art.remote.cursor = 'pointer';
        this.art.remote.interactive = true;
        this.art.remote.on('pointerdown', this.buttonDown);
        this.art.remote.on('pointerup', this.buttonUp);
        this.art.remote.on('pointerupoutside', this.buttonUp);
        this.art.remote.on('pointertap', this.toggleTV);

        this.art.screen.cursor = 'pointer';
        this.art.screen.on('pointertap', ()=>{
            this.changeScene('congratulation');
        });
    }

    toggleTV = ()=>{
        this.art.remote.interactive = false;
        if(this.tvOn){
            clearInterval(this.counter);
            this.art.screen.interactive = false;
            this.sound.play('tvOff');
            PIXI.animate.Animator.play(this.art.screen, 'turnOff', this.enableRemote);
        }
        else{
            this.sound.play('tvOn');
            PIXI.animate.Animator.play(this.art.screen, 'turnOn', this.watchTV);
        }
        this.tvOn = !this.tvOn;
    }

    watchTV = ()=>{
        this.enableRemote();
        this.art.screen.interactive = true;
        PIXI.animate.Animator.play(this.art.screen, 'watchTV');
        this.counter = setInterval(this.countTime, 1000);
    }

    countTime = ()=>{
        this.dataStore.score++;
    }

    enableRemote = ()=>{
        this.art.remote.interactive = true;
    }

    buttonDown = ()=>{
        this.art.remote.button.gotoAndStop(1);
    }

    buttonUp = ()=>{
        this.art.remote.button.gotoAndStop(0);
    }

    cleanup(){
        clearInterval(this.counter);
    }
}

interface Art extends PIXI.animate.MovieClip {
    remote: PIXI.animate.MovieClip & {
        button: PIXI.animate.MovieClip;
    };
    screen: PIXI.animate.MovieClip;
}