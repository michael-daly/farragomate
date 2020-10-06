/**
 * Regex hieroglyphics.
 *
 * I have no doubt people will be able to bypass this. People are very creative at getting around
 * word filters. This is just to provide some deterrence and prevent certain words from appearing
 * in the wordbanks.
 *
 * In a perfect world we wouldn't need this. Sigh...
 */

module.exports =
{
	// Regex rules for all situations
	all:
	[
		// Censor permutations of "c*m" that is not part of a word, unless the next character
		// is an s, z, e, or is an -ed suffix.
		/\bc+\s*u+\s*m+([sz\W\d]+|\b|(ed)|e)/gi,


		/* Censor permutations of racist slurs. */

		/n+((\s|\W)*(e|3))+((\s|\W)*g)+((\s|\W)*r)+((\s|\W)*(o|0))+\w*/gi,
		/j+(\s|\W)*(a|4|@)+(\s|\W)*p+(\s|\W)*([sz]+|\b)/gi,
		/g+((\s|\W)*(o|0))+((\s|\W)*(o|0))+k+/gi,
		/\bs+((\s|\W)*p)+((\s|\W)*(i|l|1|!))+((\s|\W)*(c|k))+((\s|\W)*(s|z|5|\$|\b))+/gi,
		/\bs+((\s|\W)*p)+((\s|\W)*(i|l|1|!))+((\s|\W)*(c|k))+((\s|\W)*(k))+\w*/gi,
		/\bw+((\s|\W)*(e|3))+((\s|\W)*t)+((\s|\W)*b)+((\s|\W)*(a|4|@))+((\s|\W)*(c|k))+\w*/gi,

		// Censor permutations of "n[h]i[h]g" provided that there's not an h or an e after it.
		/\bn+(\s|\W)*h*(\s|\W)*(i|l|1)+(\s|\W)*h*(\s|\W)*g+(\s|\W)*([^he]|\b)/gi,

		// Clean up for the above one regarding words with g after "nigh-" prefix.
		/\bn+(\s|\W)*h*(\s|\W)*(i|l|1)+(\s|\W)*h*(\s|\W)*g+(\s|\W)*[he]*g/gi,

		// Last one to censor the rest except Nigeria and Nigel.
		/\bn+h*(i|l|1)+h*g+(e+([^l]*r+|\b))\b/gi,

		// Censor permutations of a certain slur unless the word is Pakistan.
		/\bp+(\s|\W)*h*(\s|\W)*(a|4|@)+(\s|\W)*h*(\s|\W)*k+(\s|\W)*(i|l|1)+s*[^t]*[^a]*[^n]*\b/gi,

		// Censor permutations of "KKK".
		/\bk(\s|\W)*k(\s|\W)*k\b/gi,


		// Censor permutations of "ass[w*]"
		/((\b(a|4))|(a|4|@))ss+((w+)[a-zA-Z]+)*\b/gi,

		// Censor some permutations of "a**h***".
		/(a|4|\@)+(\s|\W)*s(\s|\W)*s+(\s|\W)*h+(\s|\W)*(o|0)+(\s|\W)*((l|i|1)+(\s|\W)*(e|3)+|(e|3)+(\s|\W)*(l|i|1)+)*/gi,

		// Censor permutations of "b****rd".
		/\bb+((\s|\W)*(a|4|@))+((\s|\W)*(s|z|5))+((\s|\W)*t)+((\s|\W)*(a|4|@|e|3))+((\s|\W)*r)+((\s|\W)*d)+/gi,

		// Censor permutations of "bi[a|o]tch".
		/\bb+(\s|\W)*(i|l|1)+(\s|\W)*(a|4|@|o|0)*(\s|\W)*t+(\s|\W)*c+(\s|\W)*h+/,

		// Censor permutations of "pr**k".
		/((\s|\W)*p)+((\s|\W)*r)+((\s|\W)*(i|l|1|!))+((\s|\W)*(c|k))+((\s|\W)*(c|k))+/gi,

		// Censor permutations of "tw*t".
		/((\s|\W)*t)+((\s|\W)*w)+((\s|\W)*(a|4|@))+((\s|\W)*t)+((\s|\W)*(s|z|\d))*\b/gi,

		// Censor permutations of "d**k".
		/d+((\s|\W)*(i|l|1))+((\s|\W)*(c|k))+((\s|\W)*(c|k))+/gi,

		// Censor permutations of "p***y".
		/p+((\s|\W)*u)+((\s|\W)*(s|5|\$))+(\s|\W)*y+/gi,

		// Censor permutations of "c**k".
		/\b(c|k)+((\s|\W)*(o|0))+((\s|\W)*(c|k))+((\s|\W)*(c|k))+(s|z|(h\w*)|\d)*\b/gi,

		// Censor permutations of "c**t".
		/(c|k)+((\s|\W)*u)+((\s|\W)*n)+(\s|\W)*t+/gi,

		// Censor permutations of "cl*t".
		/c+((\s|\W)*(l|i|1))+((\s|\W)*(l|i|1))+(\s|\W)*t+/gi,

		// Censor some more sexual words.
		/v+((\s|\W)*(a|4|@))+((\s|\W)*g)+((\s|\W)*(i|l|1))+((\s|\W)*n)+((\s|\W)*[^g])+/gi,
		/(p|b)+((\s|\W)*(e|3))+((\s|\W)*n)+((\s|\W)*(i|l|u|1|!))+((\s|\W)*(s|z|5|\$))+/gi,
		/t+((\s|\W)*(e|3))+((\s|\W)*(s|5|\$))+((\s|\W)*t)+((\s|\W)*(i|l|1|!))+((\s|\W)*(c|k|s|z|5|\$))+\w*/,
		/s+((\s|\W)*(c|k))+((\s|\W)*r)+((\s|\W)*(o|0))+((\s|\W)*t)+\w*/gi,
		/((\b(a|4|@))|(@))+(\s|\W)*n+(\s|\W)*u+(\s|\W)*s+/gi,
		/((\s|\W)*r)+((\s|\W)*(e|3))+((\s|\W)*(c|k|ck|kc))+((\s|\W)*t)+((\s|\W)*u)+((\s|\W)*m)+\w*/gi,
		/j+((\s|\W)*(i|l|1))+((\s|\W)*(s|z))+((\s|\W)*(s|z))+/gi,
		/j+((\s|\W)*(i|l|1))+((\s|\W)*(s|z))+(\s|\W)*m+/gi,
		/\bb+((\s|\W)*(l|i|1))+((\s|\W)*(o|0))+((\s|\W)*w)+((\s|\W)*j)+((\s|\W)*(o|0))+(\s|\W)*b+/,

		// Censor permutations of "s**t".
		/((\s|\W)*(s|5|\$))+((\s|\W)*h)+((\s|\W)*(i|l|a|y|1|!))+((\s|\W)*t)+/gi,

		// Censor permutations of "f**k", "f*k", etc.
		/f+((\s|\W)*u)+((\s|\W)*(c|k))+\b/gi,

		// Censor permutations of "goddamn".
		/g+((\s|\W)*(o|0))+((\s|\W)*d)+((\s|\W)*(a|4|@))+((\s|\W)*m)+n*/gi,

		// Censor permutations of homophobic slurs.
		/f+((\s|\W)*(a|4|@))+((\s|\W)*g)+/gi,
		/d+((\s|\W)*y)+((\s|\W)*k)+((\s|\W)*(e|3))+/gi,

		// Censor permutations of transphobic slurs.
		/t+((\s|\W)*r)+((\s|\W)*(a|4|@))+((\s|\W)*n)+((\s|\W)*(y|ie|i))+/gi,
		/(s|5|\$)+((\s|\W)*h)+((\s|\W)*(e|3))+((\s|\W)*m)+((\s|\W)*(a|4|@))+((\s|\W)*(l|i|1))+((\s|\W)*(e|3))+/gi,

		// More censors...
		/\b\d*r+((\s|\W)*(a|4|@))+((\s|\W)*p)+((\s|\W)*(i|l|1|!))*((\s|\W)*(e|3))+\w*/gi,
		/\br+((\s|\W)*(a|4|@))+((\s|\W)*p)+((\s|\W)*(i|l|1|!))+((\s|\W)*(s|z|5|\$))+\w*/gi,
		/[^e]+r+((\s|\W)*(a|4|@))+((\s|\W)*p)+((\s|\W)*(i|l|1|!))+((\s|\W)*(s|z|5|\$))+\w*/gi,
		/\bm+((\s|\W)*(o|0))+((\s|\W)*(i|l|1|!))+((\s|\W)*(e|3))+((\s|\W)*(s|z|5|\$))+((\s|\W)*t)+\w*/gi,

		// Other censor rules...
		/\bbbc\b/gi,
		/\bbwc\b/gi,
		/\bB([\s]*|\.)J\b/gi,
	],

	// Regex rules for words and sentences
	words:
	[
		// Less strict "a**h***" censor rules for words and sentences.
		/(a|4|\@)+s+h+(o|0)+((l|i|1)+(e|3)+|(e|3)+(l|i|1)+)\b/gi,
	]

	// Regex rules for display names and server titles.
	names:
	[
		// Stricter "a**h***" censor rules for display names and server title.
		/(a|4|\@)+(\s|\W)*(s+(\s|\W)*)+h+(\s|\W)*(o|0)+(\s|\W)*((l|i|1)+(\s|\W)*(e|3)+|(e|3)+(\s|\W)*(l|i|1)+)(\s|\W)*\b/gi,
	]
};
