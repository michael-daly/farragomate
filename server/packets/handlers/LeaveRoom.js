const fieldData        = require ('$/rooms/fieldData.js');
const sanitizeFields   = require ('$/fields/sanitizeFields.js');
const validateRoomInfo = require ('$/rooms/validateRoomInfo.js');

const { addPacketHandler } = require ('$/packets/PacketHandlers.js');

const { getRoom, removeClientFromRoom } = require ('$/rooms/GameRoomMap.js');

const { ERROR_NONE } = require ('~/errorCodes.js');


addPacketHandler ('Data', 'LeaveRoom', ( client, packet ) =>
{
	if ( client.roomID !== null )
	{
		removeClientFromRoom (getRoom (client.roomID), client);
	}
});
