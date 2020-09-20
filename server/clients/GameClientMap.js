const GameObjectMap    = require ('$/misc/GameObjectMap.js');
const GameClientEvents = require ('$/clients/events/GameClientEvents.js');

const { createClient }     = require ('$/clients/GameClient.js');
const { createClientInfo } = require ('$/clients/info/GameClientInfo.js');

const { ERROR_CLIENT_LIMIT } = require ('~/errorCodes.js');


const GameClientMap = new GameObjectMap ();

GameClientMap.maxClients = 20;

/**
 * @param {WebSocket}      socket
 * @param {GameClientInfo} info
 *
 * @returns {GameClient|Integer} Error code if there was an issue creating the client.
 */
const addNewClient = ( socket, info ) =>
{
	if ( GameClientMap.size >= GameClientMap.maxClients )
	{
		return ERROR_CLIENT_LIMIT;
	}

	const client = createClient (socket, createClientInfo (info));

	GameClientMap.addObject (client);

	return client;
};

/**
 * @param {string} clientID
 */
const deleteClient = clientID =>
{
	GameClientEvents.emit ('deleteClient', getClient (clientID));

	GameClientMap.deleteObject (clientID);
};

/**
 * @param   {string} clientID
 * @returns {GameClient|null} null if not found
 */
const getClient = clientID =>
{
	return GameClientMap.getObject (clientID);
}

/**
 * @param {Integer} value
 */
const setMaxClients = value =>
{
	GameClientMap.maxClients = Math.round (value);
};

/**
 * @returns {Integer}
 */
const getMaxClients = () =>
{
	return GameClientMap.maxClients;
};


module.exports = { addNewClient, deleteClient, getClient, setMaxClients, getMaxClients };
