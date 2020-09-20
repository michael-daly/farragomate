const clearErrorMsg = field =>
{
	return { type: 'CLEAR_ERROR_MSG', payload: field };
};

const setLeaveRoomMsg = message =>
{
	return { type: 'SET_LEAVE_ROOM_MSG', payload: message };
};


export { clearErrorMsg, setLeaveRoomMsg };
