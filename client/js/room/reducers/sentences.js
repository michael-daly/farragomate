const deepFreeze = require ('~/util/deepFreeze.js');

const { MAX_SENTENCE_LEN } = require ('~/constants.js');


const defaultState = deepFreeze (
{
	array:     [],
	sentences: {},
	vote:      '',
});


module.exports = ( state = defaultState, action ) =>
{
	const { type, payload } = action;

	switch ( type )
	{
		case 'ADD_TO_SENTENCE':
		{
			const { array } = state;

			if ( array.length >= MAX_SENTENCE_LEN * 2 )
			{
				break;
			}

			return { ...state, array: [...array, payload.bankIndex, payload.wordIndex] };
		}

		case 'REMOVE_FROM_SENTENCE':
		{
			const array = state.array.slice ();

			array.splice (payload, 2);

			return { ...state, array };
		}

		case 'CAST_VOTE':
		{
			return { ...state, vote: action.payload };
		}

		case 'RECV_DATA_PACKET':
		{
			if ( payload.command === 'ClientSentences' )
			{
				return { ...state, sentences: payload.body }
			}

			if ( payload.command === 'Wordbanks' )
			{
				return { ...state, array: [], vote: '' };
			}

			break;
		}

		case 'CLEAR_SENTENCE':
		{
			return { ...state, array: [] };
		}
	}

	return state;
};
