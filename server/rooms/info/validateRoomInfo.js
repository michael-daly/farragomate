const fieldData      = require ('~/rooms/fieldData.js');
const validateFields = require ('$/fields/validateFields.js');


/**
 * @param   {Object} info
 * @returns {Integer|Array} [fieldName, errorCode] or ERROR_NONE if no error.
 */
const validateRoomInfo = info =>
{
	return validateFields (info, fieldData);
};


module.exports = validateRoomInfo;
