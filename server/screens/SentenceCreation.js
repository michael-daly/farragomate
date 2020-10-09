const GameScreen = require ('$/screens/GameScreen.js');

const { sleep } = require ('~/util/promises.js');

const
{
	sendInfoToRoom,
	sendDataToRoom,
	getRoomClientList,
	deleteRoom,
}
= require ('$/rooms/GameRoomMap.js');


const SentenceCreation = new GameScreen ('SentenceCreation');

SentenceCreation.onEnterScreen = async function ( room )
{
	await room.sentences.fetchWords ().catch ( error =>
	{
		console.log (`[${room.id}] Wordnik API error: ${error.message}`);
		deleteRoom (room.id, 'API error');
	});

	if ( !room.isDeleted )
	{
		room.numRounds++;

		if ( room.numRounds >= room.info.getField ('maxRounds') )
		{
			room.numRounds = 0;
		}

		room.clients.forEach (clientID =>
		{
			room.clients.setCanVote (clientID, true);
		});

		sendInfoToRoom (room);
		sendDataToRoom (room, 'Wordbanks', room.sentences.getWordbanks ());
		sendDataToRoom (room, 'ClientList', getRoomClientList (room));
	}
};

SentenceCreation.onLeaveScreen = async function ( room )
{
	// Wait 2 seconds for sentences to be sent.
	await sleep (2000);
};

SentenceCreation.getNextScreen = function ()
{
	return 'SentenceVoting';
};


module.exports = SentenceCreation;
