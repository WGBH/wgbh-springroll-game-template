import { sound } from '@pixi/sound';
import { Game } from 'wgbh-springroll-game';
import { TextMetrics } from 'pixi.js';

/**
 * Repository for fixes to external library issues that are
 * either not yet released for the 3rd party library, or
 * are not ready/suitable for inclusion in the 3rd party library
 */
export default class Patches{
    static enableAll(game:Game){
        Patches.pixiSoundDisableAutopause();
        Patches.pixiSoundiOSSuspendFix(game);
        Patches.pixiTextBaselineFix();
    }

    /**
     * Pixi Sound has introduced new default behavior of automatically pausing audio on window focus loss.
     * This creates issues for our games, where we don't want to pause/resume audio separately from the rest of the game,.
     * We also don't want to pause just because a player clicks on UI elements outside of the iframe of the game.
     * 
     * Fixes issue first observed as robotic doubling-up/echo of audio on regaining lost focus.
     * 
     * TODO: This should probably be moved to our main library, as Pixi Sound does not intend to revert to the old default behavior.
     */
    static pixiSoundDisableAutopause(){
        sound.disableAutoPause = true; 
    }

    /**
     * Fix for Pixi Sound iOS web audio context suspension issue (failure to resume after backgrounding app)
     * Compatible with Pixi Sound v4
     * @param game instance of Game
     */
    static pixiSoundiOSSuspendFix(game:Game){
		const context = sound.context.audioContext;
		game.app.state.pause.subscribe((pause) => {
			if (!pause) {
				if (context.state === 'suspended' || (context.state as string) === 'interrupted' || (context.state as string) === 'suspending') {
					context.resume();
				}
			}
		});

		context.onstatechange = () => {
			if ((context.state === 'suspended' || (context.state as string) === 'interrupted' || (context.state as string) === 'suspending') && document.hasFocus() && !game.app.state.pause.value) {
				context.resume();
			}
		};

		window.addEventListener('focus', () => {
			if ((context.state === 'suspended' || (context.state as string) === 'interrupted' || (context.state as string) === 'suspending') && !game.app.state.pause.value) {
				context.resume();
			}
		});
    }

    /**
     * Pixi Text baseline and lineheight fix. 
     * Override Pixi default text measurements using new browser TextMetrics features
     * Text baseline positioning and line spacing should be much more consistent with Adobe Animate
     * Compatible with Pixi v6
     */
    static pixiTextBaselineFix(){
        interface IFontMetrics
        {
            ascent: number;
            descent: number;
            fontSize: number;
        }

        TextMetrics.measureFont = function(font: string): IFontMetrics
        {
            // as this method is used for preparing assets, don't recalculate things if we don't need to
            if (TextMetrics._fonts[font])
            {
                return TextMetrics._fonts[font];
            }

            const properties: IFontMetrics = {
                ascent: 0,
                descent: 0,
                fontSize: 0,
            };

            const canvas = TextMetrics._canvas;
            const context = TextMetrics._context;

            context.font = font;

            const metricsString = TextMetrics.METRICS_STRING + TextMetrics.BASELINE_SYMBOL;
            const metricsMeasurement = context.measureText(metricsString);

            // WGBH Edit: use modern calculations where possible to get more accurate baseline placement and line heights.
            if(metricsMeasurement.fontBoundingBoxAscent || metricsMeasurement.fontBoundingBoxDescent){
                    properties.ascent = metricsMeasurement.fontBoundingBoxAscent || 0;
                    properties.descent = metricsMeasurement.fontBoundingBoxDescent || 0;
                    properties.fontSize = properties.ascent + properties.descent;
            }
            else{//original behavior fallback for old browsers
                const width = Math.ceil(metricsMeasurement.width);
                let baseline = Math.ceil(context.measureText(TextMetrics.BASELINE_SYMBOL).width);
                const height = Math.ceil(TextMetrics.HEIGHT_MULTIPLIER * baseline);
            
                baseline = baseline * TextMetrics.BASELINE_MULTIPLIER | 0;
            
                canvas.width = width;
                canvas.height = height;
            
                context.fillStyle = '#f00';
                context.fillRect(0, 0, width, height);
            
                context.font = font;
            
                context.textBaseline = 'alphabetic';
                context.fillStyle = '#000';
                context.fillText(metricsString, 0, baseline);
            
                const imagedata = context.getImageData(0, 0, width, height).data;
                const pixels = imagedata.length;
                const line = width * 4;
            
                let i = 0;
                let idx = 0;
                let stop = false;
            
                // ascent. scan from top to bottom until we find a non red pixel
                for (i = 0; i < baseline; ++i)
                {
                    for (let j = 0; j < line; j += 4)
                    {
                        if (imagedata[idx + j] !== 255)
                        {
                            stop = true;
                            break;
                        }
                    }
                    if (!stop)
                    {
                        idx += line;
                    }
                    else
                    {
                        break;
                    }
                }
            
                properties.ascent = baseline - i;
            
                idx = pixels - line;
                stop = false;
            
                // descent. scan from bottom to top until we find a non red pixel
                for (i = height; i > baseline; --i)
                {
                    for (let j = 0; j < line; j += 4)
                    {
                        if (imagedata[idx + j] !== 255)
                        {
                            stop = true;
                            break;
                        }
                    }
            
                    if (!stop)
                    {
                        idx -= line;
                    }
                    else
                    {
                        break;
                    }
                }
            
                properties.descent = i - baseline;
                properties.fontSize = properties.ascent + properties.descent;
            }


            TextMetrics._fonts[font] = properties;

            return properties;
        };
    }
}