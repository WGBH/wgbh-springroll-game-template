const data = {
    version: 2,
    stage: null,
    background: 0xffffff,
    width: 1536,
    height: 768,
    framerate: 30,
    totalFrames: 1,
    assets: {
        "Game": "images/Game.shapes.txt"
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
        const Text = animate.Text;
        const Graphics = animate.Graphics;


        data.lib.LipsyncScene = class extends Container {
            constructor() {
                super();
                const instance2 = new Graphics()
                    .drawCommands(data.shapes.Game[0]);
                const instance1 = new Text("Lipsync w/ rhubarb")
                    .setStyle({
                        fontFamily: "Arial Rounded MT Bold",
                        fontSize: 18,
                        fill: "#fff",
                        leading: 2
                    })
                    .setTransform(-96.95, -10.35);
                this.addChild(instance2, instance1);
            }
        };

        data.lib.Paper = class extends Container {
            constructor() {
                super();
                const instance1 = new Graphics()
                    .drawCommands(data.shapes.Game[2]);
                this.addChild(instance1);
            }
        };

        data.lib.Button = class extends MovieClip {
            constructor() {
                super({
                    duration: 2
                });
                const instance3 = new Graphics()
                    .drawCommands(data.shapes.Game[5]);
                const instance2 = new Graphics()
                    .drawCommands(data.shapes.Game[4]);
                const instance1 = new Graphics()
                    .drawCommands(data.shapes.Game[3]);
                const instance4 = new Graphics()
                    .drawCommands(data.shapes.Game[6])
                    .setTransform(140.35, 38.75);
                this.addTimedChild(instance3, 0, 1)
                    .addTimedChild(instance2, 0, 1, {
                        "0": {
                            x: 140.35,
                            y: 38.75
                        }
                    })
                    .addTimedChild(instance1, 0, 1, {
                        "0": {
                            x: 140.35,
                            y: 28.85
                        }
                    })
                    .addTimedChild(instance4, 1, 1);
            }
        };

        data.lib.Remote = class extends Container {
            constructor() {
                super();
                const instance2 = new Graphics()
                    .drawCommands(data.shapes.Game[7]);
                const instance1 = new data.lib.Button()
                    .setTransform(-98.35, -37.2);
                this[instance1.name = "button"] = instance1;
                this.addChild(instance2, instance1);
            }
        };

        const Graphic1 = class extends MovieClip {
            constructor(mode) {
                super({ mode: mode, duration: 117, loop: false });
                const instance1 = new Graphics()
                    .drawCommands(data.shapes.Game[8]);
                this.addTimedChild(instance1);
            }
        };

        const Graphic3 = class extends MovieClip {
            constructor(mode) {
                super({ mode: mode, duration: 117, loop: false });
                const instance2 = new Graphics()
                    .drawCommands(data.shapes.Game[9]);
                const instance1 = new Graphic1(MovieClip.SYNCHED);
                this.addTimedChild(instance2)
                    .addTimedChild(instance1, 0, 117, {
                        "0": {
                            x: -9.4,
                            y: -45.95,
                            sy: 1
                        },
                        "36": {
                            y: -46,
                            sy: 0.109
                        },
                        "37": {
                            y: -46.023,
                            sy: 0.555
                        },
                        "38": {
                            y: -45.95,
                            sy: 1
                        },
                        "72": {
                            y: -46,
                            sy: 0.109
                        },
                        "73": {
                            y: -45.95,
                            sy: 1
                        },
                        "75": {
                            y: -46,
                            sy: 0.109
                        },
                        "76": {
                            y: -46.023,
                            sy: 0.555
                        },
                        "77": {
                            y: -45.95,
                            sy: 1
                        }
                    });
            }
        };

        const Graphic2 = class extends MovieClip {
            constructor(mode) {
                super({ mode: mode, duration: 123, loop: false });
                const instance1 = new Graphics()
                    .drawCommands(data.shapes.Game[10])
                    .setTransform(-744.2, -383.1);
                this.addTimedChild(instance1);
            }
        };

        data.lib.Screen = class extends MovieClip {
            constructor() {
                super({
                    duration: 123,
                    labels: {
                        turnOn: 0,
                        turnOn_stop: 19,
                        watchTV: 20,
                        watchTV_loop: 109,
                        turnOff: 110,
                        turnOff_stop: 122
                    }
                });
                const instance2 = new Graphics()
                    .drawCommands(data.shapes.Game[11])
                    .setTransform(-744.2, -383.1);
                const instance1 = new Graphic2(MovieClip.SYNCHED);
                const instance3 = new Graphic3(MovieClip.SYNCHED);
                this.addTimedChild(instance2)
                    .addTimedChild(instance1, 0, 123, {
                        "0": {
                            a: 0
                        },
                        "1": {
                            a: 0.05
                        },
                        "2": {
                            a: 0.11
                        },
                        "3": {
                            a: 0.16
                        },
                        "4": {
                            a: 0.21
                        },
                        "5": {
                            a: 0.26
                        },
                        "6": {
                            a: 0.32
                        },
                        "7": {
                            a: 0.37
                        },
                        "8": {
                            a: 0.42
                        },
                        "9": {
                            a: 0.47
                        },
                        "10": {
                            a: 0.53
                        },
                        "11": {
                            a: 0.58
                        },
                        "12": {
                            a: 0.63
                        },
                        "13": {
                            a: 0.68
                        },
                        "14": {
                            a: 0.74
                        },
                        "15": {
                            a: 0.79
                        },
                        "16": {
                            a: 0.84
                        },
                        "17": {
                            a: 0.89
                        },
                        "18": {
                            a: 0.95
                        },
                        "19": {
                            a: 1
                        },
                        "111": {
                            a: 0.8
                        },
                        "112": {
                            a: 0.59,
                            tw: {
                                d: 3,
                                p: {
                                    sx: 0.066,
                                    sy: 0.066,
                                    a: 0.35
                                }
                            }
                        },
                        "115": {
                            tw: {
                                d: 4,
                                p: {
                                    sx: 0.999,
                                    sy: 0.01,
                                    a: 1
                                }
                            }
                        },
                        "120": {
                            a: 0.67
                        },
                        "121": {
                            a: 0.33
                        },
                        "122": {
                            a: 0
                        }
                    })
                    .addTimedChild(instance3, 6, 117, {
                        "6": {
                            x: -3.05,
                            y: 16.35,
                            a: 0
                        },
                        "7": {
                            a: 0.08
                        },
                        "8": {
                            a: 0.15
                        },
                        "9": {
                            a: 0.23
                        },
                        "10": {
                            a: 0.31
                        },
                        "11": {
                            a: 0.38
                        },
                        "12": {
                            a: 0.46
                        },
                        "13": {
                            a: 0.54
                        },
                        "14": {
                            a: 0.62
                        },
                        "15": {
                            a: 0.69
                        },
                        "16": {
                            a: 0.77
                        },
                        "17": {
                            a: 0.85
                        },
                        "18": {
                            a: 0.92
                        },
                        "19": {
                            a: 1
                        },
                        "111": {
                            a: 0.75
                        },
                        "112": {
                            a: 0.5
                        },
                        "113": {
                            a: 0.25
                        },
                        "114": {
                            a: 0
                        }
                    });
            }
        };

        data.lib.Game = class extends MovieClip {
            constructor() {
                super({
                    duration: 1,
                    framerate: 30
                });
                const instance13 = new Graphics()
                    .drawCommands(data.shapes.Game[16]);
                const instance12 = new Graphics()
                    .drawCommands(data.shapes.Game[15])
                    .setTransform(-5.15, -2.6);
                const instance11 = new Graphics()
                    .drawCommands(data.shapes.Game[14]);
                const instance10 = new Graphics()
                    .drawCommands(data.shapes.Game[13])
                    .setTransform(30.8, -6.15);
                const instance9 = new Graphics()
                    .drawCommands(data.shapes.Game[12])
                    .setTransform(4.2, 12.6);
                const instance8 = new Graphics()
                    .drawCommands(data.shapes.Game[12])
                    .setTransform(4.2, 90);
                const instance7 = new data.lib.Screen()
                    .setTransform(744.2, 383.1);
                this[instance7.name = "screen"] = instance7;
                const instance6 = new data.lib.Remote()
                    .setTransform(762.85, 695.8);
                this[instance6.name = "remote"] = instance6;
                const instance5 = new data.lib.Paper()
                    .setTransform(1150.2, 389);
                const instance4 = new Graphics()
                    .drawCommands(data.shapes.Game[1]);
                const instance3 = new Text("Game + captions (here)")
                    .setStyle({
                        fontFamily: "Arial Rounded MT Bold",
                        fontSize: 18,
                        fill: "#fff",
                        leading: 2
                    })
                    .setTransform(1042.95, 302.8);
                const instance2 = new data.lib.LipsyncScene()
                    .setTransform(1148.9, 355.6);
                this[instance2.name = "lipsyncScene"] = instance2;
                const instance1 = new Text("WGBH TV Guide \n(example scenes)")
                    .setStyle({
                        fontFamily: "Arial Rounded MT Bold",
                        fontSize: 20,
                        fill: "#663499",
                        leading: 2
                    })
                    .setAlign("center")
                    .setTransform(1146.85, 235.55);
                this.addChild(instance13, instance12, instance11, instance10, instance9, instance8, instance7, instance6, instance5, instance4, instance3, instance2, instance1);
            }
        };
        data.stage = data.lib.Game;
    }
};
module.exports = data;