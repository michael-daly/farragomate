const deepFreeze = require ('~/util/deepFreeze.js');


const fieldData =
{
	displayName:
	{
		type: 'string',

		min: 1,
		max: 24,

		required: true,

		defaultValue: null,
	},
};


module.exports = deepFreeze (fieldData);
