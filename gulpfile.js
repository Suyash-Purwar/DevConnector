const browserSync = require("browser-sync").create();
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass");

const html = () => gulp.src("src/*.html")
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());

const style = () => gulp.src("src/sass/*.scss")
    .pipe(sass({
        outputStyle: "compressed"
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 5 versions'],
        cascade: false
    }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream()); 

const watch = () => {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    gulp.watch("src/sass/**/*.scss", style)
    gulp.watch("src/*.html", html);
}

exports.html = html;
exports.style = style;
exports.watch = watch;