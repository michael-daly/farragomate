const deepFreeze = require ('~/util/deepFreeze.js');

const { FIELD_TYPE_STR } = require ('$/fields/constants.js');


const fieldData =
{
	displayName:
	{
		type: FIELD_TYPE_STR,

		min: 1,
		max: 24,

		required: true,

		defaultValue: 'Username',
	},
};


module.exports = deepFreeze (fieldData);
