var gulp = require('gulp'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-ruby-sass'),
    compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    del = require('del');

var paths = {
  scripts: 'js/*.js',
  sass: 'sass/**/*.scss',
  images: 'images/*'
};

gulp.task('jshint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//sass
// gulp.task('styles', function() {
//   return gulp.src(paths.sass)
//     .pipe(sass({ style: 'expanded' }))
//     .pipe(gulp.dest('assets/css'))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(minifycss())
//     .pipe(gulp.dest('assets/css'))
//     .pipe(notify({ message: 'Styles task complete' }));
// });

// gulp.task('sass', function() {
//    gulp.src('sass/**/*.scss')
//       .pipe(sass())
//       .pipe(gulp.dest('assets/css'))
//       .pipe(connect.reload())
//       .pipe(notify({ message: 'sass task complete' }));
// });

gulp.task('html', function() {
   gulp.src('*.html')
      .pipe(connect.reload())
      .pipe(notify({ message: 'html task complete' }));
});


gulp.task('css_minify', function() {
  gulp.src('css/libraries/*.css')
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/css/libraries'))
    .pipe(connect.reload());
});

// gulp.task('compass', function() {
//   gulp.src('sass/**/*.scss')
//     .pipe(compass({
//       config_file: './config.rb',
//       css: 'build/css',
//       sass: 'sass'
//     }))
//     .pipe(gulp.dest('assets/css'))
//     .pipe(connect.reload());
// });

gulp.task('compass_minify', function() {
  gulp.src('sass/**/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'css',
      sass: 'sass'
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/css'))
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('minify_libraries', function () {
  return gulp.src('js/libraries/*.js')
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest('assets/js/libraries'));
});

gulp.task('webserver', function() {
  connect.server({
      livereload: true
  });
});


//gulp task
gulp.task('watch', function () { //自定一個watch的排程名稱
  gulp.watch('sass/**/*.scss', ['compass_minify']); //監聽sass檔案
  gulp.watch(['*.*'], ['html']);
  gulp.watch(paths.scripts, ['scripts']); //監聽路徑，以及檔案變更後所執行的任務
  
});

//simple watch
// gulp.task('watch', function () {
//    gulp.watch('*.*', ['html']);
// });

//console callback event
// gulp.watch(paths.scripts, function (event) {
//    console.log('Event type: ' + event.type); 
//    console.log('Event path: ' + event.path); 
// });

//set watch task for event
// var watcher = gulp.watch(paths.scripts, ['jshint']);

// watcher.on('change', function (event) {
//    console.log('Event type: ' + event.type);
//    console.log('Event path: ' + event.path);
// });

// watcher.on('ready', function (event) {
//   console.log('ready Event type: ' + event.type);
//    console.log('ready Event path: ' + event.path);
// });

// Images
gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('assets/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function(cb) {
    del(['assets/css/**/*.css', 'assets/js/*.js', 'assets/images'], cb)
});

// gulp.task('default', ['minify','styles','scripts','images','sass','watch','webserver']);

// gulp.task('default', ['minify','scripts','images','compass','watch','webserver']);

// gulp.task('default', ['clean','jshint','minify_libraries','scripts','images','css_minify','compass','watch','webserver']);

gulp.task('default', ['clean','jshint','minify_libraries','scripts','images','css_minify','compass_minify','watch','webserver']);