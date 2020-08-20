import { combineReducers, createStore, applyMiddleware } from 'redux';


const reducers = combineReducers (
{
	app:      require ('#/App/reducer.js'),
	errors:   require ('#/errors/reducer.js'),
	register: require ('#/Register/reducer.js'),
	room:     require ('#/room/reducers.js'),
});

const middleware =
[
	require ('#/App/middleware.js'),
	require ('#/socket/middleware.js'),
];

const store = createStore (reducers, undefined, applyMiddleware (...middleware));


export default store;
