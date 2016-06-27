module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		wiredep: {
			task: {
				src: 'scr/html/*.html'
			}
		},

		watch: {
			livereload: {
				options: {
					livereload: true
				},
				files: [
					'Gruntfile.js',
					'src/js/*.js',
					'src/html/*.html'
				]
			}
		},

		connect: {
			server: {
				options: {
					port: 8000
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('serve', [
		'default',
		'connect:server',
		'watch'
	]);

	// Default task(s).
	grunt.registerTask('default', [
		'wiredep'
	]);

};