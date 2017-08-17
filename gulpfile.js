// Gulpfile.js
var gulp = require('gulp')
	, gutil = require('gulp-util')
	, watch = require('gulp-watch')
	//, sass = require('gulp-sass')
	, uglify = require('gulp-uglify')
	, concat = require('gulp-concat')
	, rename = require('gulp-rename')
	, clean = require('gulp-clean')
	, clean_css = require('gulp-clean-css')
	, include = require('gulp-include')
	, cleanDest = require('gulp-clean-dest')
	, htmlreplace = require('gulp-html-replace')
	, autoprefixer = require('gulp-autoprefixer')
	, htmlmin = require('gulp-htmlmin');


var asset_folder_css = 'assets/sass';
var asset_folder_js = 'assets/js';

var dest_folder_css = 'css';
var dest_folder_js = 'js';
var dest_folder_build = 'build';



var version = '201708170909'


gulp.task('compile_sass', function () {

	return gulp.src(asset_folder_css + '/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['> 1%', 'IE 7'],
			cascade: false
		}))
		.pipe(gulp.dest(dest_folder_css));

});


// gulp.task('process_css', ['compile_sass'], function () {

// 	gulp.src([dest_folder_css + '/*.css', '!' + dest_folder_css + '/*.min.css'])
// 		.pipe(clean_css({ compatibility: 'ie8' }))
// 		.pipe(rename({ suffix: ".min" }))
// 		.pipe(gulp.dest(dest_folder_css));

// });


// gulp.task('minimize_js', function () {

// 	gulp.src([asset_folder_js + '/*.js', '!' + asset_folder_js + '/*.min.js'])
// 		.pipe(include({ extensions: "js" }))
// 		.pipe(concat('site-scripts.js'))
// 		.pipe(gulp.dest(dest_folder_js))

// 		.pipe(rename('site-scripts.min.js'))
// 		.pipe(uglify())
// 		.pipe(gulp.dest(dest_folder_js))
// });

gulp.task('minimize_js2', function () {
	gulp.src(['site-scripts.js'])
		.pipe(include({ extensions: "js" }))
		.pipe(gulp.dest(dest_folder_build_js))

		.pipe(rename('site-scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(dest_folder_build_js))

	gulp.src(['app.js'])
		.pipe(include({ extensions: "js" }))
		.pipe(concat('app.js'))
		.pipe(gulp.dest(dest_folder_build_js))

		.pipe(rename('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(dest_folder_build_js))
});

gulp.task('clean-build', function () {
	return gulp.src(dest_folder_build, { read: false })
		.pipe(clean());
});

gulp.task('buildsite', ['clean-build'], function () {

	gulp.src(['fonts/**/*.*', 'images/**/*.*'], { base: "." })
		.pipe(gulp.dest(dest_folder_build));

	gulp.src([dest_folder_css + '/*.css'], { base: "." })
		.pipe(clean_css({ compatibility: 'ie8' }))
		.pipe(rename({ suffix: ".min." + version }))
		.pipe(gulp.dest(dest_folder_build));

	gulp.src([dest_folder_js + '/*.js'], { base: "." })
		.pipe(include({ extensions: "js" }))
		.pipe(rename({ suffix: ".min." + version }))
		.pipe(uglify())
		.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
		.pipe(gulp.dest(dest_folder_build));

	gulp.src(['*.html'])
		.pipe(htmlreplace({
			'css': "./css/style.min." + version + '.css',
			'jsApp': './js/app.min.' + version + '.js',
			'jsSite': './js/site-scripts.min.' + version + '.js',
		}))
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest(dest_folder_build))


});


gulp.task('default', function () {
	return gutil.log('Gulp is running!')
});




gulp.task('watch', function () {
	gulp.watch(['assets/**/*.css', 'assets/**/*.scss', 'assets/**/*.js'], ['compile_sass', 'process_css', 'minimize_js']);
});


