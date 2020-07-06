[
	'RegisterInfo',
	'CreateRoom',
	'JoinRoom',
	'LeaveRoom',
]
.forEach (fileName => require (`$/packets/handlers/${fileName}.js`));
