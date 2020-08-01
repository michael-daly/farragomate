const fieldData        = require ('~/rooms/fieldData.js');
const validateRoomInfo = require ('$/rooms/info/validateRoomInfo.js');

const { GameRoom } = require ('$/rooms/GameRoom.js');

const { MainMenuHandlers } = require ('$/packets/handlerMaps.js');
const { addNewRoom }       = require ('$/rooms/GameRoomMap.js');
const { mapStringFields }  = require ('$/fields/mapFields.js');

const { sanitizeString, stripNonASCII } = require ('~/util/sanitization.js');

const { ERROR_NONE, ERROR_BAD_PACKET } = require ('~/errorCodes.js');


MainMenuHandlers.addHandler ('Request', 'CreateRoom', ( client, packet ) =>
{
	const { body } = packet;

	let info;
	let error = ERROR_NONE;

	if ( body === null || typeof body !== 'object' )
	{
		error = ERROR_BAD_PACKET;
	}
	else
	{
		info = mapStringFields (body, fieldData, ( field, fieldName, data ) =>
		{
			field = stripNonASCII (field);

			if ( !data.isPassword )
			{
				return field.trim ();
			}

			return field;
		});

		error = validateRoomInfo (info, client);
	}

	if ( error !== ERROR_NONE )
	{
		client.sendPacket ('Reject', packet, error);
	}
	else
	{
		const roomOrError = addNewRoom (client, mapStringFields (info, fieldData, sanitizeString));

		if ( roomOrError instanceof GameRoom )
		{
			client.sendPacket ('Accept', packet, roomOrError.id);
		}
		else
		{
			client.sendPacket ('Reject', packet, roomOrError);
		}
	}
});
