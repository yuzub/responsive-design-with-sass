var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

gulp.task('default', function() {
    console.log('This is default gulp task');
  // place code for your default task here
});

gulp.task('css', function() {
  return gulp.src('src/sass/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(autoprefixer({browsers: ['last 2 version']}))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream());
});

gulp.task('images', function() {
  return gulp.src(['src/images/*', 'src/photos/*'])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task('copy', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream());
});

gulp.task('browserSync', function() {
  browserSync.init({ server: { baseDir: 'dist' } });
});

gulp.task('watch', ['browserSync', 'css'], function() {
  gulp.watch('src/sass/**/*.scss', ['css']);
  gulp.watch('src/*.html', ['copy']);
});