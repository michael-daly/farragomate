const leaveRoom = () =>
{
	return { type: 'LEAVE_ROOM' };
};

const addToSentence = ( bankIndex, wordIndex ) =>
{
	return { type: 'ADD_TO_SENTENCE', payload: { bankIndex, wordIndex } };
};

const removeFromSentence = index =>
{
	return { type: 'REMOVE_FROM_SENTENCE', payload: index };
};

const clearSentence = () =>
{
	return { type: 'CLEAR_SENTENCE' };
};

const castVote = id =>
{
	return { type: 'CAST_VOTE', payload: id };
};

const requestRoomList = () =>
{
	return { type: 'REQUEST_ROOM_LIST' };
};

const requestJoinRoom = ( roomID, password = '' ) =>
{
	return { type: 'REQUEST_JOIN_ROOM', payload: { roomID, password } };
};

const enterScreen = screen =>
{
	return { type: 'ENTER_SCREEN', payload: screen };
};

const leaveScreen = screen =>
{
	return { type: 'LEAVE_SCREEN', payload: screen };
};

const setDataSent = ( wasSent = true ) =>
{
	return { type: 'SET_DATA_SENT', payload: wasSent };
};


export
{
	leaveRoom,

	addToSentence,
	removeFromSentence,
	clearSentence,

	castVote,

	requestRoomList,
	requestJoinRoom,

	enterScreen,
	leaveScreen,

	setDataSent,
};
