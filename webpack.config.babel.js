/* eslint no-console:"off" */

module.exports = env => {
	const config = {
		entry: "./src/app.js",
		output: {
			filename: "dist/bundle.js",
			publicPath: "/dist/",
		},
		module: {
			loaders: [
				{test: /\.js$/,   loaders: ["babel-loader"], exclude: /node_modules/},
				{test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"]},
				{test: /\.png/,   loaders: ["url-loader"]},
			],
		},
	};
	if (env.debug) {
		console.log(config);
		debugger; // eslint-disable-line
	}
	return config;
};
