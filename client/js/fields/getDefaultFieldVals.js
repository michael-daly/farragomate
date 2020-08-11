/**
 * @param   {Object}  fieldData
 * @returns {Object}
 */
const getDefaultFieldVals = fieldData =>
{
	const defaultValues = {};

	for ( let fieldName in fieldData )
	{
		defaultValues[fieldName] = fieldData[fieldName].defaultValue;
	}

	return defaultValues;
};


module.exports = getDefaultFieldVals;
