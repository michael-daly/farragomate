// Register custom module paths (see _moduleAliases in package.json)
require ('module-alias/register');

const path    = require ('path');
const express = require ('express');
const app     = express ();

const WebSocketServer = require ('ws').Server;
const onNewConnection = require ('$/socketCallbacks.js');

const { socketPort } = require ('~/config.js');

const PORT = 3000;


app.use ('/', express.static (path.join (__dirname, '../client')));

app.get ('/*', ( req, res ) =>
{
	res.sendFile ('index.html', { root: path.join (__dirname, '../client') });
});

app.listen (PORT, () =>
{
	console.log (`Listening on port ${PORT}`);
});

const wss = new WebSocketServer ({ port: socketPort }, () => console.log ('Farragomate server started.'));

wss.on ('connection', onNewConnection);


module.exports = app;
