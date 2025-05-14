import { Graphics } from '@pixi/graphics';
import { Sprite } from '@pixi/sprite';
import { Text } from '@pixi/text';
import { Point } from 'pixi.js';
import { Scene, AssetList, Tween, Game } from 'wgbh-springroll-game';

export default class TitleScene extends Scene {

    private logo:Sprite;

    preload():AssetList{
        return [
            {type:'manifest', path:'testManifest.json'},
        ];
    }

    setup(){
        console.log('did we load the demo config?', this.cache.data.demoConfig);
        const background = new Graphics();
        background.beginFill(0xDDDDDD);
        background.drawRect(0, 0, 1624, 750);
        background.endFill();
        this.addChild(background);
        const title = new Text('Game Template', {align: 'center', fontSize: 72, fontFamily: 'Arial'});
        title.x = 1624/2;
        title.y = 750/2;
        title.anchor.x = 0.5;
        title.anchor.y = 0.5;
        this.addChild(title);
        this.logo = new Sprite(this.cache.images.logo);
        this.logo.y = -this.logo.height;
        this.resize();
        this.addChild(this.logo);
        this.eventMode = 'none';
        this.once('pointertap', ()=>{
            this.cursor = 'normal';
            this.changeScene('game');
        });
    }

    start(){
        Tween.get(this.logo).to({y:550}, 1500, 'bounceOut');
        this.eventMode = 'static';
        this.cursor = 'pointer';
    }


    resize(width?: number, height?: number, offset?: Point): void {
        console.log('width', width, 'height', height, 'offsetX', offset?.x, 'offsetY', offset?.y, this.stageManager.offset.x, this.stageManager.offset.y);
        this.logo.x = (this.stageManager.viewFrame.value.right - 286);
    }

    cleanup(): void {
        Tween.removeAllTweens();
    }
}