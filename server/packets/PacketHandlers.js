/**
 * @callback PacketHandler
 *
 * @param {GameClient} client - The client who sent this packet.
 * @param {Packet}     packet - The packet that the client sent.
 */

const PacketHandlers =
{
	map: new Map (),

	/**
	 * @param {Integer}       type
	 * @param {Integer}       command
	 * @param {PacketHandler} handler
	 */
	add ( type, command, handler )
	{
		const { map } = this;

		if ( !map.has (type) )
		{
			map.set (type, new Map ());
		}

		map.get (type).set (command, handler);
	},

	/**
	 * @param {Integer} type
	 * @param {Integer} command
	 *
	 * @returns {boolean}
	 */
	has ( type, command )
	{
		return this.map.has (type) && this.map.get (type).has (command);
	},

	/**
	 * @param {Integer} type
	 * @param {Integer} command
	 *
	 * @returns {PacketHandler|null} null if not found
	 */
	get ( type, command )
	{
		return this.has (type, command) ? this.map.get (type).get (command) : null;
	},
};

/**
 * @param {Integer}       type
 * @param {Integer}       command
 * @param {PacketHandler} handler
 *
 * @throws {Error} If there's already an existing handler for that packet type.
 */
const addPacketHandler = ( type, command, handler ) =>
{
	if ( PacketHandlers.has (type, command) && PacketHandlers.get (type, command) !== handler )
	{
		throw new Error (`Packet type \`${type}\` already has a handler!`);
	}

	PacketHandlers.add (type, command, handler);
};

/**
 * Calls the handler function assigned to this packet type.
 *
 * @param {GameClient} client - The client who sent this packet.
 * @param {Packet}     packet - The packet that the client sent.
 */
const handlePacket = ( client, packet ) =>
{
	const { type, command } = packet;

	if ( PacketHandlers.has (type, command) )
	{
		PacketHandlers.get (type, command) (client, packet);
	}
};


module.exports = { addPacketHandler, handlePacket };
