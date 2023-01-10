const data = {
    version: 2,
    stage: null,
    background: 0xffffff,
    width: 1624,
    height: 750,
    framerate: 30,
    totalFrames: 67,
    assets: {
        "Transition": "images/Transition.shapes.txt"
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
        const Graphics = animate.Graphics;


        data.lib.Background = class extends Container {
            constructor() {
                super();
                const instance1 = new Graphics()
                    .drawCommands(data.shapes.Transition[0])
                    .setTransform(-94.05, -82.05);
                this.addChild(instance1);
            }
        };

        data.lib.g = class extends Container {
            constructor() {
                super();
                const instance1 = new Graphics()
                    .drawCommands(data.shapes.Transition[1]);
                this.addChild(instance1);
            }
        };

        data.lib.n = class extends Container {
            constructor() {
                super();
                const instance1 = new Graphics()
                    .drawCommands(data.shapes.Transition[2]);
                this.addChild(instance1);
            }
        };

        data.lib.i = class extends Container {
            constructor() {
                super();
                const instance1 = new Graphics()
                    .drawCommands(data.shapes.Transition[3]);
                this.addChild(instance1);
            }
        };

        data.lib.d = class extends Container {
            constructor() {
                super();
                const instance1 = new Graphics()
                    .drawCommands(data.shapes.Transition[4]);
                this.addChild(instance1);
            }
        };

        data.lib.a = class extends Container {
            constructor() {
                super();
                const instance1 = new Graphics()
                    .drawCommands(data.shapes.Transition[5]);
                this.addChild(instance1);
            }
        };

        data.lib.o = class extends Container {
            constructor() {
                super();
                const instance1 = new Graphics()
                    .drawCommands(data.shapes.Transition[6]);
                this.addChild(instance1);
            }
        };

        data.lib.L = class extends Container {
            constructor() {
                super();
                const instance1 = new Graphics()
                    .drawCommands(data.shapes.Transition[7]);
                this.addChild(instance1);
            }
        };

        const Graphic1 = class extends MovieClip {
            constructor(mode) {
                super({ mode: mode, duration: 51, loop: false });
                const instance7 = new data.lib.L();
                const instance6 = new data.lib.o();
                const instance5 = new data.lib.a();
                const instance4 = new data.lib.d();
                const instance3 = new data.lib.i();
                const instance2 = new data.lib.n();
                const instance1 = new data.lib.g();
                this.addTimedChild(instance7, 0, 51, {
                        "0": {
                            x: -88.85,
                            y: -4.15
                        },
                        "8": {
                            y: -5.4
                        },
                        "9": {
                            y: -6.65
                        },
                        "10": {
                            y: -7.9
                        },
                        "11": {
                            y: -9.15
                        },
                        "12": {
                            y: -8.45
                        },
                        "13": {
                            y: -7.7
                        },
                        "14": {
                            y: -7
                        },
                        "15": {
                            y: -6.3
                        },
                        "16": {
                            y: -5.6
                        },
                        "17": {
                            y: -4.85
                        },
                        "18": {
                            y: -4.15
                        }
                    })
                    .addTimedChild(instance6, 0, 51, {
                        "0": {
                            x: -56.75,
                            y: 1.75
                        },
                        "11": {
                            y: 0.5
                        },
                        "12": {
                            y: -0.75
                        },
                        "13": {
                            y: -2
                        },
                        "14": {
                            y: -3.25
                        },
                        "15": {
                            y: -2.55
                        },
                        "16": {
                            y: -1.8
                        },
                        "17": {
                            y: -1.1
                        },
                        "18": {
                            y: -0.4
                        },
                        "19": {
                            y: 0.3
                        },
                        "20": {
                            y: 1.05
                        },
                        "21": {
                            y: 1.75
                        }
                    })
                    .addTimedChild(instance5, 0, 51, {
                        "0": {
                            x: -23.5,
                            y: 1.75
                        },
                        "14": {
                            y: 0.5
                        },
                        "15": {
                            y: -0.75
                        },
                        "16": {
                            y: -2
                        },
                        "17": {
                            y: -3.25
                        },
                        "18": {
                            y: -2.55
                        },
                        "19": {
                            y: -1.8
                        },
                        "20": {
                            y: -1.1
                        },
                        "21": {
                            y: -0.4
                        },
                        "22": {
                            y: 0.3
                        },
                        "23": {
                            y: 1.05
                        },
                        "24": {
                            y: 1.75
                        }
                    })
                    .addTimedChild(instance4, 0, 51, {
                        "0": {
                            x: 8.9,
                            y: -3.8
                        },
                        "17": {
                            y: -5.05
                        },
                        "18": {
                            y: -6.3
                        },
                        "19": {
                            y: -7.55
                        },
                        "20": {
                            y: -8.8
                        },
                        "21": {
                            y: -8.1
                        },
                        "22": {
                            y: -7.35
                        },
                        "23": {
                            y: -6.65
                        },
                        "24": {
                            y: -5.95
                        },
                        "25": {
                            y: -5.25
                        },
                        "26": {
                            y: -4.5
                        },
                        "27": {
                            y: -3.8
                        }
                    })
                    .addTimedChild(instance3, 0, 51, {
                        "0": {
                            x: 33.3,
                            y: -4.15
                        },
                        "20": {
                            y: -5.4
                        },
                        "21": {
                            y: -6.65
                        },
                        "22": {
                            y: -7.9
                        },
                        "23": {
                            y: -9.15
                        },
                        "24": {
                            y: -8.45
                        },
                        "25": {
                            y: -7.7
                        },
                        "26": {
                            y: -7
                        },
                        "27": {
                            y: -6.3
                        },
                        "28": {
                            y: -5.6
                        },
                        "29": {
                            y: -4.85
                        },
                        "30": {
                            y: -4.15
                        }
                    })
                    .addTimedChild(instance2, 0, 51, {
                        "0": {
                            x: 56.6,
                            y: 1.4
                        },
                        "23": {
                            y: 0.15
                        },
                        "24": {
                            y: -1.1
                        },
                        "25": {
                            y: -2.35
                        },
                        "26": {
                            y: -3.6
                        },
                        "27": {
                            y: -2.9
                        },
                        "28": {
                            y: -2.15
                        },
                        "29": {
                            y: -1.45
                        },
                        "30": {
                            y: -0.75
                        },
                        "31": {
                            y: -0.05
                        },
                        "32": {
                            y: 0.7
                        },
                        "33": {
                            y: 1.4
                        }
                    })
                    .addTimedChild(instance1, 0, 51, {
                        "0": {
                            x: 89,
                            y: 7.7
                        },
                        "26": {
                            y: 6.45
                        },
                        "27": {
                            y: 5.2
                        },
                        "28": {
                            y: 3.95
                        },
                        "29": {
                            y: 2.7
                        },
                        "30": {
                            y: 3.4
                        },
                        "31": {
                            y: 4.15
                        },
                        "32": {
                            y: 4.85
                        },
                        "33": {
                            y: 5.55
                        },
                        "34": {
                            y: 6.25
                        },
                        "35": {
                            y: 7
                        },
                        "36": {
                            y: 7.7
                        }
                    });
            }
        };

        data.lib.Transition = class extends MovieClip {
            constructor() {
                super({
                    duration: 67,
                    framerate: 30,
                    loop: false,
                    labels: {
                        cover: 0,
                        cover_stop: 14,
                        load: 15,
                        load_loop: 51,
                        reveal: 52,
                        reveal_stop: 66
                    }
                });
                const instance1 = new data.lib.Background();
                const instance2 = new Graphic1(MovieClip.SYNCHED);
                this.addTimedChild(instance1, 0, 67, {
                        "0": {
                            y: -768,
                            tw: {
                                d: 14,
                                p: {
                                    y: 0
                                }
                            }
                        },
                        "52": {
                            tw: {
                                d: 14,
                                p: {
                                    y: -768
                                }
                            }
                        }
                    })
                    .addTimedChild(instance2, 8, 51, {
                        "8": {
                            x: 808,
                            y: 372,
                            a: 0
                        },
                        "9": {
                            a: 0.17
                        },
                        "10": {
                            a: 0.33
                        },
                        "11": {
                            a: 0.5
                        },
                        "12": {
                            a: 0.67
                        },
                        "13": {
                            a: 0.83
                        },
                        "14": {
                            a: 1
                        },
                        "53": {
                            a: 0.83
                        },
                        "54": {
                            a: 0.67
                        },
                        "55": {
                            a: 0.5
                        },
                        "56": {
                            a: 0.33
                        },
                        "57": {
                            a: 0.17
                        },
                        "58": {
                            a: 0
                        }
                    });
            }
        };
        data.stage = data.lib.Transition;
    }
};
module.exports = data;