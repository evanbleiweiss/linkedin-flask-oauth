'use strict';

// dependencies
var gulp  = require('gulp');
var spawn = require('child_process').spawn;
var $ = require('gulp-load-plugins')();

// HTML
gulp.task('html', function () {
    return gulp.src('templates/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('templates/*.html'))
        .pipe($.size());
});

// CoffeeScript
gulp.task('coffee', function () {
    return gulp.src(
            ['static/scripts/**/*.coffee', '!static/scripts/**/*.js'],
            {base: 'static/scripts'}
        )
        .pipe(
            $.coffee({ bare: true }).on('error', $.util.log)
        )
        .pipe(gulp.dest('static/scripts'));
});

// Scripts
gulp.task('scripts', function () {
    return gulp.src('static/scripts/app.js')
        .pipe($.browserify({
            insertGlobals: true,
            transform: ['reactify']
        }))
        .pipe(gulp.dest('static/scripts'))
        .pipe($.size());
    });

// Clean
gulp.task('clean', function () {
    return gulp.src(['dist/styles', 'dist/scripts', 'dist/images', 'echo "" > ~/Music/whispercast/.whispercast.db'], {read: false}).pipe($.clean());
});

// Bundle
gulp.task('bundle', ['coffee', 'scripts'], function(){
    return gulp.src('./app/*.html')
               .pipe($.useref.assets())
               .pipe($.useref.restore())
               .pipe($.useref())
               .pipe(gulp.dest('dist'));
});

// Build
gulp.task('build', ['bundle']);

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

// Server
gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe($.webserver({
      livereload: true,
      // directoryListing: true,
      // open: true
    }));
});

// External Scripts
gulp.task('flask', function() {
  spawn('python', ['main.py'], {stdio: 'inherit'});
});

// Watch
gulp.task('watch', ['coffee', 'flask' ], function () {

    // Watch .html files
    gulp.watch('templates/*.html', ['html']);
    
    // Watch .coffeescript files
    gulp.watch('static/scripts/**/*.coffee', ['coffee', 'scripts']);

    // Watch .js files
    gulp.watch('static/scripts/**/*.js', ['scripts']);

});
