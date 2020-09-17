const PacketManager = require ('~/packets/PacketManager.js');

const { has } = require ('~/util/has.js');


let socket        = null;
let packetManager = null;


module.exports = store => next => action =>
{
	const state = store.getState ();

	switch ( action.type )
	{
		case 'SOCKET_CONNECT':
		{
			socket        = new WebSocket (action.payload);
			packetManager = new PacketManager ();

			socket.onopen    = event => store.dispatch ({ type: 'SOCKET_OPEN',  payload: event });
			socket.onclose   = event => store.dispatch ({ type: 'SOCKET_CLOSE', payload: event });
			socket.onerror   = event => store.dispatch ({ type: 'SOCKET_ERROR', payload: event });

			socket.onmessage = event =>
			{
				const { data } = event;

				let packet;

				try
				{
					packet = JSON.parse (data);
				}
				catch ( error )
				{
					store.dispatch ({ type: 'FATAL_ERROR', payload: error.message });
					return;
				}

				store.dispatch ({ type: 'SOCKET_MESSAGE', payload: packet });
			};

			break;
		}

		case 'SOCKET_DISCONNECT':
		{
			socket.close ();

			socket        = null;
			packetManager = null;

			break;
		}

		case 'SOCKET_MESSAGE':
		{
			const { type, command, body } = action.payload;

			if ( type === 'Response' )
			{
				packetManager.removePendingPacket (action.payload.requestSeq);

				if ( body.response === 'OK' )
				{
					store.dispatch ({ type: 'RECV_ACCEPT_PACKET', payload: action.payload });
				}
				else
				{
					store.dispatch ({ type: 'RECV_REJECT_PACKET', payload: action.payload });
				}
			}
			else if ( type === 'Data' )
			{
				store.dispatch ({ type: 'RECV_DATA_PACKET', payload: action.payload });
			}

			break;
		}

		case 'SEND_DATA_PACKET':
		{
			const { command, body = '' } = action.payload;

			socket.send (packetManager.createDataPacket (command, body));

			break;
		}

		case 'SEND_REQUEST_PACKET':
		{
			const { command, body = '' } = action.payload;

			socket.send (packetManager.createRequestPacket (command, body));

			break;
		}

		case 'REQUEST_ROOM_LIST':
		{
			store.dispatch ({ type: 'SEND_REQUEST_PACKET', payload: { command: 'RoomList' } });
			break;
		}

		case 'LEAVE_ROOM':
		{
			store.dispatch ({ type: 'SEND_DATA_PACKET', payload: { command: 'LeaveRoom' } });
			break;
		}
	}

	return next (action);
};
