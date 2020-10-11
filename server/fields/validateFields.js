const { has }        = require ('~/util/has.js');
const { hasBadWord } = require ('~/badWordFilter.js');

const
{
	ERROR_NONE,

	FIELD_ERR_REQUIRED,
	FIELD_ERR_TYPE,
	FIELD_ERR_MIN,
	FIELD_ERR_MAX,
	FIELD_ERR_BAD_WORD,
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
 * @param {*}      field
 * @param {Object} data
 * @param {Object} filterRules
 *
 * @returns {Integer} ERROR_NONE if no error.
 *
 * @private
 */
const validateBadWords = ( field, data, filterRules = null ) =>
{
	if ( filterRules !== null && data.type === 'string' && typeof field === 'string' &&
		 (hasBadWord (field, filterRules.all) || hasBadWord (field, filterRules.fields)) )
	{
		return FIELD_ERR_BAD_WORD;
	}

	return ERROR_NONE;
};

/**
 * @param {Object} inputFields
 * @param {Object} fieldData
 * @param {Object} [filterRules=null]
 *
 * @returns {Integer|Array} [fieldName, errorCode] or ERROR_NONE if no error.
 */
const validateFields = ( inputFields, fieldData, filterRules = null ) =>
{
	for ( let fieldName in fieldData )
	{
		const data = fieldData[fieldName];

		let result = validate (inputFields, fieldName, data);

		if ( result === ERROR_NONE )
		{
			result = validateBadWords (inputFields[fieldName], data, filterRules);
		}

		if ( result !== ERROR_NONE )
		{
			return [fieldName, result];
		}
	}

	return ERROR_NONE;
};


module.exports = validateFields;
