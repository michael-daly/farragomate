const enumerate = require ('~/util/enumerate.js');


module.exports =
{
	...enumerate (
	[
		'ERROR_NONE',
		'ERROR_GENERIC',

		'FIELD_ERR_NONE',
		'FIELD_ERR_REQUIRED',
		'FIELD_ERR_TYPE',
		'FIELD_ERR_MIN',
		'FIELD_ERR_MAX',
		'FIELD_ERR_UNIQUE',

		'RM_ERR_IN_ROOM',
	]),
}
