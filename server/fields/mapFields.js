const { has } = require ('~/util/has.js');


/**
 * @param {Object}   inputFields
 * @param {Object}   fieldData
 * @param {Function} callback
 *
 * @returns {Object}
 */
const mapFields = ( inputFields, fieldData, callback ) =>
{
	const fields = {};

	for ( let fieldName in fieldData )
	{
		if ( has (inputFields, fieldName) )
		{
			fields[fieldName] = callback (inputFields[fieldName], fieldName, fieldData[fieldName]);
		}
	}

	return fields;
};

/**
 * @param {Object}   inputFields
 * @param {Object}   fieldData
 * @param {Function} callback
 *
 * @returns {Object}
 */
const mapStringFields = ( inputFields, fieldData, callback ) =>
{
	return mapFields (inputFields, fieldData, ( field, fieldName, data ) =>
	{
		if ( data.type === 'string' )
		{
			return callback (field, fieldName, data);
		}

		return field;
	});
};


module.exports = { mapFields, mapStringFields };
