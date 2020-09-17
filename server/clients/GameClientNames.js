const GameClientNames = new Set ();


/**
 * Several permutations, such as all lowercase and different characters that look similar,
 * need to be checked here to be thorough.
 */


/**
 * @param {string} displayName
 */
const addClientName = displayName =>
{
	GameClientNames.add (displayName);
	GameClientNames.add (displayName.toLowerCase ());
	GameClientNames.add (displayName.toLowerCase ().replace (/0/g, 'o').replace (/i/ig, 'l'));
};

/**
 * @param {string} displayName
 */
const removeClientName = displayName =>
{
	GameClientNames.delete (displayName);
	GameClientNames.delete (displayName.toLowerCase ());
	GameClientNames.delete (displayName.toLowerCase ().replace (/0/g, 'o').replace (/i/ig, 'l'));
};

/**
 * @param   {string} displayName
 * @returns {boolean}
 */
const hasClientName = displayName =>
{
	return GameClientNames.has (displayName) || GameClientNames.has (displayName.toLowerCase ()) ||
	       GameClientNames.has (displayName.toLowerCase ().replace (/0/g, 'o').replace (/i/ig, 'l'));
};


module.exports = { addClientName, removeClientName, hasClientName };
