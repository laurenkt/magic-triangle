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
				{test: /\.js$/,   loaders: ["babel", "eslint"], exclude: /node_modules/},
				{test: /\.scss$/, loaders: ["style", "css", "sass"]},
				{test: /\.png/,   loaders: ["url"]},
			],
		},
	};
	if (env.debug) {
		console.log(config);
		debugger; // eslint-disable-line
	}
	return config;
};
