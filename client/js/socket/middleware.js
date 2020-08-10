const PacketManager = require ('~/packets/PacketManager.js');


let socket        = null;
let packetManager = null;


module.exports = store => next => action =>
{
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

				let response;

				try
				{
					response = JSON.parse (data);
				}
				catch ( error )
				{
					store.dispatch ({ type: 'FATAL_ERROR', payload: error.message });
					return;
				}

				store.dispatch ({ type: 'SOCKET_MESSAGE', payload: response });
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
			}

			break;
		}

		case 'SEND_DATA_PACKET':
		{
			const { command, body } = action.payload;

			socket.send (packetManager.createDataPacket (command, body));

			break;
		}

		case 'SEND_REQUEST_PACKET':
		{
			const { command, body } = action.payload;

			socket.send (packetManager.createRequestPacket (command, body));

			break;
		}
	}

	return next (action);
};
