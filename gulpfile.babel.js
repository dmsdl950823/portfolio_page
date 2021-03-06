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
import ghPages from 'gulp-gh-pages';



sass.compiler = require('node-sass');

const routes = {
  pug: {
    watch: "src/**/*.pug",
    src: "src/*.pug",
    dest: "build",
  },
  viewPage: {
    watch: "src/**/viewPage.pug",
    src: "src/templetes/viewPage.pug",
    dest: "build",
  },
  js: {
    watch: "src/js/*.js",
    src: "src/js/main.js",
    dest: "build/js",
  },
  viewMore_js: {
    watch: "src/js/_viewmore.js"
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
  slick: {
    watch: "src/scss/slick/*.css",
    src: "src/scss/slick/*.css",
    dest: "build/css/slick"
  },
  viewmoreCSS: {
    src: "src/scss/slick/*.scss"
  },
  img: {
    src: "src/images/*",
    dest: "build/images"
  },
  font: {
      src: 'src/fonts/*.ttf',
      dest: 'build/fonts',
  }
};


function pug(src, dest) {
    return gulp
        .src(src)
        .pipe(gpug())
        .pipe(gulp.dest(dest));
}

const index = () => {
    var src = routes.pug.src;
    var dest = routes.pug.dest;
    return pug(src, dest);
};

const viewPage = () => {
    var src = routes.viewPage.src;
    var dest = routes.viewPage.dest;
    return pug(src, dest);
};

const clean = () => del(["build"]);

const webserver = () => {
  gulp.src("build").pipe(
    ws({
      livereload: true,
      open: true,
      // host: 'localhost',
      port: 8000,
    })
  );
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

function scssGenerator(src, dest) {
    return gulp
      .src(src)
      .pipe(sass())
      // .pipe(sass().on('error', sass.logError()))
      .pipe(
          autoP({})
      )
      .pipe(miniCSS())
      .pipe(gulp.dest(dest))
}

const styles = () => {
  var src = routes.styles.src;
  var dest = routes.styles.dest;
  return scssGenerator(src, dest);

};

const viewmoreCSS = () => {
  var src = routes.viewmoreCSS.src;
  var dest = routes.styles.dest;
  return scssGenerator(src, dest);
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

function including(src, build) {
    return gulp
    .src(src)
      .pipe(include())
      .on('error', console.log)
    .pipe(gulp.dest(build));
}

const slick = () => {
    var src = routes.slick.src;
    var build = routes.slick.dest;

    return including(src, build)
};

const slickminJS = () => {
    var src = 'src/js/libs/slick.min.js';
    var build = 'build/js/slick';
    return including(src, build);
};

const Jquery = () => {
    var src = 'src/js/libs/jquery-1.11.0.min.js';
    var build = 'build/js/slick';
    return including(src, build);
};

const Jquery_migrate = () => {
    var src = 'src/js/libs/jquery-migrate-1.2.1.min.js';
    var build = 'build/js/slick';
    return including(src, build);
};

const viewMore_js = () => {
    var src = 'src/js/_viewmore.js';
    var build = 'build/js';

    return gulp
    .src(src)
    .pipe(
      bro({
        transform: [
          babelify.configure({ presets: ["@babel/preset-env"] }),
          ["uglifyify", { global: true }],
        ],
      })
    )
    .pipe(gulp.dest(build));
};

const fonts = () => {
    var src = routes.font.src;
    var build = routes.font.dest;
    return including(src, build);
};

const json = () => {
    var src = 'src/json/*.json';
    var build = 'build/json';
    return including(src, build);
};

const threeModule = () => {
  return gulp
      .src(routes.three.src)
      .pipe(include())
      .on('error', console.log)
      .pipe(gulp.dest(routes.three.dest))
};

const watch = () => {
    gulp.watch(routes.pug.watch, index);
    gulp.watch(routes.viewPage.watch, viewPage);
    gulp.watch(routes.js.watch, js);
    gulp.watch(routes.viewMore_js.watch, viewMore_js);
    gulp.watch(routes.styles.watch, styles);
    gulp.watch(routes.viewmoreCSS.src, viewmoreCSS);
    gulp.watch(routes.img.src, images);
    gulp.watch(routes.font.src, fonts);
};

const gh = () => {
    return gulp.src('build/**/*')
        .pipe(ghPages())
};

// render
const prepare = gulp.series([clean, images]);
const assets = gulp.series([index, viewPage, fonts]); // fonts
const styleSheets = gulp.series([styles, viewmoreCSS, slick]);
const javascripts = gulp.parallel([js, json, slickminJS, Jquery, Jquery_migrate, viewMore_js]);
// const live = gulp.parallel([watch]);
const live = gulp.parallel([watch, webserver]);

export const build = gulp.series([prepare, assets,styleSheets, javascripts]);
export const dev = gulp.series([build, live]);
export const deploy = gulp.series([build, gh]);
