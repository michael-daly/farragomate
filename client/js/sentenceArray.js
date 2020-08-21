/**
 * @param {string[][]} wordbanks   - Array of wordbanks.
 * @param {Integer[]}  sentenceArr - A flat array in this format: [wordbankIdx, wordIdx, ...]
 *
 * @returns {string[]} An array containing the words in string form.
 */
const sentenceToStrArr = ( wordbanks, sentenceArr ) =>
{
	const stringArray = [];

	const { length } = sentenceArr;

	for ( let i = 0; i < length; i += 2 )
	{
		const bankIndex = sentenceArr[i];
		const wordIndex = sentenceArr[i + 1];

		stringArray.push (wordbanks[bankIndex][wordIndex]);
	}

	return stringArray;
};

/**
 * @param   {string[]} stringArray - A string array of words.
 * @returns {string} String version of the sentence.
 */
const sentenceToStr = stringArray =>
{
	let str = '';

	const { length } = stringArray;

	for ( let i = 0; i < length; i++ )
	{
		let word    = stringArray[i];
		let endDash = false;

		if ( word.substr (0, 1) === '-' )
		{
			word = word.substr (1);
		}

		if ( word.substr (-1) === '-' )
		{
			endDash = true;
			word    = word.substr (0, word.length - 1);
		}

		str += word;

		if ( i >= length - 1 )
		{
			continue;
		}

		if ( !endDash && stringArray[i + 1].substr (0, 1) !== '-' )
		{
			str += ' ';
		}
	}

	return str;
};


export { sentenceToStr, sentenceToStrArr };
