import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import gulpPug from 'gulp-pug';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import {deleteAsync} from 'del';

import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

import BrowserSync from 'browser-sync';

const sass = gulpSass(dartSass);
const browserSync = BrowserSync.create();

const paths = {
    html: {
        src: "src/*.htnl",
        dest: 'dist/',
    },
    pug: {
        src: 'src/*.pug',
        dest: 'dist/'
    },
    styles: {
        src: ['src/**/*.scss', 'src/**/*.sass'],
        dest: 'dist/css/'
    },
    scripts: {
        src: "src/**/*.js",
        dest: 'dist/js/',
    },
    images: {
        src: 'src/**',
        dest: 'dist/img/'
    }
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        // .pipe(cleanCSS())
        .pipe(autoprefixer({
			cascade: false
		}))
        .pipe(concat('main.min.css'))
        // .pipe(rename({
        //     basename: 'main',
        //     suffix: '.min'
        // }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream());
}

function pug() {
    return gulp.src(paths.pug.src)
        .pipe(gulpPug({
            pretty: true,
        }))
        .pipe(gulp.dest(paths.pug.dest))
        .pipe(browserSync.stream());
}

function clean() {
  return deleteAsync(['dist']);
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });
    // gulp.watch(paths.html.src).on('change', browserSync.reload);
    gulp.watch(paths.pug.src).on('change', browserSync.reload);
    gulp.watch(paths.pug.src, pug);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
}

const build = gulp.series(clean, pug, gulp.parallel(scripts, styles));
const dev = gulp.series(clean, pug, gulp.parallel(scripts, styles), watch);

export {
    clean,
    styles,
    scripts,
    pug,
    watch,
    build,
    dev
} ;

export default dev;