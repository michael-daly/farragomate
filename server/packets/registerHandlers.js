[
	'RegisterInfo',
	'CreateRoom',
	'JoinRoom',
	'LeaveRoom',
	'KickClient',
]
.forEach (fileName => require (`$/packets/handlers/${fileName}.js`));
