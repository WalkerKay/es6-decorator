import webpack from 'webpack';
import path from 'path';

export default {
    entry: {
        app: './src/index.js'
    },
    output: {
        path: './dist/',
        filename: 'build.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel'
        }]
    },
    devtool: 'source-map',
    // 测试 inject 压缩
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false
    //         }
    //     })
    // ]
}