/**
 * Created by michaelwatts
 * Date: 10/06/2014
 * Time: 11:43
 */

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var prefix = require('gulp-autoprefixer');

gulp.task('default', function () {
  return gulp.src('src/app.scss')
      .pipe(sass({lineNumbers: true}))
      .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7", { cascade: true }))
      .pipe(gulp.dest('dist'));
});

var sass_watcher = gulp.watch('src/*.scss', ['default']);
sass_watcher.on('change', function(event) {
  console.log('File '+event.path+' was '+event.type+', running tasks...');
});