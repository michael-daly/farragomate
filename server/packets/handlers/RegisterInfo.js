const fieldData      = require ('$/clients/fieldData.js');
const sanitizeFields = require ('$/fields/sanitizeFields.js');
const validateFields = require ('$/fields/validateFields.js');

const { RequestPacket } = require ('~/packets/types.js').packetTypes;
const { RegisterInfo }  = require ('~/packets/commands.js').packetCommands;

const { addPacketHandler } = require ('$/packets/PacketHandlers.js');

const { addClientName, hasClientName } = require ('$/clients/GameClientNames.js');

const { FIELD_ERR_NONE, FIELD_ERR_UNIQUE } = require ('$/fields/constants.js');


addPacketHandler (RequestPacket, RegisterInfo, ( client, packet ) =>
{
	const { body } = packet;

	const info   = sanitizeFields (body, fieldData);
	const result = validateFields (body, info);

	if ( result !== FIELD_ERR_NONE )
	{
		client.sendPacket ('Reject', packet, result);
		return;
	}

	const { displayName } = info;

	if ( hasClientName (displayName) )
	{
		client.sendPacket ('Reject', packet, ['displayName', FIELD_ERR_UNIQUE]);
		return;
	}

	client.info.displayName = displayName;
	addClientName (displayName);

	client.sendPacket ('Accept', packet);
});
