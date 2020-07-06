const { has } = require ('~/util/has.js');

const { sanitizeString, stripNonASCII }  = require ('~/util/sanitization.js');


/**
 * @param {Object} inputFields
 * @param {Object} fieldData
 *
 * @returns {Object} A copy of `inputFields` but with sanitized, stripped, and trimmed strings.
 */
const sanitizeFields = ( inputFields, fieldData ) =>
{
	const sanitized = {};

	for ( let fieldName in fieldData )
	{
		const data = fieldData[fieldName];

		if ( data.type === 'string' )
		{
			if ( has (inputFields, fieldName) )
			{
				sanitized[fieldName] = sanitizeString (stripNonASCII (inputFields[fieldName])).trim ();
			}
		}
		else
		{
			sanitized[fieldName] = inputFields[fieldName];
		}
	}

	return sanitized;
};


module.exports = sanitizeFields;
