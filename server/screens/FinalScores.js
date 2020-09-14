const GameScreen = require ('$/screens/GameScreen.js');

const { sendInfoToRoom, sendDataToRoom, getRoomClientList } = require ('$/rooms/GameRoomMap.js');


const FinalScores = new GameScreen ('FinalScores', 20);

FinalScores.onLeaveScreen = async function ( room )
{
	room.currRound = 0;
	room.sentences.clearScores ();

	sendInfoToRoom (room);
	sendDataToRoom (room, 'ClientList', getRoomClientList (room));
};

FinalScores.getNextScreen = function ( room )
{
	return 'SentenceCreation';
};


module.exports = FinalScores;
