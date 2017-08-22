const path = require('path');

module.exports = {
    entry:{
        'index': './vue/index/main.js',
    },
    output:{
        path:'./app/views/build',
        filename:'[filename].js'
    },
    module: {
        loaders: [
            {
                test:/\.vue/,
                exclude: /node_modules/,
                loader: vue.withLoaders({
                    js:'babel?optional[]=runtime'
                })
            },
            {test: /\.scss$/, loader: 'style!css!sass'},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.js$/, loader: 'babel-loader'}
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions:['','.js','.json']
    }
}