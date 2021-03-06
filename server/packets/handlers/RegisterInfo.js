const fieldData      = require ('~/clients/fieldData.js');
const filterRules    = require ('~/config/filterRules.js');
const validateFields = require ('$/fields/validateFields.js');

const { MainMenuHandlers } = require ('$/packets/handlerMaps.js');
const { mapStringFields }  = require ('$/fields/mapFields.js');
const { hasClientName }    = require ('$/clients/GameClientNames.js');

const { sanitizeString, stripNonASCII } = require ('~/util/sanitization.js');

const
{
	ERROR_NONE,
	ERROR_BAD_PACKET,
	FIELD_ERR_UNIQUE,
	FIELD_ERR_BAD_WORD,
}
= require ('~/errorCodes.js');


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

		const result = validateFields (info, fieldData, filterRules);

		if ( result !== ERROR_NONE )
		{
			client.sendPacket ('Reject', packet, result);
		}
		else
		{
			const displayName = sanitizeString (info.displayName);
			const currName    = client.getDisplayName ();

			if ( hasClientName (displayName) && displayName.toLowerCase () !== currName.toLowerCase () )
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
