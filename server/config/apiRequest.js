module.exports = Object.freeze (
{
	baseURL: 'https://api.wordnik.com/v4/words.json/randomWords',

	hasDictionaryDef: true,

	minCorpusCount: 10000,
	maxCorpusCount: -1,

	minDictionaryCount: 1,
	maxDictionaryCount: -1,

	minLength: 3,
	maxLength: 20,

	limit: 16,
});
