const { v4: uuid } = require ('uuid');

const { has } = require ('~/util/has.js');

const PacketManager = require ('~/packets/PacketManager.js');
const fieldData     = require ('$/clients/fieldData.js');

const { addClientName, removeClientName } = require ('$/clients/GameClientNames.js');
const { packetTypes, isPacketType }       = require ('~/packets/types.js');

const $ = require ('~/packets/commands.js').packetCommands;


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
	 * @param {string} name
	 */
	setDisplayName ( name )
	{
		if ( this.info.displayName !== null )
		{
			removeClientName (this.info.displayName);
		}

		addClientName (name);

		this.info.displayName = name;
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
			case 'Data':
			{
				funcName = 'createDataPacket';
				break;
			}

			case 'Request':
			{
				funcName = 'createRequestPacket';
				break;
			}

			case 'Response':
			{
				funcName = 'createResponsePacket';
				break;
			}

			case 'Accept':
			{
				funcName = 'createAcceptPacket';
				break;
			}

			case 'Reject':
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

	sendError ( message, isFatal = true )
	{
		this.sendPacket ('Data', $.Error, { isFatal, message });
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
