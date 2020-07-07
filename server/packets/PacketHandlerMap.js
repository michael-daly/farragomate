/**
 * @callback PacketHandler
 *
 * @param {GameClient} client - The client who sent this packet.
 * @param {Packet}     packet - The packet that the client sent.
 */

/**
 * A collection of packet handler functions.
 */
class PacketHandlerMap
{
	/**
	 * @param {PacketHandler} [defaultHandler=null] - The handler that's called when there's no
	 *                                                handler bound to that packet type/command.
	 */
	constructor ( defaultHandler = null )
	{
		this.map            = new Map ();
		this.defaultHandler = defaultHandler;
	}

	/**
	 * @param {string}        type
	 * @param {string}        command
	 * @param {PacketHandler} handler
	 */
	addHandler ( type, command, handler )
	{
		if ( this.hasHandler (type, command) && this.getHandler (type, command) !== handler )
		{
			throw new Error (`Packet command \`${command}\` already has a handler!`);
		}

		const { map } = this;

		if ( !map.has (type) )
		{
			map.set (type, new Map ());
		}

		map.get (type).set (command, handler);
	}

	/**
	 * @param {string} type
	 * @param {string} command
	 *
	 * @returns {boolean}
	 */
	hasHandler ( type, command )
	{
		return this.map.has (type) && this.map.get (type).has (command);
	}

	/**
	 * @param {string} type
	 * @param {string} command
	 *
	 * @returns {PacketHandler|null} null if not found
	 */
	getHandler ( type, command )
	{
		return this.hasHandler (type, command) ? this.map.get (type).get (command) : null;
	}

	/**
	 * Calls the handler function assigned to this packet type.
	 *
	 * @param {GameClient} client - The client who sent this packet.
	 * @param {Packet}     packet - The packet that the client sent.
	 */
	handlePacket ( client, packet )
	{
		const { type, command } = packet;

		if ( this.hasHandler (type, command) )
		{
			this.getHandler (type, command) (client, packet);
		}
		else if ( this.defaultHandler !== null )
		{
			this.defaultHandler (client, packet);
		}
	}
}


module.exports = PacketHandlerMap;
