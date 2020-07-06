const { addPacketHandler }         = require ('$/packets/PacketHandlers.js');
const { addClientToRoom, getRoom } = require ('$/rooms/GameRoomMap.js');

const { ERROR_IN_ROOM, ERROR_NOT_FOUND, ERROR_ROOM_FULL, ERROR_BANNED } = require ('~/errorCodes.js');


addPacketHandler ('Request', 'JoinRoom', ( client, packet ) =>
{
	const room = getRoom (packet.body);

	if ( client.roomID !== null )
	{
		client.sendPacket ('Reject', packet, ERROR_IN_ROOM);
	}
	else if ( room === null )
	{
		client.sendPacket ('Reject', packet, ERROR_NOT_FOUND);
	}
	else if ( room.isBannedID (client.id) )
	{
		client.sendPacket ('Reject', packet, ERROR_BANNED);
	}
	else if ( room.isFull () )
	{
		client.sendPacket ('Reject', packet, ERROR_ROOM_FULL);
	}
	else
	{
		addClientToRoom (client, room);
		client.sendPacket ('Accept', packet);
	}
});
