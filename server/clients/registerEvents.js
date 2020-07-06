const GameClientEvents = require ('$/clients/GameClientEvents.js');

const { removeClientName } = require ('$/clients/GameClientNames.js');

const { getRoom, removeClientFromRoom } = require ('$/rooms/GameRoomMap.js');


GameClientEvents.on ('deleteClient', client =>
{
	removeClientName (client.getDisplayName ());

	if ( client.roomID !== null )
	{
		removeClientFromRoom (getRoom (client.roomID), client);
	}
});
