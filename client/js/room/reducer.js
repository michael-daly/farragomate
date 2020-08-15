const deepFreeze          = require ('~/util/deepFreeze.js');
const fieldData           = require ('~/rooms/fieldData.js');
const getDefaultFieldVals = require ('#/fields/getDefaultFieldVals.js');
const getFieldErrorMsg    = require ('#/fields/getFieldErrorMsg.js');

const defaultState = deepFreeze (
{
	info:
	{
		id: '',
		...getDefaultFieldVals (fieldData),
	},

	errorMessage: '',
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
				return { ...state, info: { ...state.info, ...payload.body.data }, errorMessage: '' };
			}

			break;
		}

		case 'REJECT_PACKET':
		{
			if ( payload.command === 'CreateRoom' )
			{
				const { data } = payload.body;

				return { ...state, errorMessage: getFieldErrorMsg (fieldData, data[0], data[1]) };
			}

			break;
		}
	}

	return state;
};
