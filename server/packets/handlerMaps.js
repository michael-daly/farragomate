const PacketHandlerMap = require ('$/packets/PacketHandlerMap.js');

const { ERROR_IN_ROOM, ERROR_NOT_IN_ROOM } = require ('~/errorCodes.js');


/**
 * Handlers for when a client is not in a room.
 */
const MainMenuHandlers = new PacketHandlerMap (( client, packet ) =>
{
	if ( packet.type === 'Request' )
	{
		client.sendPacket ('Reject', packet, ERROR_NOT_IN_ROOM);
	}
});

/**
 * Handlers for when a client is in a room.
 */
const GameRoomHandlers = new PacketHandlerMap (( client, packet ) =>
{
	if ( packet.type === 'Request' )
	{
		client.sendPacket ('Reject', packet, ERROR_IN_ROOM);
	}
});


module.exports = { MainMenuHandlers, GameRoomHandlers };
