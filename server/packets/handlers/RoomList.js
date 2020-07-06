const { addPacketHandler } = require ('$/packets/PacketHandlers.js');
const { getRoomList }      = require ('$/rooms/GameRoomMap.js');

const { getTimestamp, getTimeSince } = require ('~/util/timestamps.js');

const { ERROR_FLOOD } = require ('~/errorCodes.js');

const TIMEOUT = 1500;


addPacketHandler ('Request', 'RoomList', ( client, packet ) =>
{
	if ( getTimeSince (client.lastRoomListTime) < TIMEOUT )
	{
		client.sendPacket ('Reject', packet, ERROR_FLOOD);
	}
	else
	{
		client.lastRoomListTime = getTimestamp ();
		client.sendPacket ('Accept', packet, getRoomList ());
	}
});
