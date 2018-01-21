var gulp = require('gulp');
var concat = require('gulp-concat');
var paths = {
    bundles: {
        js: [
            './node_modules/angular/angular.js',
            './node_modules/angular-ui-router/release/angular-ui-router.js'
        ]
    },
    js: [
        './app/js/**/*.js',
        './app/src/**/*.js'
    ],
    css: {}
};


gulp.task('js', function() {
    return gulp.src(paths.js)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./bin/'));
});

gulp.task('watch', function () {
    gulp.start('compile');
    gulp.watch(paths.js, ['js']);
});

gulp.task('compile', function () {
    // gulp.start('bundle:js');
    // gulp.start('bundle:css');
    // gulp.start('less');
    gulp.start('js');
    // gulp.start('html');
});

gulp.task('bundle:js', function() {
    return gulp.src(paths.bundles.js)
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./vendor/'));
});

gulp.task('build', ['bundle:js']);
