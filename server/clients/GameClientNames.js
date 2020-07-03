const GameClientNames = new Set ();


/**
 * @param {string} displayName
 */
const addClientName = displayName =>
{
	GameClientNames.add (displayName);
};

/**
 * @param {string} displayName
 */
const removeClientName = displayName =>
{
	GameClientNames.delete (displayName);
};

/**
 * @param   {string} displayName
 * @returns {boolean}
 */
const hasClientName = displayName =>
{
	return GameClientNames.has (displayName);
};


module.exports = { addClientName, removeClientName, hasClientName };
