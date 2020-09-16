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

		label: 'Title',
	},

	password:
	{
		type: 'string',

		isPassword: true,

		min: 0,
		max: 12,

		required: false,

		defaultValue: '',

		label: 'Password',
	},

	maxClients:
	{
		type: 'number',

		min: 1,
		max: 16,

		required: true,

		defaultValue: 8,

		label: 'Player Limit',
	},

	timeLimit:
	{
		type: 'number',

		min: 30,
		max: 120,

		required: true,

		defaultValue: 60,

		label: 'Time Limit',
	},

	maxRounds:
	{
		type: 'number',

		min: 1,
		max: 16,

		required: true,

		defaultValue: 10,

		label: 'Rounds',
	},
};


module.exports = deepFreeze (fieldData);
