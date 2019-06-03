const browserSync = require("browser-sync").create();
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass");

const html = () => gulp.src("src/*.html")
    .pipe(gulp.dist("dist"))
    .pipe(browserSync.stream());

const styles = () => gulp.src("src/sass/*.css")
    .pipe(sass({
        outputStyle: "compressed"
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 5 versions'],
        cascade: false
    }))
    .pipe(gulp.dist("dist/css"));


const watch = () => {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    
    gulp.watch("src/sass/*.sass", styles)
    gulp.watch("src/*.html", html);
}

exports.html = html;
exports.style = style;

exports.watch = watch;