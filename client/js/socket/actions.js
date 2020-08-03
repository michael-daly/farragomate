const socketConnect = url =>
{
	return { type: 'SOCKET_CONNECT', payload: url };
};


export { socketConnect };
