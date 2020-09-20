module.exports = store => next => action =>
{
	const { type, payload } = action;

	const state = store.getState ();

	if ( type === 'RECV_ACCEPT_PACKET' )
	{
		switch ( state.app.screen )
		{
			case 'Register':
			{
				if ( payload.command === 'RegisterInfo' )
				{
					store.dispatch ({ type: 'SET_SCREEN', payload: 'MainMenu' });
				}

				break;
			}

			case 'CreateRoom':
			{
				if ( payload.command === 'CreateRoom' )
				{
					store.dispatch ({ type: 'SET_SCREEN', payload: 'MainGame' });
				}

				break;
			}
		}
	}
	else if ( type === 'RECV_DATA_PACKET' )
	{
		switch ( payload.command )
		{
			case 'DeleteRoom':
			case 'KickClient':
			{
				store.dispatch ({ type: 'SET_SCREEN', payload: 'MainMenu' });
				break;
			}
		}
	}

	return next (action);
};
