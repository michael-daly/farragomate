const fieldData          = require ('$/clients/fieldData.js');
const validateClientInfo = require ('$/clients/validateClientInfo.js');

const { addPacketHandler } = require ('$/packets/PacketHandlers.js');
const { mapStringFields }  = require ('$/fields/mapFields.js');
const { hasClientName }    = require ('$/clients/GameClientNames.js');

const { sanitizeString, stripNonASCII } = require ('~/util/sanitization.js');

const { ERROR_NONE, ERROR_BAD_PACKET, ERROR_IN_ROOM, FIELD_ERR_UNIQUE } = require ('~/errorCodes.js');


addPacketHandler ('Request', 'RegisterInfo', ( client, packet ) =>
{
	const { body } = packet;

	if ( client.roomID !== null )
	{
		client.sendPacket ('Reject', packet, ERROR_IN_ROOM);
	}
	else if ( body === null || typeof body !== 'object' )
	{
		client.sendPacket ('Reject', packet, ERROR_BAD_PACKET);
	}
	else
	{
		const info        = mapStringFields (body, fieldData, field => stripNonASCII (field).trim ());
		const result      = validateClientInfo (info);
		const displayName = sanitizeString (info.displayName);

		if ( result !== ERROR_NONE )
		{
			client.sendPacket ('Reject', packet, result);
		}
		else if ( hasClientName (displayName) )
		{
			client.sendPacket ('Reject', packet, ['displayName', FIELD_ERR_UNIQUE]);
		}
		else
		{
			client.setDisplayName (displayName);
			client.sendPacket ('Accept', packet, { id: client.id, displayName });
		}
	}
});
