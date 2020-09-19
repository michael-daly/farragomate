const { MainMenuHandlers }         = require ('$/packets/handlerMaps.js');
const { addClientToRoom, getRoom } = require ('$/rooms/GameRoomMap.js');

const
{
	ERROR_NOT_FOUND,
	ERROR_WRONG_PASSWORD,
	ERROR_ROOM_FULL,
	ERROR_BANNED,
}
= require ('~/errorCodes.js');


MainMenuHandlers.addHandler ('Request', 'JoinRoom', ( client, packet ) =>
{
	const { body } = packet;

	let error = null;
	let room  = null;

	if ( body === null || typeof body !== 'object' )
	{
		error = ERROR_BAD_PACKET;
	}
	else
	{
		const { roomID = '', password = '' } = body;

		room = getRoom (roomID);

		if ( room === null )
		{
			error = ERROR_NOT_FOUND;
		}
		else if ( !room.isPassword (password) )
		{
			error = ERROR_WRONG_PASSWORD;
		}
		else if ( room.clients.isBannedID (client.id) )
		{
			error = ERROR_BANNED;
		}
		else if ( room.isFull )
		{
			error = ERROR_ROOM_FULL;
		}
	}

	if ( error !== null )
	{
		client.sendPacket ('Reject', packet, error);
	}
	else
	{
		addClientToRoom (room, client);
		client.sendPacket ('Accept', packet);
	}
});
