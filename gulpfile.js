// Gulpfile.js
var gulp = require('gulp')
, gutil = require('gulp-util')
, watch = require('gulp-watch')
, ftp = require('vinyl-ftp')
, sass = require('gulp-sass')
, uglify = require('gulp-uglify')
, concat = require('gulp-concat')
, rename = require('gulp-rename') 
, clean_css = require('gulp-clean-css')
, include = require('gulp-include')
, autoprefixer = require('gulp-autoprefixer');
 

var asset_folder_css = 'assets/sass';
var asset_folder_js = 'assets/js';

var dest_folder_css = 'css';
var dest_folder_js = 'js';

var ftp_uploads = [
	'index.php',
	'.htaccess'
];




gulp.task('compile_sass', function () {
	
  return gulp.src(asset_folder_css + '/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['> 1%', 'IE 7'],
		cascade: false
	}))
	.pipe(gulp.dest(dest_folder_css));
	
});




gulp.task('process_css', ['compile_sass'], function () {

	gulp.src([dest_folder_css+'/*.css', '!'+dest_folder_css+'/*.min.css'])
	.pipe(clean_css({compatibility: 'ie8'}))
	.pipe(rename({suffix: ".min"}))
	.pipe(gulp.dest(dest_folder_css));

});



gulp.task('minimize_js', ['process_css'], function () {

  gulp.src([asset_folder_js + '/*.js', '!'+asset_folder_js + '/*.min.js'])

    .pipe(include({extensions: "js"}))
	.pipe(concat('site-scripts.js'))
	.pipe(gulp.dest(dest_folder_js))
	.pipe(rename('site-scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dest_folder_js))
		
});

gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});






gulp.task('watch', function(){
	gulp.watch(['assets/**/*.css', 'assets/**/*.scss', 'assets/**/*.js'], ['compile_sass', 'process_css', 'minimize_js']);
});


