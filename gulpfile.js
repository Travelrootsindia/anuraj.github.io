var gulp = require('gulp')
, minifyCss = require("gulp-minify-css")
, uglify = require("gulp-uglify");

gulp.task('minify-js', function () {
    gulp.src('./js/*.js') // path to your files
    .pipe(uglify())
    .pipe(gulp.dest('./assets/scripts'));
});
 
// task
gulp.task('minify-css', function () {
    gulp.src('./css/*.css') // path to your file
    .pipe(minifyCss())
    .pipe(gulp.dest('./assets/styles'));
});