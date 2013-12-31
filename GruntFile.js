module.exports = function(grunt) {

	grunt.log.writeln('Starting Grunt Processing:');

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		srcDir: 'public/src',
		deployDir: 'public/deploy',

/////// CONCAT 
		concat: {
			// task docs: https://github.com/gruntjs/grunt-contrib-concat

			options: {

				// default banner inserted at top of the output file (overridden for some files below)
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("isoDateTime") %> */\n',

				// separator between each file
				// separator: '\n;\n',
				separator: '\n\n',

				// remove block comments at the head of input files
				stripBanners: true,

				process: true,

				// error on missing files
				nonull: true

			},

			keke_game: {
				options: {
					banner: "(function(){(typeof console === 'undefined' || typeof console.log === 'undefined')?console={log:function(){}}:console.log('----- KEKE_GAME.JS v<%= pkg.version %> created: <%= grunt.template.today(\"isoDateTime\") %>')})();\n"
				},
				src: [
					'<%= srcDir %>/js/utils/logger.js',
					'<%= srcDir %>/js/utils/kinetic_pixel_ratio_modifier.js',
					'<%= srcDir %>/js/utils/request_animation_frame.js',
					'<%= srcDir %>/js/utils/utils.js',
					'<%= srcDir %>/js/data/keke_animations.js',
					'<%= srcDir %>/js/data/stage.js',
					'<%= srcDir %>/js/data/game_config.js',
					'<%= srcDir %>/js/enum/control_keys.js',
					'<%= srcDir %>/js/enum/directions.js',
					'<%= srcDir %>/js/enum/joystick_states.js',
					'<%= srcDir %>/js/events/events.js',
					'<%= srcDir %>/js/views/view.js',
					'<%= srcDir %>/js/views/layers/ground_layer.js',
					'<%= srcDir %>/js/views/layers/image_layer.js',
					'<%= srcDir %>/js/views/layers/scrolling_layer.js',
					'<%= srcDir %>/js/views/layers/scrolling_layers.js',
					'<%= srcDir %>/js/views/enemies/Enemy.js',
					'<%= srcDir %>/js/views/enemies/Enemies.js',
					'<%= srcDir %>/js/views/player/player.js',
					'<%= srcDir %>/js/views/player/sprite_player.js',
					'<%= srcDir %>/js/views/player/life_meter.js',
					'<%= srcDir %>/js/views/controls/control_layer.js',
					'<%= srcDir %>/js/views/controls/control_button.js',
					'<%= srcDir %>/js/views/controls/joystick.js',
					'<%= srcDir %>/js/keke_game.js'
				],
				dest: '<%= deployDir %>/js/keke_game.js'
			},
			canvas_test: {
				options: {
					banner: "(function(){(typeof console === 'undefined' || typeof console.log === 'undefined')?console={log:function(){}}:console.log('----- CANVAS_TEST.JS v<%= pkg.version %> created: <%= grunt.template.today(\"isoDateTime\") %>')})();\n"
				},
				src: [
					'<%= srcDir %>/js/utils/logger.js',
					'<%= srcDir %>/js/utils/image_manager.js',
					'<%= srcDir %>/js/views/controls/controls.js',
					'<%= srcDir %>/js/canvas_test2.js',
				],
				dest: '<%= deployDir %>/js/canvas_test2.js'
			}
			
		},
/////// MINIFICATION
		uglify: {
			// task docs: https://github.com/gruntjs/grunt-contrib-uglify

			options: {

				// banner inserted at top of the output file
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				preserveComments: false,
				compress: true,
				report: 'gzip'
				// report: 'min'
			},

			keke_game: {
				src: [ '<%= deployDir %>/js/keke_game.js' ],
				dest: '<%= deployDir %>/js/keke_game.min.js'
			},
			canvas_test: {
				src: [ '<%= deployDir %>/js/canvas_test2.js' ],
				dest: '<%= deployDir %>/js/canvas_test2.min.js'
			}

		},
/////// COPYING
		copy: {
			// task docs: https://github.com/gruntjs/grunt-contrib-copy
			keke_game: {
				src: [ '<%= srcDir %>/index.html' ],
				dest: '<%= deployDir %>/index.html'
			},

			canvas_test: {
				src: [ '<%= srcDir %>/canvas_test_deploy.html' ],
				dest: '<%= deployDir %>/canvas_test_deploy.html'
			},
			
			images: {
				files: [{
					expand: true,
					cwd: '<%= srcDir %>/images/',
					src: [ '**' ],
					dest: '<%= deployDir %>/images/'
				}]
			},

 			css: {
				files: [{
					expand: true, 
					cwd: '<%= srcDir %>/css/',
					src: [ '**' ],
					dest: '<%= deployDir %>/css'
				}]
			}
		},
/////// LOCAL SERVER
		connect: {
			// docs: https://github.com/iammerrick/grunt-connect
			devel: {
				port: 9999,
				base: 'public',
				keepAlive: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-connect');
	
	grunt.registerTask('default', ['concat', 'uglify', 'copy']);
	grunt.registerTask('keke', ['concat:keke_game', 'uglify:keke_game', 'copy:keke_game', 'copy:css', 'copy:images']);
	grunt.registerTask('canvas_test', ['concat:canvas_test', 'uglify:canvas_test', 'copy:canvas_test', 'copy:css', 'copy:images']);

};