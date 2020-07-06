const fieldData        = require ('$/rooms/fieldData.js');
const sanitizeFields   = require ('$/fields/sanitizeFields.js');
const validateRoomInfo = require ('$/rooms/validateRoomInfo.js');

const { GameRoom } = require ('$/rooms/GameRoom.js');

const { addPacketHandler } = require ('$/packets/PacketHandlers.js');
const { addNewRoom }       = require ('$/rooms/GameRoomMap.js');

const { ERROR_NONE } = require ('~/errorCodes.js');


addPacketHandler ('Request', 'CreateRoom', ( client, packet ) =>
{
	const info   = sanitizeFields (packet.body, fieldData);
	const result = validateRoomInfo (info, client);

	if ( result !== ERROR_NONE )
	{
		client.sendPacket ('Reject', packet, result);
	}
	else
	{
		const roomOrError = addNewRoom (client, info);

		if ( roomOrError instanceof GameRoom )
		{
			client.sendPacket ('Accept', packet, roomOrError.id);
		}
		else
		{
			client.sendPacket ('Reject', packet, roomOrError);
		}
	}
});
