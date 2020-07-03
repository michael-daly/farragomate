const { createClientInfo } = require ('$/clients/GameClientInfo.js');

const { addNewClient, deleteClient } = require ('$/clients/GameClientMap.js');


/**
 * Handler for a new connection.  Creates a GameClient instance with the socket.
 */
const onNewConnection = function ( socket, request )
{
	addNewClient (socket, createClientInfo ());

	console.log (`New connection: ${socket.gameClient.id}`);

	socket.on ('message', onSocketMessage);
	socket.on ('close', onSocketClose);
};

/**
 * Handler for when a client socket is closed.  `this` is bound to the WebSocket instance.
 */
const onSocketClose = function ()
{
	const { id } = this.gameClient;

	deleteClient (id);

	console.log (`${id} disconnected.`);
};

/**
 * Handler for parsing messages from the client and dealing with any issues/errors with them.
 * `this` is bound to the WebSocket instance.
 */
const onSocketMessage = function ( message )
{
	console.log ('onSocketMessage:', message);
};


module.exports = onNewConnection;
