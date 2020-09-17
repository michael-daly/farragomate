const deepFreeze = require ('~/util/deepFreeze.js');


const defaultState = deepFreeze (
{
	roomList:        {},
	lastRequestTime: new Date ().getTime (),
});


module.exports = ( state = defaultState, action ) =>
{
	const { type, payload } = action;

	switch ( type )
	{
		case 'RECV_ACCEPT_PACKET':
		{
			if ( payload.command === 'RoomList' )
			{
				return { ...state, roomList: { ...payload.body.data } };
			}

			break;
		}

		case 'REQUEST_ROOM_LIST':
		{
			return { ...state, lastRequestTime: new Date ().getTime () };
		}
	}

	return state;
};
