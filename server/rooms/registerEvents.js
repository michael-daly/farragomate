const GameRoomEvents = require ('$/rooms/GameRoomEvents.js');

const { sendDataToRoom } = require ('$/rooms/GameRoomMap.js');


GameRoomEvents.on ('joinRoom', ( room, client ) =>
{
	sendDataToRoom (room, 'JoinRoom', client.toString ());
});

GameRoomEvents.on ('leaveRoom', ( room, client ) =>
{
	sendDataToRoom (room, 'LeaveRoom', client.id);
});

GameRoomEvents.on ('deleteRoom', room =>
{
	sendDataToRoom (room, 'DeleteRoom');
});
