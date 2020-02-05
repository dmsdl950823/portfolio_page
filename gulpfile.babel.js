import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import bro from "gulp-bro";
import babelify from "babelify";

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

// js...

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.js.watch, js);
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
const assets = gulp.series([pug, js]);
const live = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, assets, live]);
