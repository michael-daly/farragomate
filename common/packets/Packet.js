class Packet
{
	/**
	 * @param {Integer} sequence
	 * @param {Integer} command
	 * @param {Object}  [body={}]
	 */
	constructor ( sequence, command, body = {} )
	{
		this.type     = 'Packet';
		this.sequence = sequence;
		this.command  = command;
		this.body     = body;
	}

	toJSON ()
	{
		return { type: this.type, sequence: this.sequence, command: this.command, body: this.body };
	}

	toString ()
	{
		return JSON.stringify (this.toJSON ());
	}
}

class DataPacket extends Packet
{
	constructor ( ...args )
	{
		super (...args);
		this.type = 'Data';
	}
}

class RequestPacket extends Packet
{
	constructor ( ...args )
	{
		super (...args);
		this.type = 'Request';
	}
}

class ResponsePacket extends Packet
{
	/**
	 * @param {Integer}       sequence
	 * @param {RequestPacket} request
	 * @param {Object}        [body={}]
	 */
	constructor ( sequence, request, body = {} )
	{
		super (sequence, request.command, body);

		this.type       = 'Response';
		this.requestSeq = request.sequence;
	}

	toJSON ()
	{
		const data = super.toJSON ();

		data.requestSeq = this.requestSeq;

		return data;
	}
}


module.exports = { Packet, DataPacket, RequestPacket, ResponsePacket };
