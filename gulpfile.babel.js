import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import bro from "gulp-bro";
import babelify from "babelify";
import sass from "gulp-sass";
import autoP from "gulp-autoprefixer";
import miniCSS from "gulp-csso";

sass.compiler = require('node-sass');

const routes = {
  pug: {
    watch: "src/**/*.pug",
    src: "src/*.pug",
    dest: "build",
  },
  js: {
    watch: "src/js/*.js",
    src: "src/js/main.js",
    dest: "build/js",
  },
  styles: {
      watch: "src/**/*.scss",
      src: "src/scss/style.scss",
      dest: "build/css" ,
  }
};

const pug = () => {
  return gulp
    .src(routes.pug.src)
    .pipe(gpug())
    .pipe(gulp.dest(routes.pug.dest));
};

const clean = () => del(["build"]);

const webserver = () => {
  gulp.src("build").pipe(
    ws({
      livereload: true,
      open: true,
      host: "192.168.219.109",
      port: 8000,
    })
  );
};

const watch = () => {
    // console.log(toString(gulp))
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.js.watch, js);
  gulp.watch(routes.styles.watch, styles);
};

const styles = () => {
    // console.log(toString(sass.logError()));
  return gulp
      .src(routes.styles.src)
      .pipe(sass())
      // .pipe(sass().on('error', sass.logError()))
      .pipe(
          autoP({})
      )
      .pipe(miniCSS())
      .pipe(gulp.dest(routes.styles.dest))
};

const js = () => {
  return gulp
    .src(routes.js.src)
    .pipe(
      bro({
        transform: [
          babelify.configure({ presets: ["@babel/preset-env"] }),
          ["uglifyify", { global: true }],
        ],
      })
    )
    .pipe(gulp.dest(routes.js.dest));
};

// render
const prepare = gulp.series(clean);
const assets = gulp.series([pug, styles, js]);
const live = gulp.parallel([watch, webserver]);

export const dev = gulp.series([prepare, assets, live]);
