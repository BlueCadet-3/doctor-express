const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');

module.exports = {
	watch: true,
	target: 'node',
	mode: 'development',
	entry: './src/server.ts',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new Dotenv({
			path: './.env',
			safe: false,
			systemvars: true
		})
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build'),
	},
	externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
}, (env) => {
	// Use env.<YOUR VARIABLE> here:
	console.log(':::Secret ', env.SECRET); // 'local'
	console.log(':::DatabaseURL ', env.DATABASE_URL); // true

	return {
		entry: './.env',
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'build'),
		},
	};
};
