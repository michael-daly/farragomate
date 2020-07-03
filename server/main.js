// Register custom module paths (see _moduleAliases in package.json)
require ('module-alias/register');

const express = require ('express');
const app     = express ();

const WebSocketServer = require ('ws').Server;

const onNewConnection = require ('$/socketCallbacks.js');

const PORT = 3000;


app.listen (PORT, () =>
{
	console.log (`Listening on port ${PORT}`);
});

const wss = new WebSocketServer ({ port: 8080 }, () => console.log ('Farragomate server started.'));

wss.on ('connection', onNewConnection);


module.exports = app;
