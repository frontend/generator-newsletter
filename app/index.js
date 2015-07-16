'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var AppGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
        this.log(yosay('Everything went smoothly! We\'ll just download the dependencies now. Bye!'));
      } else {
        this.log(yosay('Everything went smoothly! Bye!'));
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Newsletter generator by Antistatique!'));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: "What's the name of your project?",
      default: this.appname
    }];

    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.appname = this.name;

      done();
    }.bind(this));
  },

  app: function () {
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');    
    this.template('README.md', 'README.md');

    this.directory('newsletter', 'newsletter');
    this.directory('tasks', 'tasks');

    this.copy('tasks/gh-pages.js', 'tasks/gh-pages.js');
    this.copy('tasks/server.js', 'tasks/server.js');

    this.copy('newsletter/index.html', 'newsletter/index.html');
    this.copy('newsletter/px.gif', 'newsletter/px.gif');

    this.template('gulp_config.json', 'gulp_config.json');
    this.template('gulpfile.js', 'gulpfile.js');
  },

  projectfiles: function () {
    this.copy('gitignore', '.gitignore');
  }
});

module.exports = AppGenerator;
