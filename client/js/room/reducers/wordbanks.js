const deepFreeze = require ('~/util/deepFreeze.js');

const defaultState = deepFreeze ([]);


module.exports = ( state = defaultState, action ) =>
{
	const { type, payload } = action;

	switch ( type )
	{
		case 'RECV_DATA_PACKET':
		{
			if ( payload.command === 'Wordbanks' )
			{
				return payload.body;
			}

			break;
		}
	}

	return state;
};