const GameObjectMap  = require ('$/misc/GameObjectMap.js');
const GameRoomEvents = require ('$/rooms/GameRoomEvents.js');

const { createRoom }     = require ('$/rooms/GameRoom.js');
const { createRoomInfo } = require ('$/rooms/GameRoomInfo.js');
const { getClient }      = require ('$/clients/GameClientMap.js');


const GameRoomMap = new GameObjectMap ();

/**
 * @param {GameClient}   owner
 * @param {GameRoomInfo} info
 *
 * @returns {GameRoom}
 */
const addNewRoom = ( owner, info ) =>
{
	const room = createRoom (owner.id, createRoomInfo (info));

	GameRoomMap.addObject (room);
	addClientToRoom (room, owner);

	GameRoomEvents.emit ('createRoom', room, owner);

	return room;
};

/**
 * @param {string} roomID
 */
const deleteRoom = roomID =>
{
	const room = getRoom (roomID);

	GameRoomEvents.emit ('deleteRoom', room);

	room.forEachClient (clientID =>
	{
		getClient (clientID).roomID = null;
	});

	GameRoomMap.deleteObject (roomID);
};

/**
 * @param   {string} roomID
 * @returns {GameRoom|null} null if not found
 */
const getRoom = roomID =>
{
	return GameRoomMap.getObject (roomID);
};

/**
 * @param {GameRoom}   room
 * @param {GameClient} client
 */
const addClientToRoom = ( room, client ) =>
{
	GameRoomEvents.emit ('joinRoom', room, client);

	client.roomID = room.id;
	room.addClientID (client.id);
};

/**
 * @param {GameRoom}   room
 * @param {GameClient} client
 */
const removeClientFromRoom = ( room, client ) =>
{
	if ( room.ownerID === client.id )
	{
		deleteRoom (room.id);
	}
	else
	{
		GameRoomEvents.emit ('leaveRoom', room, client);

		client.roomID = null;
		room.removeClientID (client.id);
	}
};

/**
 * @param {GameRoom} room
 * @param {string}   command
 * @param {*}        body
 */
const sendDataToRoom = ( room, command, body ) =>
{
	const { clientIDs } = room;

	for ( let id of clientIDs )
	{
		getClient (id).sendPacket ('Data', command, body);
	}
};

/**
 * @param {GameRoom}   room
 * @param {GameClient} client
 */
const sendRoomInfo = ( room, client ) =>
{
	client.sendPacket ('Data', 'RoomInfo', room.toString ());
};

/**
 * @param {GameRoom}   room
 * @param {GameClient} client
 */
const sendInfoToRoom = ( room ) =>
{
	sendDataToRoom (room, 'RoomInfo', room.toString ());
};


module.exports =
{
	addNewRoom,
	deleteRoom,
	getRoom,

	addClientToRoom,
	removeClientFromRoom,

	sendDataToRoom,
	sendRoomInfo,
	sendInfoToRoom,
};
