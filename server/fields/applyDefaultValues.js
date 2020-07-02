const { has } = require ('~/util/has.js');


/**
 * @param {Object} inputFields
 * @param {Object} fieldData
 */
const applyDefaultValues = ( inputFields, fieldData ) =>
{
	const values = {};

	for ( let field in fieldData )
	{
		if ( has (inputFields, field) )
		{
			values[field] = inputFields[field];
		}
		else
		{
			values[field] = fieldData[field].defaultValue;
		}
	}

	return values;
};


module.exports = applyDefaultValues;
