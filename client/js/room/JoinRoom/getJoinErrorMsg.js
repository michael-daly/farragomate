const
{
	ERROR_FLOOD,
	ERROR_NOT_FOUND,
	ERROR_WRONG_PASSWORD,
	ERROR_ROOM_FULL,
	ERROR_BANNED,
}
= require ('~/errorCodes.js');


/**
 * @param   {Integer} error
 * @returns {string}
 */
const getJoinErrorMsg = error =>
{
	switch ( error )
	{
		case ERROR_FLOOD:
		{
			return 'Please wait before requesting the room list again.';
		}

		case ERROR_NOT_FOUND:
		{
			return 'This room has been closed.';
		}

		case ERROR_WRONG_PASSWORD:
		{
			return 'Wrong password.';
		}

		case ERROR_ROOM_FULL:
		{
			return 'This room is full.';
		}

		case ERROR_BANNED:
		{
			return 'You are banned from this room.';
		}

		default:
		{
			return `Internal application error: Unknown joinRoom error ${error}`;
		}
	}
};


module.exports = getJoinErrorMsg;
