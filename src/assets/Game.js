!function(e,a){var t=e.animate.MovieClip,n=e.Container,i=e.Text,L=e.Graphics,s=e.animate.ShapesCache;a.LipsyncScene=n.e(function(){n.call(this);var e=(new L).d(s.Game[0]),a=new i("Lipsync w/ rhubarb").ss({leading:2,z:18,f:"Arial Rounded MT Bold",i:"#fff"}).t(-96.95,-10.35);this.ac(e,a)}),a.Paper=n.e(function(){n.call(this);var e=(new L).d(s.Game[2]);this.ac(e)}),a.Button=t.e(function(){t.call(this,0,2,!0,0);var e=(new L).d(s.Game[5]),a=(new L).d(s.Game[4]),n=(new L).d(s.Game[3]),i=(new L).d(s.Game[6]).t(140.35,38.75);this.at(e,0,1).at(a,0,1,"0X140.35Y38.75").at(n,0,1,"0X140.35Y28.85").at(i,1,1)}),a.Remote=n.e(function(){n.call(this);var e=(new L).d(s.Game[7]),t=(new a.Button).t(-98.35,-37.2);this[t.name="button"]=t,this.ac(e,t)});var l=t.e(function(e){t.call(this,e,117,!1);var a=(new L).d(s.Game[8]);this.at(a)}),r=t.e(function(e){t.call(this,e,117,!1);var a=(new L).d(s.Game[9]),n=new l(2);this.at(a).at(n,0,117,"0X-9.4Y-45.95B1 36Y-46B0.109 37Y-46.023B0.555 38Y-45.95B1 72Y-46B0.109 73Y-45.95B1 75Y-46B0.109 76Y-46.023B0.555 77Y-45.95B1")}),c=t.e(function(e){t.call(this,e,123,!1);var a=(new L).d(s.Game[10]).t(-744.2,-383.1);this.at(a)});a.Screen=t.e(function(){t.call(this,0,123,!0,0,{turnOn:0,turnOn_stop:19,watchTV:20,watchTV_loop:109,turnOff:110,turnOff_stop:122});var e=(new L).d(s.Game[11]).t(-744.2,-383.1),a=new c(2),n=new r(2);this.at(e).at(a,0,123,"0A1B1L0 1L0.05 2L0.11 3L0.16 4L0.21 5L0.26 6L0.32 7L0.37 8L0.42 9L0.47 10L0.53 11L0.58 12L0.63 13L0.68 14L0.74 15L0.79 16L0.84 17L0.89 18L0.95 19L1 111L0.8 112L0.59 113A0.689B0.689L0.51 114A0.377B0.377L0.43 115A0.066B0.066L0.35 116A0.299B0.052L0.52 117A0.533B0.038L0.68 118A0.766B0.024L0.84 119A0.999B0.01L1 120L0.67 121L0.33 122L0").at(n,6,117,"6X-3.05Y16.35L0 7L0.08 8L0.15 9L0.23 10L0.31 11L0.38 12L0.46 13L0.54 14L0.62 15L0.69 16L0.77 17L0.85 18L0.92 19L1 111L0.75 112L0.5 113L0.25 114L0")}),(a.Game=t.e(function(){t.call(this,0,1,!0,30);var e=(new L).d(s.Game[16]),n=(new L).d(s.Game[15]).t(-5.15,-2.6),l=(new L).d(s.Game[14]),r=(new L).d(s.Game[13]).t(30.8,-6.15),c=(new L).d(s.Game[12]).t(4.2,12.6),m=(new L).d(s.Game[12]).t(4.2,90),d=(new a.Screen).t(744.2,383.1);this[d.name="screen"]=d;var o=(new a.Remote).t(762.85,695.8);this[o.name="remote"]=o;var h=(new a.Paper).t(1150.2,389),w=(new L).d(s.Game[1]),u=new i("Game + captions (here)").ss({leading:2,z:18,f:"Arial Rounded MT Bold",i:"#fff"}).t(1042.95,302.8),f=(new a.LipsyncScene).t(1148.9,355.6);this[f.name="lipsyncScene"]=f;var G=new i("WGBH TV Guide \n(example scenes)").ss({leading:2,z:20,f:"Arial Rounded MT Bold",i:"#663499"}).g(0).t(1146.85,235.55);this.ac(e,n,l,r,c,m,d,o,h,w,u,f,G)})).assets={Game:"images/Game.shapes.txt"}}(PIXI,lib=lib||{});var lib;"undefined"!=typeof module&&module.exports&&(module.exports={stage:lib.Game,background:16777215,width:1536,height:768,framerate:30,totalFrames:1,library:lib});