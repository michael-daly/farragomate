const { isPacketCommand }           = require ('~/packets/commands.js');
const { packetTypes, isPacketType } = require ('~/packets/types.js');

const { has, hasMultiple } = require ('~/util/has.js');


const requiredFields = Object.freeze (['type', 'sequence', 'command', 'body']);

/**
 * @param   {Object} packet
 * @returns {boolean}
 */
const isValidPacket = packet =>
{
	if ( typeof packet !== 'object' || !hasMultiple (packet, requiredFields) )
	{
		return false;
	}

	if ( !isPacketType (packet.type) || !isPacketCommand (packet.command) )
	{
		return false;
	}

	if ( packet.type === packetTypes.ResponsePacket )
	{
		if ( !has (packet, 'requestSeq') || !Number.isInteger (packet.requestSeq) )
		{
			return false;
		}

		if ( typeof packet.body !== 'object' || !has (packet.body, 'response') )
		{
			return false;
		}
	}

	return true;
};
