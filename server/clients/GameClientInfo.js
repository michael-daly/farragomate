const applyDefaultValues = require ('$/fields/applyDefaultValues.js');
const fieldData          = require ('$/clients/fieldData.js');


class GameClientInfo
{
	/**
	 * @param {string} displayName
	 */
	constructor ( displayName )
	{
		this.displayName = displayName;
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
