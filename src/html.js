const Task = require('./task');
const TaskFork = require('./task-fork');
const merge = require('merge-options');
const defaults = {
    src: 'data',
    pattern: '**/*.md',
    incremental: true
};

class HtmlFork extends TaskFork {
    yaml(options) {
        return this.exec('yaml', options);
    }

    frontMatter(options) {
        return this.exec('frontMatter', options);
    }

    markdown(options) {
        return this.exec('markdown', options);
    }

    permalink(options) {
        return this.exec('permalink', options);
    }

    ejs(options = {}) {
        return this.exec('ejs', options);
    }

    urls(options = {}) {
        return this.exec('urls', options);
    }

    navigation(options) {
        return this.exec('navigation', options);
    }

    cheerio(options) {
        return this.exec('cheerio', options);
    }
}

class Html extends Task {
    constructor(zume, options) {
        super(zume, merge(defaults, options));
    }

    fork(fn) {
        return new HtmlFork(this, fn);
    }

    add(options = {}) {
        options.incremental = false;
        return new HtmlFork(this.zume.html(options), this);
    }

    yaml(options) {
        return this.pipe(require('./plugins/yaml')(options));
    }

    frontMatter(options) {
        return this.pipe(require('./plugins/front-matter')(options));
    }

    markdown(options) {
        return this.pipe(require('./plugins/markdown')(options));
    }

    permalink(options) {
        return this.pipe(require('./plugins/permalink')(options));
    }

    ejs(options = {}) {
        options.root = this.zume.src('templates');
        options.locals = options.locals || {};
        options.locals.zume = this.zume;

        this.watch.push(this.zume.src('templates/**/*.ejs'));

        return this.pipe(require('./plugins/ejs')(options));
    }

    urls(options = {}) {
        options.zume = this.zume;

        return this.pipe(require('./plugins/urls')(options));
    }

    navigation(options) {
        return this.pipe(require('./plugins/navigation')(options));
    }

    cheerio(options) {
        return this.pipe(require('./plugins/cheerio')(options));
    }
}

module.exports = Html;
