# WGBH SpringRoll Game Template

Example project utilizing [WGBH SpringRoll Game Library](https://atlas.wgbh.org/stash/projects/SROLL/repos/wgbh-springroll-game/).
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