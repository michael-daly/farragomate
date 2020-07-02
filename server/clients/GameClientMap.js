const { createClient } = require ('$/clients/GameClient.js');


const GameClientMap = new Map ();

/**
 * @param {WebSocket}      socket
 * @param {GameClientInfo} info
 *
 * @returns {GameClient}
 */
const addNewClient = ( socket, info ) =>
{
	const client = createClient (socket, info);

	GameClientMap.set (client.id, client);

	return client;
};

/**
 * @param {string} clientID
 */
const deleteClient = clientID =>
{
	if ( !GameClientMap.has (clientID) )
	{
		return;
	}

	const client = GameClientMap.get (clientID);

	GameClientMap.delete (clientID);
	client.delete ();
};


module.exports = { addNewClient, deleteClient };
