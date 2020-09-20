const GameScreen    = require ('$/screens/GameScreen.js');
const VotingResults = require ('$/screens/VotingResults.js');

const { sleep }          = require ('~/util/promises.js');
const { sendDataToRoom } = require ('$/rooms/GameRoomMap.js');


// TODO: Make voting change depending on how many sentences there are to read, including none.
const SentenceVoting = new GameScreen ('SentenceVoting', 30);

SentenceVoting.onEnterScreen = async function ( room )
{
	sendDataToRoom (room, 'ClientSentences', room.sentences.getSentences ());
};

SentenceVoting.onLeaveScreen = async function ( room )
{
	// Wait 2 seconds for votes to be sent.
	await sleep (2000);
};

SentenceVoting.getNextScreen = function ( room )
{
	if ( Object.keys (room.sentences.getSentences ()).length <= 0 )
	{
		return VotingResults.getNextScreen (room);
	}

	return 'VotingResults';
};

SentenceVoting.getStartTime = function ( room )
{
	if ( Object.keys (room.sentences.getSentences ()).length <= 0 )
	{
		return 5;
	}

	return this.constructor.prototype.getStartTime.apply (this);
};


module.exports = SentenceVoting;
