const deepFreeze = require ('~/util/deepFreeze.js');


module.exports = deepFreeze (
{
	grammar:
	[
		' ',     '-.',    '-,',    '-!', '-?', '-\'', '"-', '-"',
		'-\'ll', '-\'re', '-\'ve', '-n\'t',
		'-ing',  '-ly',   '-y',    '-t', '-m', '-r', '-s', '-e', '-d',
	],

	pronouns:
	[
		'I',    'me',   'my',   'you',  'your',
		'she',  'her',  'he',   'him',  'his',
		'we',   'us',   'they', 'them', 'their',
		'this', 'that', 'it',
	],

	misc:
	[
		'the',  'a',   'an',  'if',  'in',   'of',   'on',   'to',   'for', 'and', 'but', 'or',
		'be',   'am',  'is',  'are', 'was',  'were', 'been', 'will',
		'have', 'has', 'had', 'do',  'does', 'did',
		'yes',  'no',
	],
});
