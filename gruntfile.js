module.exports = function(grunt){

    "use strict";
   require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        

        cssmin: {
            build: {
                src: 'todo.css',
                dest: 'todo.min.css'
            }
        },

       

        watch: {
            html: {
                files: ['todo.html'],
                tasks: ['htmlhint']
            },
            js: {
                files: ['todo.js'],
                tasks: ['uglify']
            },
            css: {
                files: ['todo.css'],
                tasks: ['cssmin']
            }
        },

       

        uglify: {
            build: {
                files: {
                    'todo.min.js': ['todo.js']
                }
            }
        }

    });

    grunt.registerTask('default',   ['cssmin','uglify']);
    grunt.registerTask('buildcss',  ['sass', 'cssc', 'cssmin']);

};