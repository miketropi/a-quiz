const mix = require('laravel-mix');

mix
  .js('src/main.js', 'dist/a-quiz.bundle.js')
  .react()
  .sass('src/scss/main.scss', 'css/a-quiz.bundle.css')
  .setPublicPath('dist');