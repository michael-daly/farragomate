const { addPacketHandler } = require ('$/packets/PacketHandlers.js');
const { getClient }        = require ('$/clients/GameClientMap.js');

const { getRoom, removeClientFromRoom, sendDataToRoom } = require ('$/rooms/GameRoomMap.js');

const { ERROR_NOT_IN_ROOM, ERROR_NOT_FOUND, ERROR_NOT_ALLOWED } = require ('~/errorCodes.js');


addPacketHandler ('Request', 'KickClient', ( client, packet ) =>
{
	const victimID = packet.body;
	const room     = getRoom (client.roomID);

	let error = null;

	if ( room === null )
	{
		error = ERROR_NOT_IN_ROOM;
	}
	else if ( !room.hasClientID (victimID) )
	{
		error = ERROR_NOT_FOUND;
	}
	else if ( !room.isOwner (client.id) || victimID === client.id )
	{
		error = ERROR_NOT_ALLOWED;
	}

	if ( error !== null )
	{
		client.sendPacket ('Reject', packet, error);
	}
	else
	{
		sendDataToRoom (room, 'KickClient', victimID);
		removeClientFromRoom (room, getClient (victimID));

		client.sendPacket ('Accept', packet);
	}
});
