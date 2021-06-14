const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    resolve: {
        alias: {
        '@': path.resolve(__dirname, 'resources/js/backend'),
        '^': path.resolve(__dirname, 'resources/js/frontend'),
        'share': path.resolve(__dirname, 'resources/share'),
        'lang': path.resolve(__dirname, 'resources/share/lang'),
        }
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: [path.resolve(__dirname, 'resources/backend/icons/svg')],
                options: {
                symbolId: 'icon-[name]'
                }
            }
        ],
    }
}).babelConfig({
    plugins: ['dynamic-import-node']
});

mix.js('resources/js/frontend/main.js', 'public/js/frontend.js')
  .js('resources/js/backend/main.js', 'public/js/backend.js')
  .sass('resources/sass/frontend/app.scss', 'public/css/frontend.css')
  .sass('resources/sass/backend/app.scss', 'public/css/backend.css')
  .options({
    postCss: [
      require('autoprefixer'),
    ],
  });
  // .version();
