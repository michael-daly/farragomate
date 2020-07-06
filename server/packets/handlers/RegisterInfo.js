const fieldData          = require ('$/clients/fieldData.js');
const sanitizeFields     = require ('$/fields/sanitizeFields.js');
const validateClientInfo = require ('$/clients/validateClientInfo.js');

const { addPacketHandler } = require ('$/packets/PacketHandlers.js');

const { ERROR_NONE, ERROR_IN_ROOM } = require ('~/errorCodes.js');


addPacketHandler ('Request', 'RegisterInfo', ( client, packet ) =>
{
	if ( client.roomID !== null )
	{
		client.sendPacket ('Reject', packet, ERROR_IN_ROOM);
	}
	else
	{
		const info   = sanitizeFields (packet.body, fieldData);
		const result = validateClientInfo (info);

		if ( result !== ERROR_NONE )
		{
			client.sendPacket ('Reject', packet, result);
		}
		else
		{
			client.setDisplayName (info.displayName);
			client.sendPacket ('Accept', packet, client.id);
		}
	}
});
