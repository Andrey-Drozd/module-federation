const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require("webpack").container

const { dependencies } = require('./package.json')

module.exports = {
    entry: "./src/index",
    mode: "development",
    devServer: {
        static: path.join(__dirname, "dist"),
        port: 5001,
    },
    output: {
        publicPath: "auto",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "importer",
            remotes: {
                exporter: 'exporter@http://localhost:5000/remoteEntry.js',
            },
            shared: {
                react: {
                    singleton: true,
                    requiredVersion: dependencies['react'],
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: dependencies['react-dom'],
                },
            },
        }),
        new HtmlWebPackPlugin({
            template: './public/index.html',
        }),
    ],
}