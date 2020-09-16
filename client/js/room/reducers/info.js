const deepFreeze          = require ('~/util/deepFreeze.js');
const fieldData           = require ('~/rooms/fieldData.js');
const getDefaultFieldVals = require ('#/fields/getDefaultFieldVals.js');


const defaultState = deepFreeze (
{
	id:        '',
	timeLeft:  0,
	numRounds: 0,
	screen:    'SentenceCreation',

	...getDefaultFieldVals (fieldData),
});


module.exports = ( state = defaultState, action ) =>
{
	const { type, payload } = action;

	switch ( type )
	{
		case 'RECV_ACCEPT_PACKET':
		{
			if ( payload.command === 'CreateRoom' )
			{
				return { ...state, id: payload.body.data };
			}

			break;
		}

		case 'RECV_DATA_PACKET':
		{
			const { body } = payload;

			if ( payload.command === 'RoomInfo' )
			{
				return { ...state, ...payload.body };
			}

			break;
		}
	}

	return state;
};
