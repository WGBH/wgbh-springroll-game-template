import {Game} from 'wgbh-springroll-game';
import TitleScene from './scenes/TitleScene';
import GameScene from './scenes/GameScene';
import LipsyncScene from './scenes/LipsyncScene'; 
import CongratulationScene from './scenes/CongratulationScene';
import DragonDropScene from './scenes/DragonDropScene';

export default class TemplateGame extends Game{

    gameReady(){
        this.addScenes({
            title: TitleScene,
            game: GameScene,
            lipsync: LipsyncScene,
            drag: DragonDropScene,
            congratulation: CongratulationScene
        });
        this.changeScene('title');
    }
}