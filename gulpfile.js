let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync').create();
let useref = require('gulp-useref');
let uglify = require('gulp-uglify');
let gulpIf = require('gulp-if');
let cleanCSS = require('gulp-clean-css');
let compass = require('compass-importer');


gulp.task('sass', () => {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass({ importer: compass }).on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});

gulp.task('useref', () =>{
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cleanCSS({compatibility: 'ie9'})))
    .pipe(gulp.dest('dist'))
});

gulp.task('build', ['useref'], function (){
  return;
})