const GameObjectMap    = require ('$/misc/GameObjectMap.js');
const GameClientEvents = require ('$/clients/GameClientEvents.js');

const { createClient } = require ('$/clients/GameClient.js');


const GameClientMap = new GameObjectMap ();

/**
 * @param {WebSocket}      socket
 * @param {GameClientInfo} info
 *
 * @returns {GameClient}
 */
const addNewClient = ( socket, info ) =>
{
	const client = createClient (socket, info);

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


module.exports = { addNewClient, deleteClient, getClient };
