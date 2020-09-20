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
		if ( sentences.hasSentence (id) && clients.hasClientID (id) )
		{
			clients.addScore (id, sentences.getNumVotes (id));
		}
	});

	clients.clearVotedIDs ();
	sentences.clearSentences ();
};

VotingResults.getNextScreen = function ( room )
{
	if ( room.numRounds + 1 < room.info.getField ('maxRounds') )
	{
		return 'SentenceCreation';
	}

	return 'FinalScores';
};

VotingResults.getStartTime = function ( room )
{
	if ( Object.keys (room.sentences.getSentences ()).length <= 0 )
	{
		return 1;
	}

	return this.constructor.prototype.getStartTime.apply (this);
};


module.exports = VotingResults;
