const deepFreeze = require ('~/util/deepFreeze.js');

const { FIELD_TYPE_NUM, FIELD_TYPE_STR } = require ('$/fields/constants.js');


const fieldData =
{
	title:
	{
		type: FIELD_TYPE_STR,

		min: 1,
		max: 32,

		required: true,

		defaultValue: 'Farragomate Server',
	},

	password:
	{
		type: FIELD_TYPE_STR,

		min: 0,
		max: 12,

		required: false,

		defaultValue: '',
	},

	maxPlayers:
	{
		type: FIELD_TYPE_NUM,

		min: 1,
		max: 16,

		required: true,

		defaultValue: 8,
	},

	timeLimit:
	{
		type: FIELD_TYPE_NUM,

		min: 30,
		max: 120,

		required: true,

		defaultValue: 60,
	},

	numRounds:
	{
		type: FIELD_TYPE_NUM,

		min: 1,
		max: 16,

		required: true,

		defaultValue: 10,
	},
};


module.exports = deepFreeze (fieldData);
