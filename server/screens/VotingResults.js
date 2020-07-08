const GameScreen = require ('$/screens/GameScreen.js');

const { sendInfoToRoom } = require ('$/rooms/GameRoomMap.js');


const VotingResults = new GameScreen ('VotingResults', 15);

VotingResults.onEnterScreen = async function ( room )
{
	sendDataToRoom (room, 'ClientSentences', room.sentences);
};

VotingResults.onLeaveScreen = async function ( room )
{
	room.sentences.clearSentences ();

	if ( room.currRound < room.info.getField ('numRounds') - 1 )
	{
		room.currRound++;
		sendInfoToRoom (room);
	}
};

VotingResults.getNextScreen = function ( room )
{
	if ( room.currRound >= room.info.getField ('numRounds') - 1 )
	{
		return 'SentenceCreation';
	}

	return 'FinalScores';
};


module.exports = VotingResults;
