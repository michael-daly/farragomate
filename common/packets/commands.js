const commands = new Set (
[
	// DataPackets sent from server to client.
	'Error',
	'Warning',
	'Message',

	// RequestPacket->ResponsePacket for registering a username
	'RegisterInfo',

	// RequestPacket->ResponsePacket
	'CreateRoom',

	// When a DataPacket sent from server to client, it's a notification that someone joined.
	// When a RequestPacket->ResponsePacket, it's a request/response to join a room.
	'JoinRoom',

	// When a DataPacket sent from server to client, it's a notification that someone left.
	// When a DataPacket sent from client to server, it's a notification that they left.
	'LeaveRoom',

	// When a DataPacket sent from server to client, it's a notification that someone was kicked.
	// When a RequestPacket->ResponsePacket, it's a request/response to kick a client.
	'KickClient',

	// When a DataPacket sent from server to client, it's a notification that someone was banned.
	// When a RequestPacket->ResponsePacket, it's a request/response to ban a client.
	'BanClient',

	// DataPacket sent from server to client about the time left, round, screen, etc.
	// Can be partial to just update how much time is left.
	'RoomInfo',

	// RequestPacket->ResponsePacket for requesting 10 (with pagination) entries of room data.
	'RoomList',

	// DataPacket sent from server to client containing a list of player names, IDs, and scores.
	// Can be partial to update when a player leaves.
	'PlayerList',

	// RequestPacket->ResponsePacket for sending a sentence a player created to the server.
	'SendSentence',

	// DataPacket from server to client containing a list of player-made sentences and, if the
	// correct screen, how many votes each has.
	'PlayerSentences',

	// RequestPacket->ResponsePacket for voting for a player's sentence.
	'CastVote',
]);


module.exports =
{
	isPacketCommand ( command )
	{
		return commands.has (command);
	},
};
