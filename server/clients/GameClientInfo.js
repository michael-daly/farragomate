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
 * @param   {string} displayName
 * @returns {GameClientInfo}
 */
const createClientInfo = displayName =>
{
	return new GameClientInfo (applyDefaultValues (displayName, fieldData));
}


module.exports = { GameClientInfo, createClientInfo };
