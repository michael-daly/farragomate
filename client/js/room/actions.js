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


export { leaveRoom, addToSentence, removeFromSentence, clearSentence };
