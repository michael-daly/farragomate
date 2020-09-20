const
{
	SK_ERR_NO_STATUS,
	SK_ERR_ABNORMAL,
	SK_ERR_INTERAL,
	SK_ERR_RESTART,
	SK_ERR_TRY_LATER,
}
= require ('~/socketErrors.js');


/**
 * @param   {Integer} error
 * @returns {string}
 */
const getSocketErrorMsg = error =>
{
	switch ( error )
	{
		case SK_ERR_NO_STATUS:
		{
			return 'No status code provided.';
		}

		case SK_ERR_ABNORMAL:
		{
			return 'Master server either crashed or was closed.';
		}

		case SK_ERR_INTERAL:
		{
			return 'Internal server error.';
		}

		case SK_ERR_RESTART:
		{
			return 'Master server is restarting...';
		}

		case SK_ERR_TRY_LATER:
		{
			return 'Master server has too many connections! Please try again in a few minutes.';
		}

		default:
		{
			return `Unhandled socket error ${error}`;
		}
	}
};


module.exports = getSocketErrorMsg;
