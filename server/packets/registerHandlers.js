[
	'RegisterInfo',
	'CreateRoom',
	'JoinRoom',
	'LeaveRoom',
	'KickClient',
	'RoomList',
]
.forEach (fileName => require (`$/packets/handlers/${fileName}.js`));
