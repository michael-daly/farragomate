const { v4: uuid } = require ('uuid');

const { has } = require ('~/util/has.js');

const PacketManager = require ('~/packets/PacketManager.js');
const fieldData     = require ('$/clients/fieldData.js');

const { addClientName, removeClientName } = require ('$/clients/GameClientNames.js');


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

	toJSON ()
	{
		return { id: this.id, displayName: this.info.displayName, roomID: this.roomID };
	}

	toString ()
	{
		return JSON.stringify (this.toJSON ());
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
	 * @param {string} type
	 * @param {...*}   args
	 */
	sendPacket ( type, ...args )
	{
		let packet;

		switch ( type )
		{
			case 'Data':
			{
				packet = this.packets.createDataPacket (...args);
				break;
			}

			case 'Request':
			{
				packet = this.packets.createRequestPacket (...args);
				break;
			}

			case 'Response':
			{
				packet = this.packets.createResponsePacket (...args);
				break;
			}

			case 'Accept':
			{
				packet = this.packets.createAcceptPacket (...args);
				break;
			}

			case 'Reject':
			{
				packet = this.packets.createRejectPacket (...args);
				break;
			}

			default:
			{
				throw new Error (`Invalid packet type \`${type}\``);
			}
		}

		this.socket.send (packet.toString ());
	}

	sendError ( message, isFatal = true )
	{
		this.sendPacket ('Data', 'Error', { isFatal, message });
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
