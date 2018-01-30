const gulp = require('gulp');
const rename = require('gulp-rename');
const download = require('gulp-download');
const topojson = require('topojson-server');
const gulpFn = require('gulp-fn');

gulp.task('download', () => {
  return download('https://raw.githubusercontent.com/ecomfe/echarts/master/map/json/world.json')
  .pipe(rename('world.geo.json'))
  .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['download'], () => {
  return gulp.src('dist/world.geo.json')
  .pipe(gulpFn((file) => {
    const content = JSON.parse(String(file.contents));
    file.contents = new Buffer(JSON.stringify(topojson.topology({ collection: content })));
  }))
  .pipe(rename('world.topo.json'))
  .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['build']);
