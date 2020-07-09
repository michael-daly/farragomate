const deepFreeze = require ('~/util/deepFreeze.js');

const defaultState = deepFreeze ({});


module.exports = ( state = defaultState, action ) =>
{
	const { type, payload } = action;

	return state;
};
