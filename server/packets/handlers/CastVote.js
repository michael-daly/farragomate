const SentenceVoting   = require ('$/screens/SentenceVoting.js');
const validateSentence = require ('$/rooms/validateSentence.js');

const { GameRoomHandlers } = require ('$/packets/handlerMaps.js');

const { getRoom } = require ('$/rooms/GameRoomMap.js');

const
{
	ERROR_NONE,
	ERROR_REPEAT_DATA,
	ERROR_NOT_FOUND,
	ERROR_NOT_ALLOWED,
	ERROR_WRONG_SCREEN,
}
= require ('~/errorCodes.js');


GameRoomHandlers.addHandler ('Request', 'CastVote', ( client, packet ) =>
{
	const voteID = packet.body;
	const room   = getRoom (client.roomID);

	let error = ERROR_NONE;

	if ( room.screen !== SentenceVoting )
	{
		error = ERROR_WRONG_SCREEN;
	}
	else if ( room.clients.hasVotedID (client.id) )
	{
		error = ERROR_REPEAT_DATA;
	}
	else if ( !room.clients.canVote (client.id) || voteID === client.id )
	{
		// Players cannot vote for their own sentence.
		error = ERROR_NOT_ALLOWED;
	}
	else if ( !room.sentences.hasSentence (voteID) )
	{
		error = ERROR_NOT_FOUND;
	}

	if ( error !== ERROR_NONE )
	{
		client.sendPacket ('Reject', packet, error);
	}
	else
	{
		room.clients.addVotedID (client.id);
		room.sentences.addVote (voteID);

		client.sendPacket ('Accept', packet);
	}
});
