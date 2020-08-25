const deepFreeze = require ('~/util/deepFreeze.js');

const { MAX_SENTENCE_LEN } = require ('~/constants.js');


const defaultState = deepFreeze (
{
	sentenceArray:   [],
	clientSentences: [],
});


module.exports = ( state = defaultState, action ) =>
{
	const { type, payload } = action;

	switch ( type )
	{
		case 'ADD_TO_SENTENCE':
		{
			const { sentenceArray } = state;

			if ( sentenceArray.length >= MAX_SENTENCE_LEN * 2 )
			{
				break;
			}

			return { ...state, sentenceArray: [...sentenceArray, payload.bankIndex, payload.wordIndex] };
		}

		case 'REMOVE_FROM_SENTENCE':
		{
			const sentenceArray = state.sentenceArray.slice ();

			sentenceArray.splice (payload, 2);

			return { ...state, sentenceArray };
		}

		case 'RECV_DATA_PACKET':
			if ( payload.command !== 'Wordbanks' )
			{
				break;
			}

		case 'CLEAR_SENTENCE':
		{
			return { ...state, sentenceArray: [] };
		}
	}

	return state;
};
