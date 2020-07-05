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

	for ( let fieldName in inputFields )
	{
		const field = inputFields[fieldName];
		const data  = fieldData[fieldName];

		if ( data.type === 'string' )
		{
			sanitized[fieldName] = sanitizeString (stripNonASCII (field)).trim ();
		}
	}

	return sanitized;
};


module.exports = sanitizeFields;
