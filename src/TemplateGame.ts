import {Game} from 'wgbh-springroll-game';
import TitleScene from './scenes/TitleScene';
import GameScene from './scenes/GameScene';

export default class TemplateGame extends Game{

    gameReady(){
        this.addScenes({
            title: TitleScene,
            game: GameScene
        });
        this.changeScene('title');
    }
}