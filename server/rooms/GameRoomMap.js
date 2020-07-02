const GameObjectMap = require ('$/misc/GameObjectMap.js');

const { createRoom } = require ('$/rooms/GameRoom.js');


const GameRoomMap = new GameObjectMap ();

/**
 * @param   {GameRoomInfo} info
 * @returns {GameRoom}
 */
const addNewRoom = info =>
{
	const room = createRoom (info);

	GameRoomMap.addObject (room);

	return room;
};

/**
 * @param {string} roomID
 */
const deleteRoom = roomID =>
{
	GameRoomMap.deleteObject (roomID);
};


module.exports = { addNewRoom, deleteRoom };
