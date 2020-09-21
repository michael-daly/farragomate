const deepFreeze = require ('~/util/deepFreeze.js');


const defaultState = deepFreeze (
{
	list: {},
});


module.exports = ( state = defaultState, action ) =>
{
	const { type, payload } = action;

	switch ( type )
	{
		case 'RECV_DATA_PACKET':
		{
			const { body } = payload;

			if ( payload.command === 'ClientList' )
			{
				return { ...state, list: { ...payload.body } };
			}

			break;
		}

		case 'CLIENT_LEAVE':
		{
			const list = { ...state.list };

			delete list[payload];

			return { ...state, list };
		}
	}

	return state;
};
