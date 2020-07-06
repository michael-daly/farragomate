const enumerate = require ('~/util/enumerate.js');


module.exports =
{
	...enumerate (
	[
		'ERROR_NONE',
		'ERROR_GENERIC',
		'ERROR_FLOOD',

		'FIELD_ERR_REQUIRED',
		'FIELD_ERR_TYPE',
		'FIELD_ERR_MIN',
		'FIELD_ERR_MAX',
		'FIELD_ERR_UNIQUE',

		'ERROR_IN_ROOM',
		'ERROR_NOT_IN_ROOM',
		'ERROR_NOT_FOUND',
		'ERROR_ROOM_FULL',
		'ERROR_BANNED',
		'ERROR_NOT_ALLOWED',
		'ERROR_ROOM_LIMIT',
	]),
};
