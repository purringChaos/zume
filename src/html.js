'use strict';

const gulp = require('gulp');
const Task = require('./task');

class Html extends Task {
    src(pattern) {
        const src = super.src(pattern || 'data/**/*.md');
        this.watch.push(src);
        return src;
    }

    frontMatter(options) {
        return require('./plugins/front-matter')(options);
    }

    minify(options) {
        return require('./plugins/minify')(options);
    }

    inline(options) {
        options = options || {};
        options.rootpath = this.zume.src();

        return require('./plugins/inline')(options);
    }

    markdown(options) {
        return require('./plugins/markdown')(options);
    }

    permalink(options) {
        return require('./plugins/permalink')(options);
    }

    templates(options) {
        options = options || {};
        options.root = this.zume.src('templates');
        options.locals = options.locals || {};
        options.locals.zume = this.zume;

        this.watch.push(this.zume.src('templates/**/*.ejs'));

        return require('./plugins/templates')(options);
    }
}

module.exports = Html;