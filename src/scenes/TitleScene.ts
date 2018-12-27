import { Scene, AssetList } from 'wgbh-springroll-game';

export default class TitleScene extends Scene {

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
        const logo = new PIXI.Sprite(this.assets.images.logo);
        logo.x = 1250;
        logo.y = 600;
        this.addChild(logo);
    }

    start(){
        this.interactive = true;
        this.cursor = 'pointer';
        this.once('pointertap', ()=>{
            this.cursor = 'normal';
            this.changeScene('game');
        });
    }
}