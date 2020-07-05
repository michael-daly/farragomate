const types = new Set (['Packet', 'Data', 'Request', 'Response']);


module.exports =
{
	isPacketType ( type )
	{
		return types.has (type);
	},
};
