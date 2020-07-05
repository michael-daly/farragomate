const fieldData      = require ('$/clients/fieldData.js');
const validateFields = require ('$/fields/validateFields.js');

const { hasClientName } = require ('$/clients/GameClientNames.js');

const { ERROR_NONE, FIELD_ERR_UNIQUE } = require ('~/errorCodes.js');


/**
 * @param   {Object} info
 * @returns {Integer|Array} [fieldName, errorCode] or ERROR_NONE if no error.
 */
const validateClientInfo = info =>
{
	const result = validateFields (info, fieldData);

	if ( result !== ERROR_NONE )
	{
		return result;
	}

	if ( hasClientName (info.displayName) )
	{
		return ['displayName', FIELD_ERR_UNIQUE];
	}

	return ERROR_NONE;
};


module.exports = validateClientInfo;
