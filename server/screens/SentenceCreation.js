const GameScreen = require ('$/screens/GameScreen.js');

const { sleep }          = require ('~/util/promises.js');
const { sendDataToRoom } = require ('$/rooms/GameRoomMap.js');


const SentenceCreation = new GameScreen ('SentenceCreation');

SentenceCreation.onEnterScreen = async function ( room )
{
	await room.sentences.fetchWords ();

	if ( !room.isDeleted )
	{
		sendDataToRoom (room, 'Wordbanks', room.sentences.getWordbanks ());
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
