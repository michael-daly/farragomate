const deepFreeze       = require ('~/util/deepFreeze.js');
const clientFields     = require ('~/clients/fieldData.js');
const roomFields       = require ('~/rooms/fieldData.js');
const getFieldErrorMsg = require ('#/fields/getFieldErrorMsg.js');
const getJoinErrorMsg  = require ('#/room/JoinRoom/getJoinErrorMsg.js');

const { ERROR_FLOOD } = require ('~/errorCodes.js');


const defaultState = deepFreeze (
{
	registerError:   '',
	createRoomError: '',
	joinRoomError:   '',
	leaveRoomMsg:    '',
});


module.exports = ( state = defaultState, action ) =>
{
	const { type, payload } = action;

	if ( type === 'CLEAR_ERROR_MSG' )
	{
		return { ...state, [payload]: '' };
	}
	else if ( type === 'SET_LEAVE_ROOM_MSG' )
	{
		return { ...state, leaveRoomMsg: payload };
	}
	else if ( type === 'RECV_ACCEPT_PACKET' )
	{
		switch ( payload.command )
		{
			case 'RegisterInfo':
			{
				return { ...state, registerError: '' };
			}

			case 'CreateRoom':
			{
				return { ...state, createRoomError: '' };
			}

			case 'JoinRoom':
			case 'RoomList':
			{
				return { ...state, joinRoomError: '' };
			}
		}
	}
	else if ( type === 'RECV_REJECT_PACKET' )
	{
		switch ( payload.command )
		{
			case 'RegisterInfo':
			{
				const { data } = payload.body;

				return { ...state, registerError: getFieldErrorMsg (clientFields, data[0], data[1]) };
			}

			case 'CreateRoom':
			{
				const { data } = payload.body;

				return { ...state, createRoomError: getFieldErrorMsg (roomFields, data[0], data[1]) };
			}

			case 'JoinRoom':
			case 'RoomList':
			{
				return { ...state, joinRoomError: getJoinErrorMsg (payload.body.data) };
			}
		}
	}

	return state;
};
