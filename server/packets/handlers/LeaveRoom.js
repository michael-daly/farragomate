const { addPacketHandler } = require ('$/packets/PacketHandlers.js');

const { getRoom, removeClientFromRoom } = require ('$/rooms/GameRoomMap.js');


addPacketHandler ('Data', 'LeaveRoom', ( client, packet ) =>
{
	if ( client.roomID !== null )
	{
		removeClientFromRoom (getRoom (client.roomID), client);
	}
});
