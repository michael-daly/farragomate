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

	room.numRounds++;

	sendDataToRoom (room, 'ClientList', getRoomClientList (room));

	if ( room.numRounds < room.info.getField ('maxRounds') )
	{
		sendDataToRoom (room, 'RoomInfo', { numRounds: room.numRounds });
	}
};

VotingResults.getNextScreen = function ( room )
{
	if ( room.numRounds < room.info.getField ('maxRounds') )
	{
		return 'SentenceCreation';
	}

	return 'FinalScores';
};


module.exports = VotingResults;
