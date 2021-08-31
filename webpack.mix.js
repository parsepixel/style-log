let mix = require('laravel-mix');

mix.js('src/style-log.js', 'dist/style-log.js')
    .setPublicPath('dist')
    // .version()
    // .options({
    //     processCssUrls: false
    // });