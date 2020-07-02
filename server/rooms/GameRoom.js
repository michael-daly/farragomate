const uuid = require ('uuid/v4');


class GameRoom
{
	/**
	 * @param {string}       id
	 * @param {string}       ownerID
	 * @param {GameRoomInfo} info
	 */
	constructor ( id, ownerID, info )
	{
		this.id      = id;
		this.ownerID = ownerID;
		this.info    = info;

		this.clientIDs = new Set ();
		this.currRound = 0;
	}
}

/**
 * @param {string}       ownerID
 * @param {GameRoomInfo} info
 *
 * @returns {GameRoom}
 */
const createRoom = ( ownerID, info ) =>
{
	return new GameRoom (uuid (), ownerID, info);
};


module.exports = { GameRoom, createRoom };
