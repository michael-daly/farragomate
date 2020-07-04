const GameObjectMap = require ('$/misc/GameObjectMap.js');

const { createRoom } = require ('$/rooms/GameRoom.js');


const GameRoomMap = new GameObjectMap ();

/**
 * @param {GameClient}   owner
 * @param {GameRoomInfo} info
 *
 * @returns {GameRoom}
 */
const addNewRoom = ( owner, info ) =>
{
	const room = createRoom (owner.id, info);

	GameRoomMap.addObject (room);

	room.addClientID (owner.id);
	owner.roomID = room.id;

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
