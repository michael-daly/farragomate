const fieldData      = require ('$/rooms/fieldData.js');
const validateFields = require ('$/fields/validateFields.js');

const { ERROR_NONE, RM_ERR_IN_ROOM } = require ('~/errorCodes.js');


/**
 * @param   {Object}     info
 * @param   {GameClient} client
 * @returns {Integer|Array} [fieldName, errorCode] or ERROR_NONE if no error.
 */
const validateRoomInfo = ( info, client ) =>
{
	const result = validateFields (info, fieldData);

	if ( result !== ERROR_NONE )
	{
		return result;
	}

	if ( client.roomID !== null )
	{
		return RM_ERR_IN_ROOM;
	}

	return ERROR_NONE;
};


module.exports = validateClientInfo;
