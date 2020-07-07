const { MainMenuHandlers } = require ('$/packets/handlerMaps.js');
const { getRoomList }      = require ('$/rooms/GameRoomMap.js');

const { getTimestamp, getTimeSince } = require ('~/util/timestamps.js');

const { ERROR_FLOOD }       = require ('~/errorCodes.js');
const { ROOM_LIST_TIMEOUT } = require ('~/constants.js');


MainMenuHandlers.addHandler ('Request', 'RoomList', ( client, packet ) =>
{
	if ( getTimeSince (client.lastRoomListTime) < ROOM_LIST_TIMEOUT )
	{
		client.sendPacket ('Reject', packet, ERROR_FLOOD);
	}
	else
	{
		client.lastRoomListTime = getTimestamp ();
		client.sendPacket ('Accept', packet, getRoomList ());
	}
});
