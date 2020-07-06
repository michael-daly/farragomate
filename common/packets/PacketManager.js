const { DataPacket, RequestPacket, ResponsePacket } = require ('~/packets/Packet.js');


class PacketManager
{
	constructor ()
	{
		this.currSequence   = 0;
		this.pendingPackets = new Map ();
	}

	/**
	 * @param {string} command
	 * @param {Object} [body={}]
	 *
	 * @returns {DataPacket}
	 */
	createDataPacket ( command, body )
	{
		return new DataPacket (this.currSequence++, command, body);
	}

	/**
	 * @param {string} command
	 * @param {Object} [body={}]
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
	 * @param {Object}        [data=null]
	 *
	 * @returns {ResponsePacket}
	 */
	createAcceptPacket ( request, data = null )
	{
		const body = { response: 'OK' };

		if ( data !== null )
		{
			body.data = data;
		}

		return this.createResponsePacket (request, body);
	}

	/**
	 * @param {RequestPacket} request
	 * @param {Object}        [data=null]
	 *
	 * @returns {ResponsePacket}
	 */
	createRejectPacket ( request, data = null )
	{
		const body = { response: 'ERROR' };

		if ( data !== null )
		{
			body.data = data;
		}

		return this.createResponsePacket (request, body);
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
