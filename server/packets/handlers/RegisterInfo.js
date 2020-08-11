const fieldData          = require ('~/clients/fieldData.js');
const validateClientInfo = require ('$/clients/info/validateClientInfo.js');

const { MainMenuHandlers } = require ('$/packets/handlerMaps.js');
const { mapStringFields }  = require ('$/fields/mapFields.js');
const { hasClientName }    = require ('$/clients/GameClientNames.js');

const { sanitizeString, stripNonASCII } = require ('~/util/sanitization.js');

const { ERROR_NONE, ERROR_BAD_PACKET, FIELD_ERR_UNIQUE } = require ('~/errorCodes.js');


MainMenuHandlers.addHandler ('Request', 'RegisterInfo', ( client, packet ) =>
{
	const { body } = packet;

	if ( body === null || typeof body !== 'object' )
	{
		client.sendPacket ('Reject', packet, ERROR_BAD_PACKET);
	}
	else
	{
		const info = mapStringFields (body, fieldData, ( field, fieldName, data ) =>
		{
			field = stripNonASCII (field);

			if ( !data.isPassword )
			{
				return field.trim ();
			}

			return field;
		});

		const result = validateClientInfo (info);

		if ( result !== ERROR_NONE )
		{
			client.sendPacket ('Reject', packet, result);
		}
		else
		{
			const displayName = sanitizeString (info.displayName);

			if ( hasClientName (displayName) && displayName !== client.getDisplayName () )
			{
				client.sendPacket ('Reject', packet, ['displayName', FIELD_ERR_UNIQUE]);
			}
			else
			{
				client.setDisplayName (displayName);
				client.sendPacket ('Accept', packet, { id: client.id, displayName });
			}
		}
	}
});
