import { Graphics } from '@pixi/graphics';
import { Text } from '@pixi/text';
import BaseScene from './BaseScene';

export default class CongratulationScene extends BaseScene {
    setup() {
        const background = new Graphics();
        background.beginFill(0xDDDDDD);
        background.drawRect(0, 0, 1624, 750);
        background.endFill();
        this.addChild(background);
        const title = new Text('Congratulation:', { align: 'center', fontSize: 72, fontFamily: 'Arial' });
        title.x = 750;
        title.y = 360;
        title.anchor.x = 0.5;
        title.anchor.y = 0.5;
        this.addChild(title);

        const score = new Text(
            `You watched ${this.dataStore.score} seconds of TV!`,
            { align: 'center', fontSize: 42, fontFamily: 'Arial' }
        );
        score.x = 750;
        score.y = 450;
        score.anchor.x = 0.5;
        score.anchor.y = 0.5;
        this.addChild(score);
    }

    start() {
        this.interactive = true;
        this.cursor = 'pointer';
        this.on('pointertap', () => { this.changeScene('title'); });
    }
}