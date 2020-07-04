const isValidPacket = require ('~/packets/isValidPacket.js');

const { InvalidPacketError } = require ('$/errors.js');
const { createClientInfo }     = require ('$/clients/GameClientInfo.js');

const { addNewClient, deleteClient } = require ('$/clients/GameClientMap.js');

const { RegisterInfo } = require ('~/packets/commands.js').packetCommands;


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

	const { gameClient } = this;

	let packet;

	try
	{
		packet = JSON.parse (message);

		if ( !isValidPacket (packet) )
		{
			throw new InvalidPacketError ();
		}
	}
	catch ( error )
	{
		let errorMsg = 'Internal server error';

		if ( error instanceof SyntaxError )
		{
			errorMsg = 'Malformed packet';
		}
		else if ( error instanceof InvalidPacketError )
		{
			errorMsg = 'Invalid packet';
		}
		else
		{
			console.error ('Packet JSON parsing error:', error.message);
		}

		gameClient.sendError (errorMsg, true);
		return;
	}

	if ( gameClient.info.displayName === null && packet.command !== RegisterInfo )
	{
		gameClient.sendPacket ('Response', packet, 'Please set your name first.');
		return;
	}

	console.log ('All good! :)');
};


module.exports = onNewConnection;
