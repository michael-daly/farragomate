const fieldData      = require ('$/rooms/fieldData.js');
const validateFields = require ('$/fields/validateFields.js');
const enumerate      = require ('~/util/enumerate.js');

const { FIELD_ERR_NONE, RM_ERR_IN_ROOM } = require ('~/errorCodes.js');


/**
 * @param   {Object}     info
 * @param   {GameClient} client
 * @returns {Integer|Array} [fieldName, errorCode] or FIELD_ERR_NONE if no error.
 */
const validateRoomInfo = ( info, client ) =>
{
	const result = validateFields (info, fieldData);

	if ( result !== FIELD_ERR_NONE )
	{
		return result;
	}

	if ( client.roomID !== null )
	{
		return RM_ERR_IN_ROOM;
	}

	return FIELD_ERR_NONE;
};


module.exports = validateClientInfo;
