var gulp = require('gulp');
var replace = require('gulp-replace');
var rimraf = require('gulp-rimraf');
var runSequence = require('run-sequence');
var tsc = require('gulp-typescript');

var paths = {
    dist: './dist',
    sourceFiles: ['./src/*'],
    toDelete: ['./dist/index.ts','./dist/materialize-directive.ts','./dist/src','./dist/app','./dist/test'],
    distSourcesFiles: ['./dist/src/*']
};

gulp.task('clean', function () {
    return gulp.src(paths.dist, {read: false}).pipe(rimraf({force: true}));
});

gulp.task('copySources', function(){
    return gulp.src(paths.sourceFiles).pipe(gulp.dest(paths.dist));
});

gulp.task('tsc', function () {
    var tsProject = tsc.createProject('tsconfig.json', {outDir:"dist",declaration:true});
    var tsResult = tsProject.src().pipe(tsc(tsProject));
    tsResult.pipe(gulp.dest(paths.dist));
    return tsResult.dts.pipe(gulp.dest(paths.dist));
});

gulp.task('copy', function(){
    return gulp.src(paths.distSourcesFiles).pipe(gulp.dest(paths.dist));
});

gulp.task('cleanup', function () {
    return gulp.src(paths.toDelete, {read: false}).pipe(rimraf({force: true}));
});

gulp.task('fix-systemjs-register', function () {
    return gulp.src('./dist/materialize-directive.js').pipe(replace("['@angular/core']", "'angular2-materialize', ['@angular/core']")).pipe(gulp.dest(paths.dist));
});

// entry point - run tasks in a sequence
gulp.task('default', function (callback) {
    runSequence(
        'clean',
        'copySources',
        'tsc',
        'copy',
        'cleanup',
		'fix-systemjs-register',
        function (error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('FINISHED SUCCESSFULLY');
            }
            callback(error);
        });
});
