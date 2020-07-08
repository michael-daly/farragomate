const GameScreen = require ('$/screens/GameScreen.js');

const { sendDataToRoom } = require ('$/rooms/GameRoomMap.js');


const VotingResults = new GameScreen ('VotingResults', 15);

VotingResults.onEnterScreen = async function ( room )
{
	sendDataToRoom (room, 'ClientSentences', room.sentences.getSentences ());
};

VotingResults.onLeaveScreen = async function ( room )
{
	room.clients.clearVotedIDs ();
	room.sentences.clearSentences ();

	room.currRound++;

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
