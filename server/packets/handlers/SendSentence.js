const SentenceCreation = require ('$/screens/SentenceCreation.js');
const validateSentence = require ('$/rooms/validateSentence.js');

const { GameRoomHandlers } = require ('$/packets/handlerMaps.js');

const { getRoom } = require ('$/rooms/GameRoomMap.js');

const { ERROR_NONE, ERROR_REPEAT_DATA, ERROR_WRONG_SCREEN } = require ('~/errorCodes.js');


GameRoomHandlers.addHandler ('Request', 'SendSentence', ( client, packet ) =>
{
	const sentence = packet.body;
	const room     = getRoom (client.roomID);

	let error = null;

	if ( room.screen !== SentenceCreation )
	{
		error = ERROR_WRONG_SCREEN;
	}
	else if ( room.sentences.hasSentence (client.id) )
	{
		error = ERROR_REPEAT_DATA;
	}
	else
	{
		error = validateSentence (room.sentences, sentence);
	}

	if ( error !== ERROR_NONE )
	{
		client.sendPacket ('Reject', packet, error);
	}
	else
	{
		room.sentences.addSentence (client.id, sentence);
		client.sendPacket ('Accept', packet);
	}
});
