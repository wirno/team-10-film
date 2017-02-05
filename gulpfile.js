var gulp        = require('gulp'),
    wrap        = require('gulp-wrap'),
    declare     = require('gulp-declare'),
    watch       = require('gulp-watch'),
    sass        = require('gulp-sass'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    postcss     = require('gulp-postcss'),
    autop       = require('autoprefixer'),
    cssnano     = require('gulp-cssnano'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    plumber     = require('gulp-plumber'),
    changed     = require('gulp-changed');


var source = {
    path:       'src/',
    scripts:    'src/js/*.js',
    sass:       'source/css/*.*',
    images:     'source/img/*.{gif,jpg,png,svg}'
};

var dist = {
    path:       'dist/',
    scripts:    'dist/js/',
    styles:     'dist/css/',
    images:     'dist/img/'
};

// JS app
gulp.task('js_app', function() {
    gulp.src(source.scripts)
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }}))
        .pipe(concat("main.js"))
        .pipe(gulp.dest(dist.scripts));
});

// SASS
gulp.task('sass', function() {
    return gulp.src(source.sass)
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }}))
        .pipe(changed( dist.styles ))
        .pipe(sass({
            indentedSyntax: false
        }))
        .pipe(concat("style.css"))
        .pipe(gulp.dest(dist.styles));
});

// Image minifier
gulp.task('image_min', function() {
    return gulp.src(source.images)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(dist.images));
});

// Build
gulp.task('build', ['js_app', 'sass', 'image_min']);
gulp.task('default',['js_app', 'sass']);

// Watch
gulp.task('watch', function() {
    gulp.watch(source.scripts, ['js_app']);
    gulp.watch(source.sass, ['sass']);
});