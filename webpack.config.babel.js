import webpack from 'webpack';
import path from 'path';

/**
 * Webpack Constants
 */
const ENV = (process.env.NODE_ENV || 'development');
const ROOT = path.resolve(__dirname, 'src');
const DESTINATION = path.resolve(__dirname, 'dist');
const NODE_MODULES = path.join(__dirname, 'node_modules');

// loader 
let Loaders = [{
        test: /\.html$/,
        loader: 'html'
    },
    {
        test: /\.js$/,
        loader: 'babel'
    }
];

//插件君
let webpackConfigPlugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function(module, count) {
            // any required modules inside node_modules are extracted to vendor
            return (
                module.resource &&
                /\.js$/.test(module.resource) &&
                module.resource.indexOf(NODE_MODULES) === 0
            )
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor']
    })
];

if (ENV === 'production') {
    // 测试 inject 压缩
    webpackConfigPlugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
}

let config = {
    entry: {
        app: path.resolve(ROOT, 'index.js')
    },
    output: {
        path: DESTINATION,
        filename: 'build.js'
    },
    module: {
        loaders: Loaders
    },
    devtool: 'source-map',
    plugins: webpackConfigPlugins,
};

export default config