const GameScreen = require ('$/screens/GameScreen.js');

const { sendDataToRoom } = require ('$/rooms/GameRoomMap.js');


const SentenceVoting = new GameScreen ('SentenceVoting', 30);

SentenceVoting.onEnterScreen = async function ( room )
{
	sendDataToRoom (room, 'ClientSentences', room.sentences);
};

SentenceVoting.onLeaveScreen = async function ( room )
{
	// Pause for 1.5 seconds to receive all the votes.
	await setTimeout (() => {}, 1500);
};

SentenceVoting.getNextScreen = function ()
{
	return 'VotingResults';
};


module.exports = SentenceVoting;
