/**
 * Configuration File
 *
 */
const nodePath = "./node_modules";
 
// Compiled CSS custom file name.
const styleFileName = "style";

// Compiled JS custom file name.
const jsFileName = "main";

// Browser Config Options
const browserSyncConfig = {
    server: "./dev",
    open: true,
    injectChanges: true,
    watchEvents: ["change", "add", "unlink", "addDir", "unlinkDir"],
}

// SASS Compiler Config Options
const sassCompilerConfig = {
  outputStyle: 'expanded', // Available options → 'compact' | 'compressed' | 'nested' | 'expanded'
  precision: 10
}

const paths = {
  dist: {
    root: './dist',
    html: './dist/',
    css: './dist/css/',
    js: './dist/js/',
    vendorJS: './dist/js/lib/',
    vendorCSS: './dist/css/lib/',
    img: './dist/img/production/',
    fonts: './dist/fonts/',
    php: './dist/php/',
    zipDestination: './',
    clean: './dist/*'
  },
  dev: {
    root: './dev',
    html: './dev/',
    css: './dev/css/',
    js: './dev/js/',
    vendorJS: './dev/js/lib/',
    vendorCSS: './dev/css/lib/',
    img: './dev/img/production/',
    fonts: './dev/fonts/',
    php: './dev/php/'
  },
  src: {
    root: './src',
    html: './src/html/*.html',
    partials: './src/html/partials/',
    sass: './src/sass/*.scss',
    js: './src/js/*.js',
    vendorJS: './src/vendor/js/**/*.*',
    vendorCSS: './src/vendor/css/**/*.*',
    img: './src/img/production/**/*.*',
    fonts: './src/fonts/**/*.*',
    php: './src/php/**/*.*'
  },
  watch: {
    html: './src/html/**/*.html',
    sass: './src/sass/**/*.scss',
    js: './src/js/**/*.js',
    vendorJS: './src/vendor/js/**/*.*',
    vendorCSS: './src/vendor/css/**/*.*',
    img: './src/img/production/**/*.*',
    fonts: './src/fonts/**/*.*',
    php: './src/php/**/*.*'
  }
};

/********** ZIP (Help Prepare For Buyers) *********/

// Production ZIP file name for buyers
const zipFile = {
  name: 'dist.zip',
  destination: './',
  includeGlob: ["./**/*"],
  ignoreGlob: [
    "!./{node_modules,node_modules/**/*}",
    "!./.git",
    "!./.svn",
    "!./babel.config.json",
    "!./gulpfile.babel.js",
    "!./gulp.config.js",
    "!./.eslintrc.js",
    "!./.eslintignore",
    "!./.editorconfig",
    "!./project.code-workspace",
    "!./vscode",
    "!./package.json",
    "!./package-lock.json",
    "!./src/js",
    "!./src/js/**/*",
    "!./src/img",
    "!./src/img/**/*",
    "!./src/vendor",
    "!./src/vendor/**/*",
    "!./src/fonts",
    "!./src/fonts/**/*",
  ]
}

/**********************/
// Browsers you care about for auto-prefixing. Browserlist https://github.com/ai/browserslist
const BROWSERS_LIST = ["last 2 version", "> 1%", "not dead"];

/**********************/
// Export.
module.exports = {
  nodePath,
  styleFileName,
  jsFileName,
  browserSyncConfig,
  sassCompilerConfig,
  paths,
  zipFile,
  BROWSERS_LIST
};
