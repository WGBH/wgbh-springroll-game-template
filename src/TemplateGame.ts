import {Game} from 'wgbh-springroll-game';
import TitleScene from './scenes/TitleScene';
import GameScene from './scenes/GameScene';
import CongratulationScene from './scenes/CongratulationScene';

export default class TemplateGame extends Game{

    gameReady(){
        this.addScenes({
            title: TitleScene,
            game: GameScene,
            congratulation: CongratulationScene
        });
        this.changeScene('title');
    }
}