const socketConnect = url =>
{
	return { type: 'SOCKET_CONNECT', payload: url };
};

const sendDataPacket = ( command, body = '' ) =>
{
	return { type: 'SEND_DATA_PACKET', payload: { command, body } };
};

const sendRequestPacket = ( command, body = '' ) =>
{
	return { type: 'SEND_REQUEST_PACKET', payload: { command, body } };
};

const cancelRequest = type =>
{
	return { type: 'CANCEL_REQUEST', payload: type };
};


export { socketConnect, sendDataPacket, sendRequestPacket, cancelRequest };
