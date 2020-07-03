const { has } = require ('~/util/has.js');

const
{
	FIELD_ERR_NONE,
	FIELD_ERR_REQUIRED,
	FIELD_ERR_TYPE,
	FIELD_ERR_MIN,
	FIELD_ERR_MAX,

	FIELD_TYPE_NUM,
	FIELD_TYPE_STR,
}
= require ('$/fields/constants.js');


/**
 * @param {Object} inputFields
 * @param {string} field
 * @param {Object} data
 *
 * @returns {Integer} FIELD_ERR_NONE if no error.
 *
 * @private
 */
const validate = ( inputFields, fieldName, data ) =>
{
	let error = FIELD_ERR_NONE;

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
		const type  = (data.type === FIELD_TYPE_NUM) ? 'number' : 'string';

		if ( typeof field !== type )
		{
			error = FIELD_ERR_TYPE;
		}
		else
		{
			const size = (data.type === FIELD_TYPE_NUM) ? field : field.length;

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
 * @returns {Integer|Array} [fieldName, errorCode] or FIELD_ERR_NONE if no error.
 */
const validateFields = ( inputFields, fieldData ) =>
{
	for ( let fieldName in fieldData )
	{
		const result = validate (inputFields, fieldName, fieldData[fieldName]);

		if ( result !== FIELD_ERR_NONE )
		{
			return [fieldName, result];
		}
	}

	return FIELD_ERR_NONE;
};


module.exports = validateFields;
