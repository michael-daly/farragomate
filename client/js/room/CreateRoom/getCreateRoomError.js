const
{
	ERROR_ROOM_LIMIT,
}
= require ('~/errorCodes.js');


/**
 * @param   {Integer} error
 * @returns {string}
 */
const getCreateRoomError = error =>
{
	switch ( error )
	{
		case ERROR_ROOM_LIMIT:
		{
			return 'Master server has too many rooms at the moment! Please try again in a few minutes.';
		}

		default:
		{
			return `Internal application error: Unknown room creation error ${error}`;
		}
	}
};


module.exports = getCreateRoomError;
