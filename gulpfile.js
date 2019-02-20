// Based heavily on https://savaslabs.com/2016/10/19/optimizing-jekyll-with-gulp.html

// Gulp and running
var gulp = require('gulp');
var run = require('gulp-run');
var gutil = require('gulp-util');

// Images
const browserSync = require('browser-sync').create();
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const jpegRecompress = require('imagemin-jpeg-recompress');

const paths = require('./_assets/gulp_config/paths');
const del = require('del');

// Runs jekyll serve command.
gulp.task('serve:jekyll', function() {
    var shellCommand = 'bundle exec jekyll serve';

    return gulp.src('.')
        .pipe(run(shellCommand))
        .on('error', gutil.log);
});

// Deletes all processed images.
const removeImages = [paths.jekyllImageFiles, paths.siteImageFiles];
const cleanImages = () => { return del(removeImages); };
gulp.task('clean:images', gulp.parallel(cleanImages));

// Optimizes image files. Note that this task does not run automatically.
const optimizeImages = () => {
  // We're including imagemin options because we're overriding the default JPEG
  // optimization plugin.
  return gulp.src(paths.imageFilesGlob)
    .pipe(cache(imagemin([
      imagemin.gifsicle(),
      jpegRecompress(),
      imagemin.optipng(),
    ])))
    .pipe(gulp.dest(paths.imageFiles));
};
gulp.task('optimize:images', gulp.parallel(optimizeImages));

// Copies image files.
const buildImages = () => {
    return gulp.src(paths.imageFilesGlob)
      .pipe(gulp.dest(paths.jekyllImageFiles))
      .pipe(gulp.dest(paths.siteImageFiles))
      .pipe(browserSync.stream());
  };
  gulp.task('build:images', gulp.parallel(buildImages));

gulp.task('build', gulp.series(
    'clean:images',
    'build:images',//gulp.parallel('build:scripts', 'build:images', 'build:styles', 'build:fonts'),
    //'styleguide',
    'serve:jekyll'
  ));

// Default Task: serves site.
gulp.task('default', gulp.parallel('build'));
