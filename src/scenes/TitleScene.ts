import { Scene, AssetList } from 'wgbh-springroll-game';

export default class TitleScene extends Scene {

    private logo:PIXI.Sprite;

    preload():AssetList{
        return [
            {type:'image', id:'logo', path:'img/logo.png'}
        ];
    }

    setup(){
        const background = new PIXI.Graphics();
        background.beginFill(0xDDDDDD);
        background.drawRect(0, 0, 1536, 768);
        background.endFill();
        this.addChild(background);
        const title = new PIXI.Text('Game Template', {align: 'center', fontSize: 72, fontFamily: 'Arial'});
        title.x = 1536/2;
        title.y = 768/2;
        title.anchor.x = 0.5;
        title.anchor.y = 0.5;
        this.addChild(title);
        this.logo = new PIXI.Sprite(this.cache.images.logo);
        this.logo.x = 1250;
        this.logo.y = -this.logo.height;
        this.addChild(this.logo);
    }

    start(){
        this.tween(this.logo, {y:600}, 120, 'bounceOut').promise.then(this.activate);
    }

    activate = ()=>{
        this.interactive = true;
        this.cursor = 'pointer';
        this.once('pointertap', ()=>{
            this.cursor = 'normal';
            this.changeScene('game');
        });
    }
}