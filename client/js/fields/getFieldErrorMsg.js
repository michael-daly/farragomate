const
{
	FIELD_ERR_REQUIRED,
	FIELD_ERR_TYPE,
	FIELD_ERR_MIN,
	FIELD_ERR_MAX,
	FIELD_ERR_UNIQUE,
	FIELD_ERR_BAD_WORD,
	FIELD_ERR_INVALID,
}
= require ('~/errorCodes.js');


/**
 * @param {Object}  fields
 * @param {string}  name
 * @param {Integer} error
 *
 * @returns {string}
 */
const getFieldErrorMsg = ( fields, name, error ) =>
{
	const fieldData = fields[name];

	const { type, min, max, label } = fieldData;

	switch ( error )
	{
		case FIELD_ERR_REQUIRED:
		{
			return `${label} is a required field`;
		}

		case FIELD_ERR_TYPE:
		{
			return `Invalid field type for ${label} (expected ${type})`;
		}

		case FIELD_ERR_MIN:
		{
			if ( type === 'string' )
			{
				return `${label} must be at least ${min} character${min != 1 ? 's' : ''}`;
			}

			return `${label} must be at least ${min}`;
		}

		case FIELD_ERR_MAX:
		{
			if ( type === 'string' )
			{
				return `${label} cannot be longer than ${max} character${max != 1 ? 's' : ''}`;
			}

			return `${label} cannot be higher than ${max}`;
		}

		case FIELD_ERR_UNIQUE:
		{
			return `${label} already taken`;
		}

		case FIELD_ERR_BAD_WORD:
		{
			return `${label} contains an inappropriate word`;
		}

		case FIELD_ERR_INVALID:
		{
			return `${label} is invalid`;
		}

		default:
		{
			return `Unknown error with ${label}`;
		}
	}
};


module.exports = getFieldErrorMsg;
