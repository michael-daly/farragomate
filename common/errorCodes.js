const enumerate = require ('~/util/enumerate.js');


module.exports =
{
	...enumerate (
	[
		'ERROR_NONE',
		'ERROR_GENERIC',
		'ERROR_FLOOD',
		'ERROR_BAD_PACKET',
		'ERROR_INVALID_FORMAT',
		'ERROR_REPEAT_DATA',

		'FIELD_ERR_REQUIRED',
		'FIELD_ERR_TYPE',
		'FIELD_ERR_MIN',
		'FIELD_ERR_MAX',
		'FIELD_ERR_UNIQUE',

		'ERROR_CLIENT_LIMIT',
		'ERROR_NAME_NOT_SET',
		'ERROR_IN_ROOM',
		'ERROR_NOT_IN_ROOM',
		'ERROR_NOT_FOUND',
		'ERROR_WRONG_PASSWORD',
		'ERROR_ROOM_FULL',
		'ERROR_BANNED',
		'ERROR_NOT_ALLOWED',
		'ERROR_ROOM_LIMIT',

		'ERROR_WRONG_SCREEN',
		'ERROR_INVALID_BANK',
		'ERROR_INVALID_WORD',
		'ERROR_TOO_SHORT',
		'ERROR_TOO_LONG',
	]),
};
