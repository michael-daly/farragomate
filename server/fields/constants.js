const enumerate = require ('~/util/enumerate.js');


const errors = enumerate (
[
	'FIELD_ERR_NONE',
	'FIELD_ERR_REQUIRED',
	'FIELD_ERR_TYPE',
	'FIELD_ERR_MIN',
	'FIELD_ERR_MAX',
]);

const types = enumerate (['FIELD_TYPE_NUM', 'FIELD_TYPE_STR']);


module.exports =
{
	...errors,
	...types,
};
