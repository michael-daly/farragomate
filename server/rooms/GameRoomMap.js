const GameObjectMap = require ('$/misc/GameObjectMap.js');

const { createRoom } = require ('$/rooms/GameRoom.js');


const GameRoomMap = new GameObjectMap ();

/**
 * @param {string}       ownerID
 * @param {GameRoomInfo} info
 *
 * @returns {GameRoom}
 */
const addNewRoom = ( ownerID, info ) =>
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

/**
 * @param   {string} roomID
 * @returns {GameRoom|null} null if not found
 */
const getRoom = roomID =>
{
	return GameRoomMap.getObject (roomID);
}


module.exports = { addNewRoom, deleteRoom, getRoom };
