const fieldData          = require ('$/clients/fieldData.js');
const sanitizeFields     = require ('$/fields/sanitizeFields.js');
const validateClientInfo = require ('$/clients/validateClientInfo.js');

const { addPacketHandler } = require ('$/packets/PacketHandlers.js');

const { ERROR_NONE } = require ('~/errorCodes.js');


addPacketHandler ('Request', 'RegisterInfo', ( client, packet ) =>
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
		client.sendPacket ('Accept', packet);
	}
});
