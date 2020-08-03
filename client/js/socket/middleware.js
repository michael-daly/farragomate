let socket;


module.exports = store => next => action =>
{
	switch ( action.type )
	{
		case 'SOCKET_CONNECT':
		{
			socket = new WebSocket (action.payload);

			socket.onopen    = event => store.dispatch ({ type: 'SOCKET_OPEN',    payload: event });
			socket.onclose   = event => store.dispatch ({ type: 'SOCKET_CLOSE',   payload: event });
			socket.onmessage = event => store.dispatch ({ type: 'SOCKET_MESSAGE', payload: event });
			socket.onerror   = event => store.dispatch ({ type: 'SOCKET_ERROR',   payload: event });

			break;
		}

		case 'SOCKET_SEND':
		{
			socket.send (JSON.stringify (action.payload));
			break;
		}

		case 'SOCKET_DISCONNECT':
		{
			socket.close ();
			break;
		}
	}

	return next (action);
};
