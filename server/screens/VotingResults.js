const GameScreen = require ('$/screens/GameScreen.js');

const { sendDataToRoom, getRoomClientList } = require ('$/rooms/GameRoomMap.js');


// TODO: Skip this screen if there were no sentences submitted.
const VotingResults = new GameScreen ('VotingResults', 15);

VotingResults.onEnterScreen = async function ( room )
{
	sendDataToRoom (room, 'ClientSentences', room.sentences.getSentences ());
};

VotingResults.onLeaveScreen = async function ( room )
{
	const { clients, sentences } = room;

	clients.forEach (( id, data ) =>
	{
		if ( sentences.hasSentence (id) )
		{
			clients.addScore (id, sentences.getNumVotes (id));
		}
	});

	clients.clearVotedIDs ();
	sentences.clearSentences ();

	room.currRound++;

	sendDataToRoom (room, 'ClientList', getRoomClientList (room));

	if ( room.currRound < room.info.getField ('numRounds') )
	{
		sendDataToRoom (room, 'RoomInfo', { currRound: room.currRound });
	}
};

VotingResults.getNextScreen = function ( room )
{
	if ( room.currRound < room.info.getField ('numRounds') )
	{
		return 'SentenceCreation';
	}

	return 'FinalScores';
};


module.exports = VotingResults;
