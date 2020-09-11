const GameScreen = require ('$/screens/GameScreen.js');

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

SentenceVoting.getNextScreen = function ()
{
	return 'VotingResults';
};


module.exports = SentenceVoting;
