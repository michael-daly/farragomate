// Register custom module paths (see _moduleAliases in package.json)
require ('module-alias/register');

const express = require ('express');
const app     = express ();

const PORT = 3000;


app.listen (PORT, () =>
{
	console.log (`Listening on port ${PORT}`);
});


module.exports = app;
