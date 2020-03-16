const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: "./app/assets/scripts/App.js",
	output: {
		filename: "js/[name]-[contenthash].js",
		path: path.resolve(__dirname, "docs")
	},
	mode: "production",
	watch: true,
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"]
			},
			{
				test: /\.(scss|sass)$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
			},
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				options: {
					presets: [
						[
							"@babel/preset-env",
							{
								useBuiltIns: "usage",
								corejs: "2.0.0"
							}
						]
					],
					plugins: ["@babel/plugin-proposal-class-properties"]
				}
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "app/templates/template.html",
			title: "Design Agency"
		}),
		new MiniCssExtractPlugin({
			filename: "css/[name]-[contenthash].css"
		}),
		new CopyPlugin([
			{
				from: "app/assets/images",
				to: "images"
			}
		])
	]
};
