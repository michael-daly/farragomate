const applyDefaultValues = require ('$/fields/applyDefaultValues.js');
const fieldData          = require ('$/rooms/fieldData.js');


class GameRoomInfo
{
	/**
	 * @param {Object} info
	 */
	constructor ( info )
	{
		this.title      = info.title;
		this.password   = info.password;
		this.maxPlayers = info.maxPlayers;
		this.timeLimit  = info.timeLimit;
		this.numRounds  = info.numRounds;
	}
}

/**
 * @param   {Object} [info={}]
 * @returns {GameRoomInfo}
 */
const createRoomInfo = ( info = {} ) =>
{
	return new GameRoomInfo (applyDefaultValues (info, fieldData));
};


module.exports = { GameRoomInfo, createRoomInfo };
