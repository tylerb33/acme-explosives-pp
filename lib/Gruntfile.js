module.exports = function(grunt){

	grunt.initConfig({
		browserify: {
			js: {
				src: ['../javascripts/main.js'],
				dest: '../dist/app.js'	
			},	
		options: {
			transform: ["hbsfy"],
			browserifyOptions: {
				paths: [
					"./node_modules"
				]
			}
		}
	},
		jshint: {
			options: {
				predef: ["document", "console"],
				esnext: true,
				globalstrict: true,
				globals: {"$": true},
				browserify: true
			},
			files: ['../javascripts/**/*.js']
		},
		
		watch: {
			javascripts: {
				files: ['../javascripts/**/*.js'],
				tasks: ['jshint', 'browserify']
			},
			sass: {
				files: ['../sass/**/*.scss'],
				tasks: ['sass']
			},
			hbs: {
				files: ['../templates/*.hbs'],
				tasks: ['browserify']
			}
		}
	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	grunt.registerTask('default', ['jshint', 'browserify', 'watch']);

};