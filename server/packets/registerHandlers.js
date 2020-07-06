[
	'RegisterInfo',
	'CreateRoom',
	'JoinRoom',
]
.forEach (fileName => require (`$/packets/handlers/${fileName}.js`));
