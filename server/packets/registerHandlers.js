[
	'RegisterInfo',
	'CreateRoom',
	'JoinRoom',
	'LeaveRoom',
	'KickClient',
	'RoomList',
	'SendSentence',
]
.forEach (fileName => require (`$/packets/handlers/${fileName}.js`));
