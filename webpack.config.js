var config = {
    entry: './main.tsx',

    output: {
        path: './',
        filename: 'index.js',
    },

    devServer: {
        inline: true,
        port: 8080
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.tsx', '.scss'],
    },

    node: {
        fs: "empty",
        net: "empty",
        tls: "empty",
    },

    module: {
        loaders: [
            {
                test: /\.ts(x?)$/,
                loader: 'ts-loader'
            },

            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },

            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',

                query: {
                    presets: ['es2015', 'react']
                }
            },

            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
}

module.exports = config;