const GameObjectMap  = require ('$/misc/GameObjectMap.js');
const GameRoomEvents = require ('$/rooms/events/GameRoomEvents.js');

const { createRoom }     = require ('$/rooms/GameRoom.js');
const { createRoomInfo } = require ('$/rooms/info/GameRoomInfo.js');
const { getClient }      = require ('$/clients/GameClientMap.js');

const { ERROR_ROOM_LIMIT } = require ('~/errorCodes.js');


const GameRoomMap = new GameObjectMap ();

GameRoomMap.maxRooms = 20;

/**
 * @param {GameClient}   owner
 * @param {GameRoomInfo} info
 *
 * @returns {GameRoom|Integer} Error code if there was an issue creating the room.
 */
const addNewRoom = ( owner, info ) =>
{
	if ( GameRoomMap.size >= GameRoomMap.maxRooms )
	{
		return ERROR_ROOM_LIMIT;
	}

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

	room.clients.forEach (clientID =>
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
	client.roomID = room.id;
	room.clients.addClientID (client.id);

	GameRoomEvents.emit ('joinRoom', room, client);
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
		room.clients.removeClientID (client.id);
	}
};

/**
 * @param {GameRoom} room
 * @param {string}   command
 * @param {*}        body
 */
const sendDataToRoom = ( room, command, body ) =>
{
	room.clients.forEach (clientID =>
	{
		getClient (clientID).sendPacket ('Data', command, body);
	});
};

/**
 * @param {GameRoom}   room
 * @param {GameClient} client
 */
const sendRoomInfo = ( room, client ) =>
{
	client.sendPacket ('Data', 'RoomInfo', room.toJSON ());
};

/**
 * @param {GameRoom}   room
 * @param {GameClient} client
 */
const sendInfoToRoom = ( room ) =>
{
	sendDataToRoom (room, 'RoomInfo', room.toJSON ());
};

/**
 * @param {Integer} value
 */
const setMaxRooms = value =>
{
	GameRoomMap.maxRooms = Math.round (value);
};

/**
 * @returns {Integer}
 */
const getMaxRooms = () =>
{
	return GameRoomMap.maxRooms;
};

/**
 * @returns {Object[]}
 */
const getRoomList = () =>
{
	const { map } = GameRoomMap;

	const list = {};

	for ( let [id, room] of map )
	{
		list[id] = room.toJSON ();
	}

	return list;
};

/**
 * @param   {GameRoom} room
 * @returns {Object}
 */
const getRoomClientList = room =>
{
	const list = {};

	room.clients.forEach (clientID =>
	{
		list[clientID] = getClient (clientID).toJSON ();
	});

	return list;
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

	setMaxRooms,
	getMaxRooms,

	getRoomList,
	getRoomClientList,
};
