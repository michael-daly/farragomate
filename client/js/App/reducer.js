const deepFreeze = require ('~/util/deepFreeze.js');

const defaultState = deepFreeze ({ screen: 'MainMenu' });


module.exports = ( state = defaultState, action ) =>
{
	const { type, payload } = action;

	switch ( type )
	{
		case 'SET_SCREEN':
		{
			return { ...state, screen: payload };
		}
	}

	return state;
};
