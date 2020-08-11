const deepFreeze       = require ('~/util/deepFreeze.js');
const fieldData        = require ('~/clients/fieldData.js');
const getFieldErrorMsg = require ('#/fields/getFieldErrorMsg.js');

const defaultState = deepFreeze (
{
	info:
	{
		id:          '',
		displayName: '',
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
			if ( payload.command === 'RegisterInfo' )
			{
				return { ...state, info: { ...state.info, ...payload.body.data }, errorMessage: '' };
			}

			break;
		}

		case 'REJECT_PACKET':
		{
			if ( payload.command === 'RegisterInfo' )
			{
				const { data } = payload.body;

				return { ...state, errorMessage: getFieldErrorMsg (fieldData, data[0], data[1]) };
			}

			break;
		}
	}

	return state;
};
