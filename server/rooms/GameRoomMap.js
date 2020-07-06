const GameObjectMap = require ('$/misc/GameObjectMap.js');

const { createRoom } = require ('$/rooms/GameRoom.js');
const { getClient }  = require ('$/clients/GameClientMap.js');


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
	addClientToRoom (owner, room.id);

	return room;
};

/**
 * @param {GameClient} client
 * @param {GameRoom}   room
 */
const addClientToRoom = ( client, room ) =>
{
	client.roomID = room.id;
	sendDataToRoom (room.id, 'JoinRoom', client.toString ());

	room.addClientID (client.id);
}

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

/**
 * @param {string} roomID
 * @param {string} command
 * @param {*}      body
 */
const sendDataToRoom = ( roomID, command, body ) =>
{
	const { clientIDs } = getRoom (roomID);

	for ( let id of clientIDs )
	{
		getClient (id).sendPacket ('Data', command, body);
	}
};


module.exports = { addNewRoom, addClientToRoom, deleteRoom, getRoom, sendDataToRoom };
