const deepFreeze = require ('~/util/deepFreeze.js');


const fieldData =
{
	title:
	{
		type: 'string',

		min: 1,
		max: 32,

		required: true,

		defaultValue: 'Farragomate Server',
	},

	password:
	{
		type: 'string',

		min: 0,
		max: 12,

		required: false,

		defaultValue: '',
	},

	maxClients:
	{
		type: 'number',

		min: 1,
		max: 16,

		required: true,

		defaultValue: 8,
	},

	timeLimit:
	{
		type: 'number',

		min: 30,
		max: 120,

		required: true,

		defaultValue: 60,
	},

	numRounds:
	{
		type: 'number',

		min: 1,
		max: 16,

		required: true,

		defaultValue: 10,
	},
};


module.exports = deepFreeze (fieldData);
