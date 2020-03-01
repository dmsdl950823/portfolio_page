import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import bro from "gulp-bro";
import babelify from "babelify";
import sass from "gulp-sass";
import autoP from "gulp-autoprefixer";
import miniCSS from "gulp-csso";
import image from "gulp-image";
import gulpFont from 'gulp-font';
import include from 'gulp-include';




sass.compiler = require('node-sass');

const routes = {
  pug: {
    watch: "src/**/*.pug",
    src: "src/*.pug",
    dest: "build",
  },
  portcontents: {
    watch: "src/**/_portPage.pug",
    src: "src/templetes/_portPage.pug",
    dest: "build/portfolio",
  },
  portjs: {
    watch: "src/js/portfolio/*.js",
    src: "src/js/_portPage.js",
    dest: "build/js",
  },
  js: {
    watch: "src/js/*.js",
    src: "src/js/main.js",
    dest: "build/js",
  },
  three: {
    src: "src/js/lib/*.js",
    dest: "build/js/lib",
  },
  anime: {
    src: "src/js/animejs/lib/anime.min.js",
    dest: "build/js/animejs/lib"
  },
  styles: {
    watch: "src/**/*.scss",
    src: "src/scss/style.scss",
    dest: "build/css" ,
  },
  img: {
    src: "src/images/*",
    dest: "build/images"
  },
  fonts: {
    src: "src/fonts/*.ttf",
    dest: "build/font"
  }
};


const routing = () => {
  return gulp
      .src(routes.portcontents.src)
      .pipe(gpug())
      .pipe(gulp.dest(routes.portcontents.dest))
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
      host: "192.168.219.104",
      port: 8000,
    })
  );
};

const fonts = () => {
  return gulp
      .src(routes.fonts.src, {read: false})
      .pipe(gulpFont({
          ext: 'font.ttf',
          fontface: routes.fonts.src,
          // relative: routes.fonts.src,
          dest: routes.fonts.dest,
          // embed: ['woff'],
          // collate: false
      }))
      .pipe(gulp.dest(routes.fonts.dest))
};

const images = () => {
  return gulp
      .src(routes.img.src)
      .pipe(image({
      // pngquant: true,
      // optipng: false,
      // zopflipng: true,
      // jpegRecompress: false,
      // mozjpeg: true,
      // guetzli: false,
      // gifsicle: true,
      // svgo: true,
      // concurrent: 10,
      // quiet: true // defaults to false
      }))
      .pipe(gulp.dest(routes.img.dest))
};

const styles = () => {
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

// do not use
const anime = () => {
  return gulp
      .src(routes.anime.src)
      .pipe(include())
      .on('error', console.log)
      .pipe(gulp.dest(routes.anime.dest))
};

const portjs = () => {
  return gulp
    .src(routes.portjs.src)
    .pipe(
      bro({
        transform: [
          babelify.configure({ presets: ["@babel/preset-env"] }),
          ["uglifyify", { global: true }],
        ],
      })
    )
    .pipe(gulp.dest(routes.portjs.dest));
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

const threeModule = () => {
  return gulp
      .src(routes.three.src)
      .pipe(include())
      .on('error', console.log)
      .pipe(gulp.dest(routes.three.dest))
};

const watch = () => {
    gulp.watch(routes.pug.watch, pug);
    gulp.watch(routes.portcontents.watch, routing);
    gulp.watch(routes.js.watch, js);
    gulp.watch(routes.styles.watch, styles);
    gulp.watch(routes.img.src, images);
};

// render
const prepare = gulp.series([clean, images]);
const assets = gulp.series([pug, routing, styles, js, portjs]);
const live = gulp.parallel([watch, webserver]);

export const dev = gulp.series([prepare, assets, live]);
