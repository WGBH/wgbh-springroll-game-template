# WGBH SpringRoll Game Template

Example project utilizing [WGBH SpringRoll Game Library](https://github.com/WGBH/wgbh-springroll-game).
This project is based on [Springroll-Seed](https://github.com/SpringRoll/Springroll-Seed).

## Setup

`npm install` will install all required dependencies. 

To test the game, run `npm start` then open http://localhost:8080 in your browser.

## Commands

### npm start

Starts the dev server - it will be available at `127.0.0.1:8080`/`localhost:8080`

### npm run build:release

Builds app for release

### npm run build:debug

Builds the app without mangling or minifying it for easier debugging

### npm run config

Compress all json files within `configDirectory` in `package.json` to a `CONFIG` object in `config.ts`

### npm run quickcaptions

Creates a captions json file based on tab separated list of filenames and caption texts. 

There are a few settings under `captionconf` in `package.json`

`audioDirectory` is where the audio files are located

`audioListFile` is where the TSV file of filenames and caption texts is located

`outputDirectory` is where the output `captions.json` will be exported


## Project structure

`assets_src` is where the XFL files go (XFL is uncompressed FLA)

`src` is where the typescript code goes

`src/assets` is where the Animate content gets published into, as PixiAnimate js files and image assets

`static` is where any other bitmap, audio, or data files go

`templates` has the html document

`html.config.js` has some constants to use in the html template

`tsconfig.json` is the compiller options

`tslint.json` is the linter (style enforcer) options

`webpack.config.js` is the bundler options

`package.json` is for npm: build scripts, dependencies, etc.