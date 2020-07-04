const fieldData      = require ('$/clients/fieldData.js');
const sanitizeFields = require ('$/fields/sanitizeFields.js');

const { RequestPacket } = require ('~/packets/types.js').packetTypes;
const { RegisterInfo }  = require ('~/packets/commands.js').packetCommands;

const { addPacketHandler }   = require ('$/packets/PacketHandlers.js');
const { addClientName }      = require ('$/clients/GameClientNames.js');
const { validateClientInfo } = require ('$/clients/validateClientInfo.js');

const { FIELD_ERR_NONE } = require ('$/fields/constants.js');


addPacketHandler (RequestPacket, RegisterInfo, ( client, packet ) =>
{
	const info   = sanitizeFields (packet.body, fieldData);
	const result = validateClientInfo (info);

	if ( result !== FIELD_ERR_NONE )
	{
		client.sendPacket ('Reject', packet, result);
	}
	else
	{
		addClientName (info.displayName);
		client.setInfoField ('displayName', info.displayName);

		client.sendPacket ('Accept', packet);
	}
});
