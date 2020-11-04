const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, "src/js/index.tsx"),

    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                loader: "ts-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: {
                    loader: "file-loader"
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },

    resolve: {
        extensions: [".js", ".ts", ".tsx"],
        modules: [
            path.resolve("./src/js"),
            path.resolve("./src/scss"),
            path.resolve("./src/assets"),
            path.resolve("./node_modules")
        ]
    },

    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },

    plugins: [
        new HtmlWebPackPlugin({
          template: "./src/index.html",
          filename: "./index.html"
        })
    ],

    mode: "development",

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true
    }
};