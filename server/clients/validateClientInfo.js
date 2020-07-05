const fieldData      = require ('$/clients/fieldData.js');
const validateFields = require ('$/fields/validateFields.js');

const { hasClientName } = require ('$/clients/GameClientNames.js');

const { FIELD_ERR_NONE, FIELD_ERR_UNIQUE } = require ('~/errorCodes.js');


/**
 * @param   {Object} info
 * @returns {Integer|Array} [fieldName, errorCode] or FIELD_ERR_NONE if no error.
 */
const validateClientInfo = info =>
{
	const result = validateFields (info, fieldData);

	if ( result !== FIELD_ERR_NONE )
	{
		return result;
	}

	if ( hasClientName (info.displayName) )
	{
		return ['displayName', FIELD_ERR_UNIQUE];
	}

	return FIELD_ERR_NONE;
};


module.exports = validateClientInfo;
