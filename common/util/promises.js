/**
 * Sleeps for X milliseconds.
 *
 * @param   {Integer}
 * @returns {Promise}
 */
const sleep = milliseconds =>
{
	return new Promise (resolve => setTimeout (resolve, milliseconds));
};


module.exports = { sleep };
