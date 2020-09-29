// Replacements for bad words.


// TODO: Add `bad-words` npm package to filter names and word tiles.
//       Set to lowercase and remove all non-alphabetic characters before checking for bad words.
//       Account for 5ub5t!tut3 ch@r4cterz too.
//
//       Replace blacklisted words with the ones below, with no repeats.
//
//       Also, be sure to add the words added in this pull request:
//           https://github.com/web-mech/badwords/pull/70
//
//       Also, be sure to add things like "BBC" to the list of bad words (sigh)

const replacements =
[
	'thunder', 'bubble', 'sip', 'determined', 'married', 'scratch', 'annoying',
	'curl', 'spotty', 'vessel', 'owe', 'imported', 'blush', 'available', 'absent',
	'dashing', 'quince', 'thank', 'happen', 'something', 'nothing', 'rambunctious',
	'than', 'meme', 'somber', 'random', 'scarecrow', 'release', 'obnoxious', 'fun',
	'repulsive', 'playground', 'responsible', 'list', 'fixed', 'church', 'horn', 'hover',
	'well-to-do', 'scorch', 'allow', 'learn', 'buffalo', 'aeiou', 'pest', 'cynical',
	'periodic', 'elephant', 'near', 'glow', 'offbeat', 'common', 'resonant', 'remove',
	'Farragomate', 'JavaScript', 'Node.js', 'Casual Collective', '✧･ﾟ: *✧･ﾟ:*', '-',
	'who', 'what', 'when', 'where', 'why', 'how', 'which', 'because', 'with', 'without',
	'¯\\_(ツ)_/¯', '(╯°□°)╯︵ ┻━┻', '┬─┬ノ( ° _ °ノ)', '(✿◕‿◕)', 'ಠ_ಠ', '^^', '^.^',
	'😂', '🤔', '😩👌', '♥', '💔', '👍', '👎', '🅱', '🆗', '🆒',
	':)', ';)', ':^)', ':(', ':\'(', ':^(', ':/', ':\\', ':D', 'D:', ':I', ':|', 'O_O',
	'Oops', 'D\'oh', 'Wow', 'Gosh', 'Gee', 'Geez', 'Zombo.com', 'Hank Hill', 'John Madden',
];


module.exports = replacements;
