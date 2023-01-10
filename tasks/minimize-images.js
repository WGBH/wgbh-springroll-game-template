const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');

 
(async () => {
    const files = await imagemin(['deploy/images/*.{jpg,png}'], 'deploy/images', {
        plugins: [
            imageminJpegtran(),
            
            imageminMozjpeg([{quality:75}]),

            imageminPngquant([{quality: '65-80'}])
        ]
    });

    //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
})();