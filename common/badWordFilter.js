/**
 * @param {string}   word
 * @param {RegExp[]} filterRules
 *
 * @returns {boolean}
 */
const hasBadWord = ( word, filterRules ) =>
{
	const { length } = filterRules;

	for ( let i = 0; i < length; i++ )
	{
		const matched = word.match (filterRules[i]);

		if ( matched !== null && matched.length > 0 )
		{
			return true;
		}
	}

	return false;
};

/**
 * @param {string}   word
 * @param {RegExp[]} filterRules
 * @param {string}   [replaceStr="***"]
 *
 * @returns {string}
 */
const censorBadWords = ( word, filterRules, replaceStr = '***' ) =>
{
	const { length } = filterRules;

	for ( let i = 0; i < length; i++ )
	{
		word = word.replace (filterRules[i], replaceStr);
	}

	return word;
};


module.exports = { hasBadWord, censorBadWords };
