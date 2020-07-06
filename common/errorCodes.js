const enumerate = require ('~/util/enumerate.js');


module.exports =
{
	...enumerate (
	[
		'ERROR_NONE',
		'ERROR_GENERIC',

		'FIELD_ERR_REQUIRED',
		'FIELD_ERR_TYPE',
		'FIELD_ERR_MIN',
		'FIELD_ERR_MAX',
		'FIELD_ERR_UNIQUE',

		'ERROR_IN_ROOM',
		'ERROR_NOT_FOUND',
		'ERROR_ROOM_FULL',
		'ERROR_BANNED',
	]),
};
