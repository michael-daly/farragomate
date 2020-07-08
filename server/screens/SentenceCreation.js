const GameScreen = require ('$/screens/GameScreen.js');

const { sendDataToRoom } = require ('$/rooms/GameRoomMap.js');


const SentenceCreation = new GameScreen ('SentenceCreation');

SentenceCreation.onEnterScreen = async function ( room )
{
	await room.sentences.fetchWords ();

	sendDataToRoom (room, 'Wordbanks', room.sentences.getWordbanks ());
};

SentenceCreation.onLeaveScreen = async function ( room )
{
	// Pause for 1.5 seconds to receive all the sentences.
	await setTimeout (() => {}, 1500);
};

SentenceCreation.getNextScreen = function ()
{
	return 'SentenceVoting';
};


module.exports = SentenceCreation;
