const { addPacketHandler }         = require ('$/packets/PacketHandlers.js');
const { addClientToRoom, getRoom } = require ('$/rooms/GameRoomMap.js');

const { ERROR_IN_ROOM, ERROR_NOT_FOUND, ERROR_ROOM_FULL, ERROR_BANNED } = require ('~/errorCodes.js');


addPacketHandler ('Request', 'JoinRoom', ( client, packet ) =>
{
	const room = getRoom (packet.body);

	let error = null;

	if ( client.roomID !== null )
	{
		error = ERROR_IN_ROOM;
	}
	else if ( room === null )
	{
		error = ERROR_NOT_FOUND;
	}
	else if ( room.isBannedID (client.id) )
	{
		error = ERROR_BANNED;
	}
	else if ( room.isFull () )
	{
		error = ERROR_ROOM_FULL;
	}

	if ( error !== null )
	{
		client.sendPacket ('Reject', packet, error);
	}
	else
	{
		addClientToRoom (room, client);
		client.sendPacket ('Accept', packet);
	}
});
