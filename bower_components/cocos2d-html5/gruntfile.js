module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.initConfig({
		watch: {
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'./template/index.html',
					'./template/**/*.js'
				]
			}
		},
		connect: {
			options: {
				port: 9001,
				livereload: 35731,
				// change this to '0.0.0.0' to access the server from outside  
				hostname: 'localhost'
			},
			livereload: {
				options: {
					open: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>/template/index.html',
				}
			}
		}
	});


	grunt.registerTask('serve', function() {
		grunt.task.run([
			'connect:livereload',
			'watch'
		]);
	});

	

	grunt.registerTask('default', ['serve']);
};