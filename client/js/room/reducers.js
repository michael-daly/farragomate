const { combineReducers } = require ('redux');


const reducers = combineReducers (
{
	info:      require ('#/room/reducers/info.js'),
	clients:   require ('#/room/reducers/clients.js'),
	list:      require ('#/room/reducers/roomList.js'),
	wordbanks: require ('#/room/reducers/wordbanks.js'),
	sentences: require ('#/room/reducers/sentences.js'),
});


module.exports = reducers;
