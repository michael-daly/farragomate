const { DataPacket, RequestPacket, ResponsePacket } = require ('~/packets/Packet.js');


class PacketManager
{
	constructor ()
	{
		this.currSequence   = 0;
		this.pendingPackets = new Map ();
	}

	/**
	 * @param {Integer} command
	 * @param {Object}  [body={}]
	 *
	 * @returns {DataPacket}
	 */
	createDataPacket ( command, body )
	{
		return new DataPacket (this.currSequence++, command, body);
	}

	/**
	 * @param {Integer} command
	 * @param {Object}  [body={}]
	 *
	 * @returns {RequestPacket}
	 */
	createRequestPacket ( command, body )
	{
		const packet = new RequestPacket (this.currSequence++, command, body);

		this.pendingPackets.set (packet.sequence, packet);

		return packet;
	}

	/**
	 * @param {RequestPacket} request
	 * @param {Object}        [body={}]
	 *
	 * @returns {ResponsePacket}
	 */
	createResponsePacket ( request, body )
	{
		return new ResponsePacket (this.currSequence++, request, body);
	}

	/**
	 * @param {RequestPacket} request
	 * @param {Object}        [data={}]
	 *
	 * @returns {ResponsePacket}
	 */
	createAcceptPacket ( request, data = {} )
	{
		return this.createResponsePacket (command, request, { response: 'OK', data });
	}

	/**
	 * @param {RequestPacket} request
	 * @param {Object}        [data={}]
	 *
	 * @returns {ResponsePacket}
	 */
	createRejectPacket ( request, data = {} )
	{
		return this.createResponsePacket (command, request, { response: 'ERROR', data });
	}

	/**
	 * @param {Integer} sequence
	 * @returns {boolean}
	 */
	hasPendingPacket ( sequence )
	{
		return this.pendingPackets.has (sequence);
	}

	/**
	 * @param {Integer} sequence
	 */
	removePendingPacket ( sequence )
	{
		this.pendingPackets.delete (sequence);
	}
}


module.exports = PacketManager;
