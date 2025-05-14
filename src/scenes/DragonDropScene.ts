import { AssetList, Scene } from "wgbh-springroll-game";
import DragonDropArt from '../assets/DragonDrop';
import { MovieClip } from "@pixi/animate";
import { Container, Point } from "pixi.js";
import DragManager from "../helpers/DragManager";

interface Art extends MovieClip{
    homeButton:Container;
    triangle:Container;
    square:Container;
    circle:Container;
}

export default class DragonDropScene extends Scene {

    art:Art;
    dragManager:DragManager;

    preload():AssetList{
        return [
            {type:'animate', id:'dragonDropArt', asset:DragonDropArt, cacheInstance:true},
        ];
    }

    setup(): Promise<any> | void {
        this.art = this.cache.animations.dragonDropArt as Art;
        this.addChild(this.art);
        this.dragManager = new DragManager(this, this, 'desktop', this.getBounds());
        this.dragManager.addObject(this.art.triangle);
        this.dragManager.addObject(this.art.circle);
        this.dragManager.addObject(this.art.square);
        this.eventMode = 'none';

        this.art.homeButton.once('pointertap', ()=>{
            this.changeScene('game');
        });
        this.art.homeButton.cursor = 'pointer';
        this.art.homeButton.eventMode = 'static';

        this.resize();
    }

    start(): void {
        //Scene must be interactive for pointermove events to fire in DragManager
        this.eventMode = 'static';
    }

    update(deltaTime: number): void {
        //Tell DragManager to update position of objects each frame:
        this.dragManager?.update();
    }

    resize(): void {
        this.art.homeButton.x = 100 - this.stageManager.offset.x;
    }

}