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
			'!': path.resolve (__dirname, './client/js/'),

			'~/util': path.resolve (__dirname, './common/util/'),
			'~':      path.resolve (__dirname, './common/'),
		}
	},
};
