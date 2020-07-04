const { sanitizeString, stripNonASCII }  = require ('~/util/sanitization.js');
const { FIELD_TYPE_NUM, FIELD_TYPE_STR } = require ('$/fields/constants.js');


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

		if ( data.type === FIELD_TYPE_STR )
		{
			sanitized[fieldName] = sanitizeString (stripNonASCII (field)).trim ();
		}
	}

	return sanitized;
};


module.exports = sanitizeFields;
