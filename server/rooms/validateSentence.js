const { isValidIndex } = require ('~/util/arrays.js');

const { MIN_SENTENCE_LEN, MAX_SENTENCE_LEN } = require ('~/constants.js');

const
{
	ERROR_NONE,
	ERROR_INVALID_FORMAT,
	ERROR_INVALID_BANK,
	ERROR_INVALID_WORD,
	ERROR_TOO_SHORT,
	ERROR_TOO_LONG,
}
= require ('~/errorCodes.js');


/**
 * @param {GameRoomSentences} roomSentences
 * @param {Integer[]}         sentenceArr
 *
 * @returns {Integer} ERROR_NONE if no error.
 */
const validateSentence = ( roomSentences, sentenceArr ) =>
{
	if ( !Array.isArray (sentenceArr) )
	{
		return ERROR_INVALID_FORMAT;
	}

	const { wordbanks } = roomSentences;
	const { length }    = sentenceArr;

	let error = ERROR_NONE;

	if ( length % 2 !== 0 )
	{
		error = ERROR_INVALID_FORMAT;
	}
	else if ( length < MIN_SENTENCE_LEN * 2 )
	{
		error = ERROR_TOO_SHORT;
	}
	else if ( length > MAX_SENTENCE_LEN * 2 )
	{
		error = ERROR_TOO_LONG;
	}
	else
	{
		for ( let i = 0; i < length && error === ERROR_NONE; i += 2 )
		{
			const bankIndex = sentenceArr[i];
			const wordIndex = sentenceArr[i + 1];

			if ( !isValidIndex (wordbanks, bankIndex) )
			{
				error = ERROR_INVALID_BANK;
			}
			else if ( !isValidIndex (wordbanks[bankIndex], wordIndex) )
			{
				error = ERROR_INVALID_WORD;
			}
		}
	}

	return error;
};


module.exports = validateSentence;
