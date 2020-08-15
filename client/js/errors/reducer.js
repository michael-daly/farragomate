const deepFreeze       = require ('~/util/deepFreeze.js');
const clientFields     = require ('~/clients/fieldData.js');
const roomFields       = require ('~/rooms/fieldData.js');
const getFieldErrorMsg = require ('#/fields/getFieldErrorMsg.js');

const defaultState = deepFreeze (
{
	registerError:   '',
	createRoomError: '',
});


module.exports = ( state = defaultState, action ) =>
{
	const { type, payload } = action;

	if ( type === 'ACCEPT_PACKET' )
	{
		switch ( payload.command )
		{
			case 'RegisterInfo':
			{
				return { ...state, registerError: '' };
			}

			case 'CreateRoom':
			{
				return { ...state, createRoomError: '' };
			}
		}
	}
	else if ( type === 'REJECT_PACKET' )
	{
		switch ( payload.command )
		{
			case 'RegisterInfo':
			{
				const { data } = payload.body;

				return { ...state, registerError: getFieldErrorMsg (clientFields, data[0], data[1]) };
			}

			case 'CreateRoom':
			{
				const { data } = payload.body;

				return { ...state, createRoomError: getFieldErrorMsg (roomFields, data[0], data[1]) };
			}
		}
	}

	return state;
};
