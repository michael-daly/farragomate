const deepFreeze          = require ('~/util/deepFreeze.js');
const fieldData           = require ('~/clients/fieldData.js');
const getDefaultFieldVals = require ('#/fields/getDefaultFieldVals.js');

const defaultState = deepFreeze (
{
	id: '',
	...getDefaultFieldVals (fieldData),
});


module.exports = ( state = defaultState, action ) =>
{
	const { type, payload } = action;

	switch ( type )
	{
		case 'ACCEPT_PACKET':
		{
			if ( payload.command === 'RegisterInfo' )
			{
				return { ...state, ...payload.body.data };
			}

			break;
		}
	}

	return state;
};
