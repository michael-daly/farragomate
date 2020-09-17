const path    = require ('path');
const webpack = require ('webpack');


module.exports =
{
	entry: './client/js/main.js',

	output:
	{
		filename: 'bundle.js',
		path: path.join (__dirname + '/client/dist')
	},

	mode: 'development',

	module:
	{
		rules:
		[
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options:
				{
					presets: ['@babel/preset-env', '@babel/preset-react']
				}
			}
		]
	},

	resolve:
	{
		alias:
		{
			'#/App':        path.resolve (__dirname, './client/js/App/'),
			'#/CreateRoom': path.resolve (__dirname, './client/js/room/CreateRoom/'),
			'#/JoinRoom':   path.resolve (__dirname, './client/js/room/JoinRoom/'),
			'#/MainGame':   path.resolve (__dirname, './client/js/room/MainGame/'),
			'#/screens':    path.resolve (__dirname, './client/js/room/screens/'),
			'#':            path.resolve (__dirname, './client/js/'),

			'~/util': path.resolve (__dirname, './common/util/'),
			'~':      path.resolve (__dirname, './common/'),
		}
	},
};
