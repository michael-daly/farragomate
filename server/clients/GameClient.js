const { v4: uuid } = require ('uuid');

const PacketManager = require ('~/packets/PacketManager.js');


class GameClient
{
	/**
	 * @param {string}         id
	 * @param {WebSocket}      socket
	 * @param {GameClientInfo} info
	 */
	constructor ( id, socket, info )
	{
		socket.gameClient = this;

		this.id      = id;
		this.socket  = socket;
		this.info    = info;
		this.packets = new PacketManager ();
		this.roomID  = null;

		this.isDeleted = false;
	}

	delete ()
	{
		if ( !this.isDeleted )
		{
			return;
		}

		this.socket.close ();

		delete this.socket.gameClient;

		delete this.id;
		delete this.socket;
		delete this.info;
		delete this.packets;
		delete this.roomID;

		this.isDeleted = true;
	}

	/**
	 * @param {string} funcName
	 * @param {...*}   args
	 */
	sendPacket ( type, ...args )
	{
		let funcName;

		switch ( type )
		{
			case 'DataPacket':
			{
				funcName = 'createDataPacket';
				break;
			}

			case 'RequestPacket':
			{
				funcName = 'createRequestPacket';
				break;
			}

			case 'ResponsePacket':
			{
				funcName = 'createResponsePacket';
				break;
			}

			case 'AcceptPacket':
			{
				funcName = 'createAcceptPacket';
				break;
			}

			case 'RejectPacket':
			{
				funcName = 'createRejectPacket';
				break;
			}

			default:
			{
				throw new Error (`Invalid packet type ${type}`);
			}
		}

		this.socket.send (this.packets[funcName] (...args).toString ());
	}
}

/**
 * @param {WebSocket}      socket
 * @param {GameClientInfo} info
 *
 * @returns {GameClient}
 */
const createClient = ( socket, info ) =>
{
	return new GameClient (uuid (), socket, info);
};


module.exports = { GameClient, createClient };
