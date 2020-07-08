const GameRoomEvents   = require ('$/rooms/events/GameRoomEvents.js');
const SentenceCreation = require ('$/screens/SentenceCreation.js');

const
{
	sendDataToRoom,
	sendRoomInfo,
	sendInfoToRoom,
	getRoomClientList,
}
= require ('$/rooms/GameRoomMap.js');


GameRoomEvents.on ('createRoom', ( room, owner ) =>
{
	room.timer.on ('tick', time =>
	{
		sendDataToRoom (room, 'RoomInfo', { timeLeft: room.timeLeft });
	});

	room.timer.on ('stop', ( time, wasForced ) =>
	{
		if ( !wasForced )
		{
			room.nextScreen ();
		}
	});

	room.setScreen (SentenceCreation);
});

GameRoomEvents.on ('joinRoom', ( room, client ) =>
{
	sendDataToRoom (room, 'JoinRoom', client.toString ());
	client.sendPacket ('Data', 'ClientList', getRoomClientList (room));

	sendRoomInfo (room, client);
});

GameRoomEvents.on ('leaveRoom', ( room, client ) =>
{
	sendDataToRoom (room, 'LeaveRoom', client.id);
});

GameRoomEvents.on ('deleteRoom', room =>
{
	sendDataToRoom (room, 'DeleteRoom');
});
