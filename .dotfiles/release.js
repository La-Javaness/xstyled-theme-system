module.exports = {
	repositoryUrl: 'git@github.com:La-Javaness/xstyled-theme-internals.git',
	branches: ['master'],
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		'@semantic-release/changelog',
		[
			'@semantic-release/git',
			{
				assets: ['CHANGELOG.md', 'package.json'],
				message: 'chore(release): ${nextRelease.version} [skip ci]

${nextRelease.notes}',
			},
		],
		'@semantic-release/npm',
	],
}
