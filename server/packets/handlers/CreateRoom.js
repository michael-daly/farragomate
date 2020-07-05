const fieldData        = require ('$/rooms/fieldData.js');
const sanitizeFields   = require ('$/fields/sanitizeFields.js');
const validateRoomInfo = require ('$/rooms/validateRoomInfo.js');

const { addPacketHandler } = require ('$/packets/PacketHandlers.js');

const { FIELD_ERR_NONE } = require ('~/errorCodes.js');


addPacketHandler ('Request', 'RegisterInfo', ( client, packet ) =>
{
	const info   = sanitizeFields (packet.body, fieldData);
	const result = validateRoomInfo (info);

	if ( result !== FIELD_ERR_NONE )
	{
		client.sendPacket ('Reject', packet, result);
	}
	else
	{
		client.setDisplayName (info.displayName);
		client.sendPacket ('Accept', packet);
	}
});
