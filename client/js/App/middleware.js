module.exports = store => next => action =>
{
	const { type, payload } = action;

	const state = store.getState ();

	if ( type === 'ACCEPT_PACKET' )
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
		}
	}

	return next (action);
};
