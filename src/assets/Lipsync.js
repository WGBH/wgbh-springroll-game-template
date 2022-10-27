const data = {
    version: 2,
    stage: null,
    background: 0xffffff,
    width: 1536,
    height: 768,
    framerate: 30,
    totalFrames: 1,
    assets: {
        "Lipsync": "images/Lipsync.shapes.txt",
        "Lipsync_atlas_1": "images/Lipsync_atlas_1.json"
    },
    lib: {},
    shapes: {},
    textures: {},
    spritesheets: [],
    getTexture: function (id) {
        if (data.textures[id]) {
            return data.textures[id];
        }
        const atlas = data.spritesheets.find(atlas => !!atlas.textures[id]);
        return atlas ? atlas.textures[id] : null;
    },
    setup: function (animate) {
        const MovieClip = animate.MovieClip;
        const Container = animate.Container;
        const Sprite = animate.Sprite;
        const Text = animate.Text;
        const Graphics = animate.Graphics;


        data.lib.HomeIcon = class extends Container {
            constructor() {
                super();
                const instance1 = new Sprite(data.getTexture("HomeIcon1"))
                    .setTransform(-26, -22);
                this.addChild(instance1);
            }
        };

        data.lib.ButtonShape = class extends Container {
            constructor() {
                super();
                const instance1 = new Sprite(data.getTexture("ButtonShape1"))
                    .setTransform(-52, -52);
                this.addChild(instance1);
            }
        };

        data.lib.HomeBtn = class extends Container {
            constructor() {
                super();
                const instance2 = new data.lib.ButtonShape()
                    .setTransform(-2);
                const instance1 = new data.lib.HomeIcon()
                    .setTransform(-2);
                this.addChild(instance2, instance1);
            }
        };

        data.lib.StopBtn = class extends Container {
            constructor() {
                super();
                const instance2 = new data.lib.ButtonShape()
                    .setTransform(-2);
                const instance1 = new Graphics()
                    .drawCommands(data.shapes.Lipsync[0]);
                this.addChild(instance2, instance1);
            }
        };

        data.lib.PlayIcon = class extends Container {
            constructor() {
                super();
                const instance1 = new Sprite(data.getTexture("PlayIcon1"))
                    .setTransform(-25, -30);
                this.addChild(instance1);
            }
        };

        data.lib.PlayBtn = class extends Container {
            constructor() {
                super();
                const instance2 = new data.lib.ButtonShape();
                const instance1 = new data.lib.PlayIcon()
                    .setTransform(8.95, -1.05);
                this.addChild(instance2, instance1);
            }
        };

        data.lib.Child1_Mouth_LipSync = class extends MovieClip {
            constructor() {
                super({
                    duration: 9,
                    labels: {
                        A: 0,
                        B: 1,
                        C: 2,
                        D: 3,
                        E: 4,
                        F: 5,
                        G: 6,
                        H: 7,
                        X: 8
                    }
                });
                const instance1 = new Sprite(data.getTexture("Child1_Mouth_LipSync1"));
                const instance2 = new Sprite(data.getTexture("Child1_Mouth_LipSync2"));
                const instance3 = new Sprite(data.getTexture("Child1_Mouth_LipSync3"));
                const instance4 = new Sprite(data.getTexture("Child1_Mouth_LipSync4"));
                const instance5 = new Sprite(data.getTexture("Child1_Mouth_LipSync5"));
                const instance6 = new Sprite(data.getTexture("Child1_Mouth_LipSync6"));
                const instance7 = new Sprite(data.getTexture("Child1_Mouth_LipSync7"));
                const instance8 = new Sprite(data.getTexture("Child1_Mouth_LipSync8"));
                const instance9 = new Sprite(data.getTexture("Child1_Mouth_LipSync9"))
                    .setTransform(-11, -6);
                this.addTimedChild(instance1, 0, 1, {
                        "0": {
                            x: -16,
                            y: -1
                        }
                    })
                    .addTimedChild(instance2, 1, 1, {
                        "1": {
                            x: -25,
                            y: -4
                        }
                    })
                    .addTimedChild(instance3, 2, 1, {
                        "2": {
                            x: -19,
                            y: -4
                        }
                    })
                    .addTimedChild(instance4, 3, 1, {
                        "3": {
                            x: -21,
                            y: -6
                        }
                    })
                    .addTimedChild(instance5, 4, 1, {
                        "4": {
                            x: -17,
                            y: -4
                        }
                    })
                    .addTimedChild(instance6, 5, 1, {
                        "5": {
                            x: -29,
                            y: -5
                        }
                    })
                    .addTimedChild(instance7, 6, 1, {
                        "6": {
                            x: -22,
                            y: -4
                        }
                    })
                    .addTimedChild(instance8, 7, 1, {
                        "7": {
                            x: -21
                        }
                    })
                    .addTimedChild(instance9, 8, 1);
            }
        };

        data.lib.Lipsync = class extends MovieClip {
            constructor() {
                super({
                    duration: 1,
                    framerate: 30
                });
                const instance7 = new Graphics()
                    .drawCommands(data.shapes.Lipsync[1])
                    .setTransform(-5.15, -2.6);
                const instance6 = new Sprite(data.getTexture("Body"))
                    .setTransform(658, 230);
                const instance5 = new data.lib.Child1_Mouth_LipSync()
                    .setTransform(762.95, 376, 1, 1, 0, 0, 3.142);
                this[instance5.name = "mouth"] = instance5;
                const instance4 = new data.lib.PlayBtn()
                    .setTransform(754.65, 585.45);
                this[instance4.name = "playBtn"] = instance4;
                const instance3 = new data.lib.StopBtn()
                    .setTransform(915, 585.45);
                this[instance3.name = "stopBtn"] = instance3;
                const instance2 = new Text("Lipsync")
                    .setStyle({
                        fontFamily: "Arial Black",
                        fontSize: 43,
                        fill: "#fff",
                        leading: 2
                    })
                    .setAlign("center")
                    .setTransform(763.2, 142.85);
                const instance1 = new data.lib.HomeBtn()
                    .setTransform(406.45, 90.85);
                this[instance1.name = "homeBtn"] = instance1;
                this.addChild(instance7, instance6, instance5, instance4, instance3, instance2, instance1);
            }
        };
        data.stage = data.lib.Lipsync;
    }
};
module.exports = data;