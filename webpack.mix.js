const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
const publicCssPath = 'public/frontend/css';
mix.styles([`${publicCssPath}/main.css`, `${publicCssPath}/shop.css`, `${publicCssPath}/animations.css`], `${publicCssPath}/app.css`);
mix.minify(`${publicCssPath}/app.css`);
mix.minify('public/frontend/js/main.js');
mix.js('resources/js/app.js', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css');
