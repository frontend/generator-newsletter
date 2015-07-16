module.exports = function(gulp, $, config, browserSync, runSequence) {

  var reload = browserSync.reload;

 /**
  * Serve
  */
  gulp.task('serve', function () {
    browserSync({
      server: {
        baseDir: [config.app.basedir],
      },
      open: false,
      notify: false
    });
    gulp.watch([
      '**/*.html',
    ], function() {
      reload();
    });
  });

};
