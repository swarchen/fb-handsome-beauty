var gulp = require('gulp');
	gulpUglify = require('gulp-uglify');
	gulpSass = require('gulp-sass');      // 載入 gulp-sass
	browserSync = require('browser-sync');
	nodemon = require('gulp-nodemon');


gulp.task('default',['scripts','browser-sync','watch']);

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 7000,
	});
});

gulp.task('watch', function () {
    gulp.watch('public/javascripts/*.js', ['scripts']);
    gulp.watch('public/stylesheets/scss/**/*.scss', ['styles']);
    gulp.watch('public/javascripts/minify/*.js', browserSync.reload);
    gulp.watch('public/stylesheets/*.css', browserSync.reload);
});

gulp.task('scripts', function () {
    gulp.src('public/javascripts/*.js')        // 指定要處理的原始 JavaScript 檔案目錄
    	.on('error', console.error.bind(console))
        .pipe(gulpUglify())                     // 將 JavaScript 做最小化
        .pipe(gulp.dest('public/javascripts/minify'));  // 指定最小化後的 JavaScript 檔案目錄
});

gulp.task('styles', function () {
    gulp.src('public/stylesheets/scss/**/*.scss')                      // 指定要處理的 Scss 檔案目錄
        .on('error', console.error.bind(console))   // 使用錯誤事件處理例外
        .pipe(gulpSass({                            // 編譯 Scss
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('public/stylesheets'));                  // 指定編譯後的 css 檔案目錄
});

gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'bin/www'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});
