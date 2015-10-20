module.exports = {
    entry: [ 
        "./src/index.js"
    ],
    output: {
        path: __dirname + "/dist",
        publicPath: "/",
        filename: "index.js"
    },
    module: {
        loaders: [
            { 
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    }
}