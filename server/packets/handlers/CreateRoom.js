const fieldData        = require ('$/rooms/info/fieldData.js');
const validateRoomInfo = require ('$/rooms/info/validateRoomInfo.js');

const { GameRoom } = require ('$/rooms/GameRoom.js');

const { addPacketHandler } = require ('$/packets/PacketHandlers.js');
const { addNewRoom }       = require ('$/rooms/GameRoomMap.js');
const { mapStringFields }  = require ('$/fields/mapFields.js');

const { sanitizeString, stripNonASCII } = require ('~/util/sanitization.js');

const { ERROR_NONE, ERROR_BAD_PACKET, ERROR_IN_ROOM } = require ('~/errorCodes.js');


addPacketHandler ('Request', 'CreateRoom', ( client, packet ) =>
{
	const { body } = packet;

	let info;
	let error = ERROR_NONE;

	if ( client.roomID !== null )
	{
		error = ERROR_IN_ROOM;
	}
	else if ( body === null || typeof body !== 'object' )
	{
		error = ERROR_BAD_PACKET;
	}
	else
	{
		info  = mapStringFields (body, fieldData, field => stripNonASCII (field).trim ());
		error = validateRoomInfo (info, client);
	}

	if ( error !== ERROR_NONE )
	{
		client.sendPacket ('Reject', packet, error);
	}
	else
	{
		const roomOrError = addNewRoom (client, mapStringFields (info, fieldData, sanitizeString));

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
