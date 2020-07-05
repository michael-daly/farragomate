const { has } = require ('~/util/has.js');

const
{
	ERROR_NONE,

	FIELD_ERR_REQUIRED,
	FIELD_ERR_TYPE,
	FIELD_ERR_MIN,
	FIELD_ERR_MAX,
}
= require ('~/errorCodes.js');


/**
 * @param {Object} inputFields
 * @param {string} field
 * @param {Object} data
 *
 * @returns {Integer} ERROR_NONE if no error.
 *
 * @private
 */
const validate = ( inputFields, fieldName, data ) =>
{
	let error = ERROR_NONE;

	if ( !has (inputFields, fieldName) )
	{
		if ( data.required )
		{
			error = FIELD_ERR_REQUIRED;
		}
	}
	else
	{
		const field = inputFields[fieldName];

		if ( typeof field !== data.type )
		{
			error = FIELD_ERR_TYPE;
		}
		else
		{
			const size = (data.type === 'number') ? field : field.length;

			if ( size < data.min )
			{
				error = FIELD_ERR_MIN;
			}
			else if ( size > data.max )
			{
				error = FIELD_ERR_MAX;
			}
		}
	}

	return error;
};

/**
 * @param {Object} inputFields
 * @param {Object} fieldData
 *
 * @returns {Integer|Array} [fieldName, errorCode] or ERROR_NONE if no error.
 */
const validateFields = ( inputFields, fieldData ) =>
{
	for ( let fieldName in fieldData )
	{
		const result = validate (inputFields, fieldName, fieldData[fieldName]);

		if ( result !== ERROR_NONE )
		{
			return [fieldName, result];
		}
	}

	return ERROR_NONE;
};


module.exports = validateFields;
