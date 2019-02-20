//var imagemin = require('gulp-imagemin');

var gulp = require('gulp');
var run = require('gulp-run');
var gutil = require('gulp-util');

// Runs jekyll serve command.
gulp.task('serve:jekyll', function() {
    var shellCommand = 'bundle exec jekyll serve';

    return gulp.src('.')
        .pipe(run(shellCommand))
        .on('error', gutil.log);
});


// Default Task: serves site.
gulp.task('default', gulp.series('serve:jekyll'));