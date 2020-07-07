const applyDefaultValues = require ('$/fields/applyDefaultValues.js');
const fieldData          = require ('$/clients/info/fieldData.js');


class GameClientInfo
{
	/**
	 * @param {Object} info
	 */
	constructor ( info )
	{
		this.displayName = info.displayName;
	}
}

/**
 * @param   {Object} [info={}]
 * @returns {GameClientInfo}
 */
const createClientInfo = ( info = {} ) =>
{
	return new GameClientInfo (applyDefaultValues (info, fieldData));
}


module.exports = { GameClientInfo, createClientInfo };
