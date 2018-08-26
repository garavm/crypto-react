const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});
module.exports = {
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[name]-[local]-[hash:base64:5]'
                }
            }],
            exclude: /node_modules/
        }, {
            test: /\.jsx?$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react']
                }
            }],
            exclude: /node_modules/
        }, {
            test: /\.html$/,
            use: [
                {
                    loader: "html-loader"
                }
            ]
        }]
    },
    plugins: [htmlPlugin],
    devServer: {
        port: 8000
    }
}
