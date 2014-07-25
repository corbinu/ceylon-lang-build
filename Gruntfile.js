/*global module:false*/
module.exports = function(grunt) {

	grunt.initConfig({
		exec: {
			distsetup: {
				command: 'ant setup',
				cwd: 'build/ceylon-dist'
			},
			distpublish: {
				command: 'ant clean publish-all',
				cwd: 'build/ceylon-dist'
			},
			distupdate: {
				command: 'ant update-all',
				cwd: 'build/ceylon-dist'
			},
			disteclipse: {
				command: 'ant clean publish-all ide-quick',
				cwd: 'build/ceylon-dist'
			},
			distpermiss: {
				command: 'sudo chmod -R 777 dist',
				cwd: 'out'
			},
			eclipsebuild: {
				command: 'mvn clean install -DskipTests',
				cwd: 'build/ceylon-ide-eclipse'
			},
			eclipseupdate: {
				command: 'git pull',
				cwd: 'build/ceylon-ide-eclipse'
			},
			sdkbuild: {
				command: 'ant publish',
				cwd: 'build/ceylon-sdk'
			},
			sdkeclipse: {
				command: 'ant clean publish ide-quick',
				cwd: 'build/ceylon-sdk'
			},
			sdkupdate: {
				command: 'git pull',
				cwd: 'build/ceylon-sdk'
			},
			formatterbuild: {
				command: 'ant clean publish ide-quick',
				cwd: 'build/ceylon.formatter'
			},
			formatterupdate: {
				command: 'git pull',
				cwd: 'build/ceylon.formatter'
			}
		},
		gitclone: {
	        dist: {
	            options: {
	                repository: 'https://github.com/ceylon/ceylon-dist.git',
	                directory: 'build/ceylon-dist'
	            }
	        },
			sdk: {
				options: {
					repository: 'https://github.com/ceylon/ceylon-sdk.git',
					directory: 'build/ceylon-sdk'
				}
			},
			formatter: {
				options: {
					repository: 'https://github.com/ceylon/ceylon.formatter.git',
					directory: 'build/ceylon.formatter'
				}
			},
			eclipse: {
				options: {
					repository: 'https://github.com/ceylon/ceylon-ide-eclipse.git',
					directory: 'build/ceylon-ide-eclipse'
				}
			}
	    },
		copy: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'build/ceylon-dist/dist/',
						src: ['**'],
						dest: 'out/dist'
					},
					{
						expand: true,
						cwd: 'build/ceylon-dist/dist/repo/ceylon/',
						src: ['**/*.js'],
						dest: 'out/sdk/js/ceylon'
					},
					{
						expand: true,
						cwd: 'build/ceylon-dist/dist/repo/ceylon/',
						src: ['**/*.car'],
						dest: 'out/sdk/jvm/ceylon'
					}
				]
			},
			sdk: {
				files: [
					{
						expand: true,
						cwd: 'build/ceylon-sdk/modules/ceylon/',
						src: ['**/*.js'],
						dest: 'out/sdk/js/ceylon'
					},
					{
						expand: true,
						cwd: 'build/ceylon-sdk/modules/ceylon/',
						src: ['**/*.car'],
						dest: 'out/sdk/jvm/ceylon'
					}
				]
			},
			eclipse: {
				files: [
					{
						expand: true,
						cwd: 'build/ceylon-ide-eclipse/site/target/site/',
						src: ['**'],
						dest: 'out/eclipse'
					}
			    ]
			}
		},
		clean: {
			dist: [ 'build'	],
			out: [ 'out' ]
		}
	});

	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-git');

	grunt.registerTask('default', ['update', 'build']);

	grunt.registerTask('setup', ['gitclone:dist', 'gitclone:sdk', 'gitclone:formatter', 'gitclone:eclipse', 'exec:distsetup']);
	grunt.registerTask('update', ['exec:distupdate', 'exec:sdkupdate', 'exec:eclipseupdate', 'exec:formatterupdate']);

	grunt.registerTask('build', ['clean:out', 'exec:distpublish', 'exec:sdkbuild', 'exec:formatterbuild', 'exec:disteclipse', 'exec:sdkeclipse', 'exec:eclipsebuild', 'copy', 'exec:distpermiss']);

};
