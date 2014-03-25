module.exports = function(grunt) {

	var project = grunt.option('pjt');
	var srcDir = 'public/src';
	var deployDir = 'public/deploy';
	var projectSrcDir;
	
	if(typeof(project) !== 'undefined') {
		// srcDir += '/' + project;
		projectSrcDir = srcDir + '/' + project;
		deployDir += '/' + project;
	}
	grunt.log.writeln('Starting Grunt Processing');
	grunt.log.writeln('\tproject = ' + project 
						+ '\n\tsrcDir = ' + srcDir 
						+ '\n\tdeployDir = ' + deployDir 
						+ '\n\tprojectSrcDir = ' + projectSrcDir);


	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		project: project,
		srcDir: srcDir,
		deployDir: deployDir,
		projectSrcDir: projectSrcDir,

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

			project: {
				options: {
					banner: "(function(){(typeof console === 'undefined' || typeof console.log === 'undefined')?console={log:function(){}}:console.log('----- <%= project %> created: <%= grunt.template.today(\"isoDateTime\") %>')})();\n"
				},
				src: '<%= projectJavascripts %>',
				dest: '<%= deployDir %>/js/<%= project %>.js'
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
				// report: 'gzip'
				report: 'min'
			},

			project: {
				src: [ '<%= deployDir %>/js/<%= project %>.js' ],
				dest: '<%= deployDir %>/js/<%= project %>.min.js'
			}

		},
/////// COPYING
		copy: {
			// task docs: https://github.com/gruntjs/grunt-contrib-copy

			project: {
				files: [
				{
					expand: true,
					cwd: '<%= projectSrcDir %>/images/',
					src: [ '**' ],
					dest: '<%= deployDir %>/images/'
				},
				{
					expand: true, 
					cwd: '<%= projectSrcDir %>/css/',
					src: [ '**' ],
					dest: '<%= deployDir %>/css'
				}
				]
			}

		},
/////// LOCAL SERVER
		connect: {
			/*
			// docs: https://github.com/iammerrick/grunt-connect
			devel: {
				port: 9999,
				base: 'public',
				keepAlive: true
			}
			*/
			server: { 
				port: 9999,
				base: 'public',
				keepAlive: true,
				options: {
					middleware: function(connect, options) {
						return [
							function(req, res, next) {
								// If path has .json, accept json
								if (url.parse(req.url).pathname.match(/\.json$/)) {
									req.headers.accept = 'application/json';
								}
								next();
							},
								// then serve a static folder
								connect.static('base/folder/')
							]
						}
					} 
				} 
			}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-connect');
	grunt.loadTasks('grunt/tasks');
	
	grunt.registerTask('default', ['projectDeploySetup', 'concat:project', 'uglify:project', 'copy:project', 'createProjectHtml']);
	// grunt.registerTask('default', ['concat', 'uglify', 'copy']);
	// grunt.registerTask('keke2', ['concat:keke2_game', 'uglify:keke2_game', 'uglify:stage', 'copy:keke2_game_html', 'copy:keke2_game_js', 'copy:keke2_game_css:files']);
	// grunt.registerTask('keke2-images', ['copy:keke2_game_images:files'])
	// grunt.registerTask('keke', ['concat:keke_game', 'uglify:keke_game', 'copy:keke_game_html', 'copy:keke_game_css:files']);
	// grunt.registerTask('keke-images', ['copy:keke_game_images:files']);
	// grunt.registerTask('canvas_test', ['concat:canvas_test', 'uglify:canvas_test', 'copy:canvas_test_html', 'copy:canvas_test_css:files']);

};