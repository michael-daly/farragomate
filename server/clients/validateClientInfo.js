const fieldData      = require ('$/clients/fieldData.js');
const validateFields = require ('$/fields/validateFields.js');


/**
 * @param   {Object} info
 * @returns {Integer|Array} [fieldName, errorCode] or ERROR_NONE if no error.
 */
const validateClientInfo = info =>
{
	return validateFields (info, fieldData);
};


module.exports = validateClientInfo;
