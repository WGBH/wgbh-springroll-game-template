import { CompleteCallback, IMediaInstance, Sound } from '@pixi/sound';
import { Point } from 'pixi.js';
import { Scene, PauseableTimer, Tween } from 'wgbh-springroll-game';
import { CONFIG } from '../config/config';
import { BG_VOL_MAX, BG_VOL_MIN, MUSIC_FADE_RATE } from '../helpers/Config';
import { PuppetMouth, RhubarbConfig } from '../helpers/puppet/PuppetMouth';

export default class BaseScene extends Scene {

   protected art: any;
   protected sharedLib: any;
   protected currentSound: IMediaInstance;
   protected currentMusic: IMediaInstance;
   protected currentSoundStr: string = "";
   protected currentMusicStr: string = "";
   protected currentVOStr: string = "";
   protected currentVO: string | PauseableTimer;
   protected lipsyncMouth: PuppetMouth;
   protected lipsyncData: RhubarbConfig = CONFIG.lipsync as RhubarbConfig;

   private voActive: boolean = false;
   private lipsyncActive: boolean = false;
   private fadeMusic: boolean = false;
   private fadeIn: boolean = false;
   private targetVol: number = 0;
   private vol: number = 0;

   setup() {
      super.setup();
      this.resize(this.stageManager.leftEdge, this.stageManager.rightEdge, this.stageManager.offset);
   }

   playVO(alias: string | Function | number | (string | Function | number)[], cb?: CompleteCallback, lipsync: boolean = false) {
      if (process.env.NODE_ENV === 'development') {
         console.log('playing VO: ', alias);
      }
      if (!alias) {
         return console.error('no alias');
      }
      if (typeof alias === 'function') {
         alias();
         if (cb) {
            cb(null);
         }
         return;
      }
      if (typeof alias === 'number') {
         if (cb) {
            this.currentVO = this.setTimeout(cb, alias);
         }
         return;
      }
      if (typeof alias !== 'string') {
         if (alias.length === 1) {
            this.playVO(alias[0], cb);
            return;
         }
         else {
            this.playVO(alias[0], () => {
               (alias as string[]).splice(0, 1);
               this.playVO(alias, cb);
            });
            return;
         }
      }
      this.stopVO();
      this.stageManager.showCaption(alias);
      this.currentVO = alias;
      this.currentVOStr = alias;
      this.lipsyncActive = lipsync;
      this.voActive = true;
      if (this.currentMusicStr !== '') {
         this.changeMusicVol(BG_VOL_MIN);
      }
      let sound = this.sound.play(alias, sound => {
         this.stopVO();
         if (cb) {
            cb(sound);
         }
      }) as IMediaInstance;
      if (lipsync) {
         // do lip sync
         this.lipsyncMouth.lipSync(sound, this.lipsyncData[alias]);
      }
      return sound;
   }

   stopVO = () => {
      this.voActive = false;
      this.stageManager.stopCaption();
      if (this.currentVO) {
         if (typeof this.currentVO === 'string') {
            this.sound.stop(this.currentVO);
            this.currentVO = null;
         }
         else {
            this.currentVO.destroy();
            this.currentVO = null;
         }
      }
      if (this.lipsyncActive) {
         if (this.lipsyncMouth) {
            this.lipsyncMouth.stop();
         }
         this.lipsyncActive = false;
      }
      if (this.currentMusicStr !== '') {
         this.changeMusicVol(BG_VOL_MAX);
      }
   };

   playMusic(id: string) {
      if (this.currentMusicStr === id && !this.currentMusic.paused) {
         return;
      }
      if (this.currentMusic) {
         this.currentMusic.stop();
      }
      this.fadeMusic = false;
      this.currentMusicStr = id;
      this.currentMusic = this.sound.play(this.currentMusicStr) as IMediaInstance;
      this.currentMusic.loop = true;
      this.setMusicVol(0);
      this.changeMusicVol(BG_VOL_MAX);
   }

   changeMusicVol(newVol: number) {
      this.fadeIn = (this.vol < newVol);
      this.targetVol = newVol;
      this.fadeMusic = true;
   }

   setMusicVol = (vol: number, id: string = this.currentMusicStr) => {
      this.vol = vol;
      this.sound.setVolume(id, vol);
   };

   checkSoundFade() {
      if (this.fadeMusic) {
         if (this.fadeIn && this.vol < this.targetVol) {
            //fade in music
            this.vol += MUSIC_FADE_RATE;
            const vol = (this.vol <= this.targetVol) ? this.vol : this.targetVol;
            this.setMusicVol(vol);

            if (this.vol >= this.targetVol) {
               this.vol = this.targetVol;
               this.fadeMusic = false;
               this.fadeIn = false;
            }
         }
         else if (!this.fadeIn && this.vol > this.targetVol) {
            //fade out music
            this.vol -= MUSIC_FADE_RATE;
            const vol = (this.vol >= this.targetVol) ? this.vol : this.targetVol;
            this.setMusicVol(vol);
            if (this.vol <= this.targetVol) {
               //music faded out to target
               this.vol = this.targetVol;
               this.fadeMusic = false;
               if (this.vol === 0) {
                  this.currentMusic.stop();
               }
            }
         }
      }
   }

   playSFX(alias: string, loop: boolean = false, vol: number = 1) {
      let sound = this.sound.getSound(alias) as Sound;
      sound.loop = loop;
      sound.play();
      this.setMusicVol(vol, alias);
      return sound;
   }

   stopAllSound(music: boolean = true) {
      this.stopVO();
      if (this.currentMusic && music) {
         this.currentMusic.stop();
         this.currentMusic = null;
      }
   }

   resize(w: number, h: number, offset: Point) {
      super.resize(w, h, offset);
   }

   update(delta: number) {
      super.update(delta);
      this.checkSoundFade();

   }

   cleanup() {
      //cleanup
      super.cleanup();
      this.stopAllSound();
      Tween.removeAllTweens();
      PauseableTimer.clearTimers();
      if (this.lipsyncMouth) {
         this.lipsyncMouth.cleanup();
      }
      this.lipsyncMouth = null;
      this.art = null;
      this.sharedLib = null;
      this.lipsyncData = null;
   }
}