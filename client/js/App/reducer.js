const deepFreeze = require ('~/util/deepFreeze.js');

const defaultState = deepFreeze (
{
	screen:      'Register',
	socketState: 'CLOSED',
});


module.exports = ( state = defaultState, action ) =>
{
	const { type, payload } = action;

	switch ( type )
	{
		case 'SET_SCREEN':
		{
			return { ...state, screen: payload };
		}

		case 'SOCKET_CONNECT':
		{
			return { ...state, socketState: 'CONNECTING' };
		}

		case 'SOCKET_DISCONNECT':
		{
			return { ...state, socketState: 'CLOSING' };
		}

		case 'SOCKET_OPEN':
		{
			return { ...state, socketState: 'OPEN' };
		}

		case 'SOCKET_CLOSE':
		{
			return { ...state, socketState: 'CLOSED' };
		}
	}

	return state;
};
