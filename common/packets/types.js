const enumerate = require ('~/util/enumerate.js');

const { has } = require ('~/util/has.js');


const typeNames   = ['Packet', 'DataPacket', 'RequestPacket', 'ResponsePacket'];
const packetTypes = enumerate (typeNames);


module.exports =
{
	packetTypes,

	isPacketType ( type )
	{
		if ( typeof type === 'string' )
		{
			return has (packetTypes, type);
		}

		return Number.isInteger (type) && type >= 0 && type < typeNames.length;
	}
};
