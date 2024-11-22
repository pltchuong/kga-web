/**
 * Load Configuration
 *
 */
const config = require("./gulp.config.js");

/**
 * Load Plugins
 *
 */
var gulp = require("gulp");

// CSS related plugins
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const sass = require("gulp-dart-sass"); // Gulp plugin for Sass compilation
const autoprefixer = require("autoprefixer"); // Autoprefixing magic
const mmq = require("gulp-merge-media-queries"); // Combine matching media queries into one

// JS related plugins
const concat = require("gulp-concat"); // Concatenates JS files
const uglify = require("gulp-uglify"); // Minifies JS files
const terser = require('gulp-terser'); // Terser
const babel = require("gulp-babel"); // Compiles ESNext to browser compatible JS

// Images
const imagemin = require("gulp-imagemin");

// Utility related plugins
const browserSync = require("browser-sync").create();
const rename = require("gulp-rename"); // Renames files
const lec = require("gulp-line-ending-corrector"); // Consistent Line Endings for non UNIX systems.
const sourcemaps = require("gulp-sourcemaps"); // Maps code in a compressed file (E.g. style.css) back to it’s original position in a source file
const notify = require("gulp-notify"); // Sends message notification.
const plumber = require("gulp-plumber"); // Prevent pipe breaking caused by errors from gulp plugins.
const zip = require("gulp-zip"); // ZIP files
const del = require("del"); // Delete files and folders
const fileInclude = require("gulp-file-include"); // Plugin for file includes
const beautify = require("gulp-beautify"); // Plugin for js-beautify
const gulpif = require('gulp-if');
const yargs = require( 'yargs' );
const PRODUCTION = yargs.argv.production;

/**
 * Custom Error Handler.
 *
 * @param Mixed err
 */
const errorHandler = (r) => {
  notify.onError("\n\n❌  ===> ERROR: <%= error.message %>\n")(r);
};

/**
 * Task: `browser-sync`.
 *
 * Live Reloads, CSS injections, Localhost tunneling.
 *
 */
const browsersync = (done) => {
  browserSync.init(config.browserSyncConfig);
  done();
};

// Helper function to allow browser reload with Gulp
const reload = (done) => {
  browserSync.reload();
  done();
};


/**
 * Task: `HTML`
 *
 * Compiles HTML files from partials
 *
 */
 gulp.task("html", function () {
  return gulp
    .src(config.paths.src.html)
    .pipe(plumber(errorHandler))
    .pipe(fileInclude({ prefix: "@@", basepath: config.paths.src.partials }))
    .pipe(beautify.html({ indent_size: 2, preserve_newlines: false }))
    .pipe(gulpif(PRODUCTION, gulp.dest(config.paths.dist.html),gulp.dest(config.paths.dev.html)))
    .pipe(browserSync.stream())
    .pipe(
      notify({
        message: "\n\n✅  ===> Task: HTML - Done!\n",
        onLast: true,
      })
    );
 });

/**
 * Task: `CSS`
 *
 * Compiles Sass, Autoprefixes it and Minifies CSS
 * for production
 *
 */
 gulp.task("css", () => {
  return gulp
    .src(config.paths.src.sass, { allowEmpty: true })
    .pipe(plumber(errorHandler))
    .pipe(
      gulpif(PRODUCTION, sass({
      outputStyle: 'compressed', 
      precision: 10,
      includePaths: ['./node_modules']
    }).on("error", sass.logError),
    sass({
      outputStyle: 'expanded', 
      precision: 10,
      includePaths: ['./node_modules']
    }).on("error", sass.logError)
    ))
    .pipe( 
      gulpif(PRODUCTION, postcss([autoprefixer(config.BROWSERS_LIST), cssnano()]), postcss([autoprefixer(config.BROWSERS_LIST)]) )
)
    .pipe(lec())
    .pipe(gulpif(PRODUCTION, gulp.dest(config.paths.dist.css),gulp.dest(config.paths.dev.css)))
    .pipe(browserSync.stream())
    .pipe(
      notify({
        message: "\n\n✅  ===> Task: STYLES - Done!\n",
        onLast: true,
      })
    );
 });

/**
 * Task: `js`
 *
 * Concatenate and uglify custom JS scripts
 *
 */
gulp.task("js", () => {
  return gulp
    .src(config.paths.src.js, { since: gulp.lastRun("js") }) // Only run on changed files.
    .pipe(plumber(errorHandler))
    .pipe(babel())
    .pipe(concat(config.jsFileName + '.js'))
    .pipe(lec()) // Consistent Line Endings for non UNIX systems.
    .pipe(gulpif(PRODUCTION, terser({
      ecma: 6,
      keep_fnames: false,
      mangle: {
        toplevel: true,
      },
    })))
    .pipe(gulpif(PRODUCTION, gulp.dest(config.paths.dist.js),gulp.dest(config.paths.dev.js)))
    .pipe(
      notify({
        message: "\n\n✅  ===> Task: CUSTOM JS — Done!\n",
        onLast: true,
      })
    );
});

/**
 * Task: `images`
 *
 * Minifies and optimizes PNG, JPEG, GIF and SVG images
 *
 */
gulp.task("images", () => {
  return gulp
    .src(config.paths.src.img)
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulpif(PRODUCTION, gulp.dest(config.paths.dist.img),gulp.dest(config.paths.dev.img)))
    .pipe(
      notify({
        message: "\n\n✅  ===> Task: IMAGES — Done!\n",
        onLast: true,
      })
    );
});

/**
 * Copy Vendors CSS
 *
 */
gulp.task("vendorsCSS", () => {
  return gulp
    .src(config.paths.src.vendorCSS)
    .pipe(gulpif(PRODUCTION, gulp.dest(config.paths.dist.vendorCSS),gulp.dest(config.paths.dev.vendorCSS)));
});

/**
 * Copy Vendors Js
 *
 */
gulp.task("vendorsJS", () => {
  return gulp
    .src(config.paths.src.vendorJS)
    .pipe(gulpif(PRODUCTION, gulp.dest(config.paths.dist.vendorJS),gulp.dest(config.paths.dev.vendorJS)));
});

/**
 * Copy Fonts
 *
 */
gulp.task("copyFonts", () => {
  return gulp
    .src(config.paths.src.fonts)
    .pipe(gulpif(PRODUCTION, gulp.dest(config.paths.dist.fonts),gulp.dest(config.paths.dev.fonts)));
});

/**
 * Copy PHP
 *
 */
gulp.task("copyPHP", () => {
  return gulp
  .src(config.paths.src.php)
  .pipe(gulpif(PRODUCTION, gulp.dest(config.paths.dist.php),gulp.dest(config.paths.dev.php)));
});

/**
 * Creates ZIP archive of the theme
 *
 */
gulp.task("zip", () => {
  const src = [...config.zipFile.includeGlob, ...config.zipFile.ignoreGlob];
  return gulp
    .src(src)
    .pipe(zip(config.zipFile.name))
    .pipe(gulp.dest(config.zipFile.destination));
});

/**
 * Clean ./dist directory
 *
 */
gulp.task("clean:dist", () => {
  return del(config.paths.dist.root + "/*");
});

/**
 * Clean ./dev directory
 *
 */
gulp.task("clean:dev", () => {
  return del(config.paths.dev.root + "/*");
});

/**
 * Clean ./dist and ./dev directories
 *
 */
 gulp.task("clean", gulp.parallel('clean:dist', 'clean:dev'));

/**
 * Copy Libraries
 *
 */
gulp.task("copy-libraries", (done) => {
  gulp
		.src(`${config.nodePath}/bootstrap/dist/js/**/*.bundle.*`)
    .pipe(gulp.dest(`${config.paths.src.root}/vendor/js`));
  gulp
		.src(`${config.nodePath}/bootstrap/scss/**/*.scss`)
    .pipe(gulp.dest(`${config.paths.src.root}/sass/bootstrap5`));
  gulp
		.src(`${config.nodePath}/jquery/dist/**/jquery.min.js`)
    .pipe(gulp.dest(`${config.paths.src.root}/vendor/js`));
  done();
});

const buildClean = PRODUCTION ? "clean:dist" : "clean:dev";
/**
 * Build
 *
 */
gulp.task(
  "build",
  gulp.series(
    buildClean,
    gulp.parallel(
      "html",
      "vendorsCSS",
      "vendorsJS",
      "copyFonts",
      "copyPHP",
      "images",
      "css",
      //"cssRTL",
      "js"
    )
  )
);

/**
 * Buyers zip
 *
 */
 gulp.task(
  "buyers-zip",
  gulp.series(
    "build",
    "zip"
  )
);

/**
 * Watch Tasks
 *
 * Watches for file changes and runs specific tasks
 */
gulp.task("watch", () => {
  gulp.watch(config.paths.watch.html, gulp.series("html"));
  gulp.watch(config.paths.watch.sass, gulp.series("css"));
  gulp.watch(config.paths.watch.js, gulp.series("js", reload));
  gulp.watch(config.paths.watch.vendorCSS, gulp.series("vendorsCSS"));
  gulp.watch(config.paths.watch.vendorJS, gulp.series("vendorsJS", reload));
  gulp.watch(config.paths.watch.img, gulp.series("images", reload));
  gulp.watch(config.paths.watch.fonts, gulp.series("copyFonts"));
  gulp.watch(config.paths.watch.php, gulp.series("copyPHP"));
});

/**
 * Default Task
 *
 * Watches for file changes and runs specific tasks
 */
gulp.task(
  "default",
  gulp.series("build", gulp.parallel(browsersync, "watch"))
);