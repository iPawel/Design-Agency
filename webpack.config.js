const path = require("path");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./app/assets/scripts/App.js",
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "docs")
    },
    devServer: {
        open: true,
        contentBase: path.resolve(__dirname, "app/assets/images"),
        port: 5001
    },
    mode: "development",
    watch: true,
    module: {
        rules: [{
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(scss|sass)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
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
        })
    ]
};