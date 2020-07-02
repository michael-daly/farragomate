const uuid = require ('uuid/v4');


class GameClient
{
	/**
	 * @param {string}         id
	 * @param {WebSocket}      socket
	 * @param {GameClientInfo} info
	 */
	constructor ( id, socket, info )
	{
		socket.gameClient = this;

		this.id     = id;
		this.socket = socket;
		this.info   = info;
		this.roomID = null;

		this.isDeleted = false;
	}

	delete ()
	{
		if ( !this.isDeleted )
		{
			return;
		}

		this.socket.close ();

		delete this.socket.gameClient;

		delete this.id;
		delete this.socket;
		delete this.info;
		delete this.roomID;

		this.isDeleted = true;
	}
}

/**
 * @param {WebSocket}      socket
 * @param {GameClientInfo} info
 *
 * @returns {GameClient}
 */
const createClient = ( socket, info ) =>
{
	return new GameClient (uuid (), socket, info);
};


module.exports = { GameClient, createClient };
