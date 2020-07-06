/**
 * @returns {Date}
 */
const getTimestamp = () =>
{
	return new Date ();
};

/**
 * @param   {Date} timestamp
 * @returns {Integer} Time since the timestamp.
 */
const getTimeSince = timestamp =>
{
	return new Date () - timestamp;
};


module.exports = { getTimestamp, getTimeSince };
