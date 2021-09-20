const mix = require('laravel-mix');
const path = require('path');
const ChunkRenamePlugin = require("webpack-chunk-rename-plugin");

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

Mix.listen('configReady', webpackConfig => {
  // Add "svg" to image loader test
  const imageLoaderConfig = webpackConfig.module.rules.find(
    rule =>
      String(rule.test) ===
      String(/(\.(png|jpe?g|gif|webp)$|^((?!font).)*\.svg$)/)
  );
  imageLoaderConfig.exclude = path.resolve(__dirname, 'resources/js/backend/icons');
});

// mix.setPublicPath('public/build');
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
        include: [path.resolve(__dirname, 'resources/js/backend/icons')],
        options: {
          symbolId: 'icon-[name]',
        },
      },
    ],
  },
  output: {
    filename: chunkData => {
      return chunkData.chunk.name === "/js/frontend/manifest" ? "/js/manifest.js" : "[name].js";
    },
    chunkFilename: "js/chunks/[name].js?id=[chunkhash]"
  },
  plugins: [
    new ChunkRenamePlugin({
      initialChunksWithEntry: true,
      '/js/backend/main': 'js/backend.js',
      '/js/frontend/main': 'js/frontend.js',
      '/js/frontend/vendor': 'js/vendor.js',
    }),
  ],
});

mix.js('resources/js/backend/main.js', 'public/js/backend')
  .js('resources/js/frontend/main.js', 'public/js/frontend')
  .extract([
    'vue', 'vue-router', 'vuex',
    'element-ui',
    'echarts', 'highlight.js',
    'sortablejs',
    'dropzone',
    'xlsx',
    'tui-editor',
    'codemirror',
  ])
  .sass('resources/sass/frontend/app.scss', 'css/frontend.css')
  .sass('resources/sass/backend/app.scss', 'css/backend.css')
  .options({
    postCss: [
      require('autoprefixer'),
    ],
  })
  .version();

if (process.env.MIX_BROWSER_SYNC_ENABLE === 'true') {
  mix.browserSync({
    proxy: process.env.MIX_BROWSER_SYNC_PROXY_URL,
    open: false
  });
}
