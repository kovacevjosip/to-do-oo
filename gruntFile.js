// Grunt module
module.exports = function (grunt) {

    grunt.initConfig({
        // Read package file
        application: grunt.file.readJSON('package.json'),
        
        // Create settings
        settings: {
            server: {
                protocol: 'http',
                host: '127.0.0.1',
                port: 3100
            },
            dirs: {
                src: 'src',
                dist: 'dist',
                npm: 'node_modules'
            }
        },
        
        // Clean task
        clean: {
            dev: [
                '<%= settings.dirs.src %>/css/*'
            ]
        },
        
        // Copy task
        copy: {
            dev_assets: {
                files: [{
                    expand: true,
                    cwd: '<%= settings.dirs.src %>/scss/',
                    src: ['assets/**'],
                    dest: '<%= settings.dirs.src %>/css/'
                }]
            }
        },
        
        // Concat task
        concat: {
            // Application
            app: {
                src: [
                  '<%= settings.dirs.src %>/app/_intro.js',
                  '<%= settings.dirs.src %>/app/model/**/*.js',
                  '<%= settings.dirs.src %>/app/app.js',
                  '<%= settings.dirs.src %>/app/_outro.js'
                ],
                dest: '<%= settings.dirs.src %>/js/app.js'
            },
            // Dependencies
            dep: {
                src: [
                    '<%= settings.dirs.npm %>/velocity-animate/velocity.js',
                ],
                dest: '<%= settings.dirs.src %>/js/dep.js'
            }
        },
        
        // JSHint task
        jshint: {
            options: {
                globals: {
                    module: false,
                    require: false,
                    console: false,
                    exports: false
                },
                ignores: [
                    'js/**/_*.js'
                ],
            },
            files: [
                'gruntFile.js',
                '<%= settings.dirs.src %>/app/**/*.js',
                '!<%= settings.dirs.src %>/**/_*.js',
            ]
        },
        
        // Connect task
        connect: {
            server: {
                options: {
                    debug: true,
                    protocol: '<%= settings.server.protocol %>',
                    hostname: '<%= settings.server.host %>',
                    port: '<%= settings.server.port %>',
                    open: '<%= settings.server.protocol %>://<%= settings.server.host %>:<%= settings.server.port %>'
                }
            }
        },
        
         // Sass task
        sass: {
            // Development
            dev: {
                options: {
                    style: 'compressed',
                    unixNewlines: true,
                    noCache: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= settings.dirs.src %>/scss/modules/',
                    src: ['**/*.scss', '!**/_*.scss'],
                    dest: '<%= settings.dirs.src %>/css/',
                    ext: '.css'
                }]
            }
        },
        
         // Watch task
        watch: {
            options: {
                atBegin: true
            },
            jshint: {
                files: '<%= jshint.files %>',
                tasks: ['jshint']
            },
            remove: {
                files: '<%= settings.dirs.src %>/css/assets/**',
                tasks: ['clean:dev'],
            },
            copy: {
                files: '<%= settings.dirs.src %>/scss/assets/**',
                tasks: ['copy:dev_assets'],
            },
            sass: {
                files: '<%= settings.dirs.src %>/scss/**/*.scss',
                tasks: ['sass:dev']
            },
            concat: {
                files: '<%= concat.app.src %>',
                tasks: ['concat:app']
            }
        }
    });
    
    // Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    
    // Develop task
    grunt.registerTask('dev', [
        'concat:dep',
        'concat:app',
        'clean:dev',
        'copy:dev_assets',
        'connect',
        'watch'
    ]);

};
