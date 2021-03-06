const GameScreen = require ('$/screens/GameScreen.js');

const { sendInfoToRoom } = require ('$/rooms/GameRoomMap.js');


const FinalScores = new GameScreen ('FinalScores', 20);

FinalScores.onLeaveScreen = async function ( room )
{
	room.clients.clearScores ();
	sendInfoToRoom (room);
};

FinalScores.getNextScreen = function ( room )
{
	return 'SentenceCreation';
};


module.exports = FinalScores;
