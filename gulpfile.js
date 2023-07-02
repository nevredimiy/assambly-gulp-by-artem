import gulp from "gulp";
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import sourcemaps from "gulp-sourcemaps";
import { deleteAsync } from 'del';
import autoPrefixer from "gulp-autoprefixer";
import browserSync from "browser-sync";


const clean = () => {
    return deleteAsync("dist");
}

const sass = gulpSass(dartSass);

function buildStyles() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(autoPrefixer())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
};

function buildHtml() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest("./dist"))
        .pipe(browserSync.stream());
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch('./src/sass/**/*.scss', buildStyles);
    gulp.watch('./src/index.html', buildHtml);
}


const dev = gulp.series( clean, buildStyles, buildHtml, watchFiles);
gulp.task("default", dev);
