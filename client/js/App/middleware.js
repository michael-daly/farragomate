const { setScreen } = require ('#/App/actions.js');


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
					store.dispatch (setScreen ('MainMenu'));
				}

				break;
			}

			case 'CreateRoom':
			{
				if ( payload.command === 'CreateRoom' )
				{
					store.dispatch (setScreen ('MainGame'));
				}

				break;
			}
		}
	}
	else if ( type === 'RECV_DATA_PACKET' )
	{
		switch ( payload.command )
		{
			case 'KickClient':
				if ( payload.body !== state.register.id )
				{
					break;
				}

			case 'DeleteRoom':
			{
				store.dispatch (setScreen ('MainMenu'));
				break;
			}
		}
	}

	return next (action);
};
