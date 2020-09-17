const GameRoomEvents   = require ('$/rooms/events/GameRoomEvents.js');
const SentenceCreation = require ('$/screens/SentenceCreation.js');

const getGameScreen = require ('$/screens/getGameScreen.js');

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
			sendDataToRoom (room, 'LeaveScreen', room.screen.name);
			room.leaveScreen ();
		}
	});

	room.events.on ('enterScreen', screen =>
	{
		room.timer.start (screen.getStartTime (room));
		sendDataToRoom (room, 'RoomInfo', room.toJSON ());
	});

	room.events.on ('leaveScreen', screen =>
	{
		room.screen = getGameScreen (screen.getNextScreen (room));

		sendDataToRoom (room, 'EnterScreen', room.screen.name);
		room.enterScreen ();
	});

	room.start (SentenceCreation);
});

GameRoomEvents.on ('joinRoom', ( room, client ) =>
{
	sendDataToRoom (room, 'JoinRoom', client.id);
	sendDataToRoom (room, 'ClientList', getRoomClientList (room));

	// This is to prevent unfinished wordbanks from being sent when the client creates the room.
	if ( client.id !== room.ownerID )
	{
		client.sendPacket ('Data', 'Wordbanks', room.sentences.getWordbanks ());
	}

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
