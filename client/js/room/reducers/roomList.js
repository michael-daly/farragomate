const deepFreeze = require ('~/util/deepFreeze.js');


const defaultState = deepFreeze (
{
	roomList:        {},
	lastRequestTime: new Date ().getTime (),
	isJoiningRoom:   false,
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

			if ( payload.command === 'JoinRoom' )
			{
				return { ...state, isJoiningRoom: false };
			}

			break;
		}

		case 'RECV_REJECT_PACKET':
		{
			if ( payload.command === 'JoinRoom' )
			{
				return { ...state, isJoiningRoom: false };
			}

			break;
		}

		case 'REQUEST_JOIN_ROOM':
		{
			return { ...state, isJoiningRoom: true };
		}

		case 'REQUEST_ROOM_LIST':
		{
			return { ...state, lastRequestTime: new Date ().getTime () };
		}

		case 'CANCEL_REQUEST':
		{
			if ( payload === 'REQUEST_JOIN_ROOM' )
			{
				return { ...state, isJoiningRoom: false };
			}

			break;
		}
	}

	return state;
};
