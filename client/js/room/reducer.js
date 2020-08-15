const deepFreeze          = require ('~/util/deepFreeze.js');
const fieldData           = require ('~/rooms/fieldData.js');
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
			if ( payload.command === 'CreateRoom' )
			{
				return { ...state, ...payload.body.data };
			}

			break;
		}
	}

	return state;
};
