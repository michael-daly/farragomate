[
	'RegisterInfo',
	'CreateRoom',
	'JoinRoom',
	'LeaveRoom',
	'KickClient',
	'RoomList',
	'SendSentence',
	'CastVote',
]
.forEach (fileName => require (`$/packets/handlers/${fileName}.js`));
