const deepFreeze   = require ('~/util/deepFreeze.js');
const clientFields = require ('~/clients/fieldData.js');
const roomFields   = require ('~/rooms/fieldData.js');

const getSocketErrorMsg  = require ('#/socket/getSocketErrorMsg.js');
const getFieldErrorMsg   = require ('#/fields/getFieldErrorMsg.js');
const getJoinErrorMsg    = require ('#/room/JoinRoom/getJoinErrorMsg.js');
const getCreateRoomError = require ('#/room/CreateRoom/getCreateRoomError.js');

const { ERROR_FLOOD } = require ('~/errorCodes.js');


const defaultState = deepFreeze (
{
	socketError:     '',
	registerError:   '',
	createRoomError: '',
	joinRoomError:   '',
	leaveRoomMsg:    '',
});


module.exports = ( state = defaultState, action ) =>
{
	const { type, payload = {} } = action;

	const { body } = payload;

	switch ( type )
	{
		case 'CLEAR_ERROR_MSG':
		{
			return { ...state, [payload]: '' };
		}

		case 'SET_LEAVE_ROOM_MSG':
		{
			return { ...state, leaveRoomMsg: payload };
		}

		case 'RECV_ACCEPT_PACKET':
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

			break;
		}

		case 'RECV_REJECT_PACKET':
		{
			switch ( payload.command )
			{
				case 'RegisterInfo':
				{
					const { data } = body;

					return { ...state, registerError: getFieldErrorMsg (clientFields, data[0], data[1]) };
				}

				case 'CreateRoom':
				{
					const { data } = body;

					let createRoomError = '';

					if ( Array.isArray (data) )
					{
						createRoomError = getFieldErrorMsg (roomFields, data[0], data[1]);
					}
					else
					{
						createRoomError = getCreateRoomError (data);
					}

					return { ...state, createRoomError };
				}

				case 'JoinRoom':
				case 'RoomList':
				{
					return { ...state, joinRoomError: getJoinErrorMsg (body.data) };
				}
			}

			break;
		}

		case 'SOCKET_OPEN':
		{
			return { ...state, socketError: '' };
		}

		case 'SOCKET_CLOSE':
		{
			return { ...state, socketError: getSocketErrorMsg (payload.code) };
		}
	}

	return state;
};
