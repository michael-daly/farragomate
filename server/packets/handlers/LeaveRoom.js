const { GameRoomHandlers } = require ('$/packets/handlerMaps.js');

const { getRoom, removeClientFromRoom } = require ('$/rooms/GameRoomMap.js');


GameRoomHandlers.addHandler ('Data', 'LeaveRoom', ( client, packet ) =>
{
	removeClientFromRoom (getRoom (client.roomID), client);
});
