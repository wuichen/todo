module.exports = function(grunt){

    "use strict";
   require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        

        cssmin: {
            build: {
                src: 'css/todo.css',
                dest: 'css/todo.min.css'
            }
        },

       

        watch: {
            
            js: {
                files: ['js/todo.js'],
                tasks: ['uglify']
            },
            css: {
                files: ['css/todo.css'],
                tasks: ['cssmin']
            }
        },

       

        uglify: {
            build: {
                files: {
                    'js/todo.min.js': ['js/todo.js'],
					'js/time.min.js':['js/time.js']
                }
            }
        }

    });

    grunt.registerTask('default',   ['cssmin','uglify']);
    /*grunt.registerTask('buildcss',  ['cssmin']);*/

};