const clearErrorMsg = field =>
{
	return { type: 'CLEAR_ERROR_MSG', payload: field };
};


export { clearErrorMsg };
