'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      docs: {
        files: ['src/**/*.js'],
        tasks: ['dgeni']
      }
      //tests: {
      //  files: ['src/*.js', 'src/**/*.js', 'test/*Spec.js', 'test/**/*Spec.js'],
      //  tasks: ['karma:unit:run']
      //}
    },
    concat: {
      build: {
        src: [
          'src/parse/base.js',
          'src/parse/auth.js',
          'src/parse/object.js',
          'src/parse/cloud.js',
          'src/parse/events.js',
          'src/parse/files.js',
          'src/parse/installations.js',
          'src/parse/notifications.js',
          'src/parse/roles.js',
          'src/parse/user.js'
        ],
        dest: 'dist/parseangular.js'
      }
    },
    jshint: {
      options: {
        globalstrict: true,
        node: true,
        loopfunc: true,
        browser: true,
        devel: true,
        globals: {
          angular: false,
          $: false,
          moment: false,
          module: false,
          forge: false,
          _: false
        }
      },
      //quick version - will not fail entire grunt process if there are lint errors
      beforeconcatQ: {
        options: {
          force: true,
          ignores: ['**.min.js']
        },
        files: {
          src: ['**.js']
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      build: {
        files: {},
        src: 'dist/parseangular.js',
        dest: 'dist/parseangular.min.js'
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        background: true
      },
      ci: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    }
  });

  grunt.registerTask('dgeni', 'Generate docs via dgeni.', function () {
    var dgeni = require('dgeni');
    var done = this.async();

    dgeni('docs/dgeni.conf.js')
      .generateDocs()
      .then(done);
  });

  grunt.registerTask('build', ['concat:build', 'jshint:beforeconcatQ', 'uglify:build']);

  grunt.registerTask('default', ['build', 'karma:unit:start', 'watch']);
};