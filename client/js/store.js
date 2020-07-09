import { combineReducers, createStore, applyMiddleware } from 'redux';


const reducers = combineReducers (
{
	app: require ('#/App/reducer.js'),
});

const middleware =
[
	// require ('path/to/middleware.js'),
];

const store = createStore (reducers, undefined, applyMiddleware (...middleware));


export default store;
