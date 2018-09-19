const gulp = require('gulp')
const browserSync = require('browser-sync')

gulp.task('default', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
    
    gulp.watch("./*.css", ['task-css'])
    gulp.watch("./*.js", ['task-js'])

    gulp.watch("./*.html").on('change', browserSync.reload);
})

gulp.task('task-css', () => {
    console.log('css')
    return gulp.src('./style.css')
        .pipe(browserSync.stream())
})

gulp.task('task-js', (done) => {
    browserSync.reload();
    done();
})

gulp.watch('style.css', () => {
    console.log('watch css')
})