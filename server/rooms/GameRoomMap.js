const { createRoom } = require ('$/rooms/GameRoom.js');


const GameRoomMap = new Map ();

/**
 * @param   {GameRoomInfo} info
 * @returns {GameRoom}
 */
const addNewRoom = info =>
{
	const room = createRoom (socket, info);

	GameRoomMap.set (room.id, room);

	return room;
};

/**
 * @param {string} roomID
 */
const deleteRoom = roomID =>
{
	if ( !GameRoomMap.has (roomID) )
	{
		return;
	}

	const room = GameRoomMap.get (roomID);

	GameRoomMap.delete (roomID);
	room.delete ();
};


module.exports = { addNewRoom, deleteRoom };
