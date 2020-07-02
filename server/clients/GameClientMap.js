const GameObjectMap = require ('$/misc/GameObjectMap.js');

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
	GameClientMap.deleteObject (clientID);
};


module.exports = { addNewClient, deleteClient };
