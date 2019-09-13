var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var inProduction = (process.env.NODE_ENV === 'production');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

var assetsDir = 'assets';


module.exports = {
    entry:
    {
        app: [
            './resources/js/app.js',
            './resources/sass/app.scss'
        ],
        libs: [
            './resources/sass/libs.scss'
        ]
    },
    output:
    {
        path: path.resolve(__dirname, './' + assetsDir),
        filename: 'js/[name].js',
        publicPath: '../'
    },
    module:
    {
        rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        },
        {
            test: /\.s[ac]ss$/,
            use: ExtractTextPlugin.extract(
            {
                use: ['css-loader', 'resolve-url-loader', 'postcss-loader', 'sass-loader?sourceMap'],
                fallback: "style-loader"
            })
        },
        {
            test: /\.(jpe?g|png|gif)$/i,
            loaders: [
                {
                    loader: 'file-loader',
                    options:
                    {
                        name: 'images/[name].[ext]?[hash]'
                    }
                },
                'img-loader'
            ]
        },
        {
            test: /\.(eot|ttf|woff|woff2|svg)$/i,
            loaders: [
            {
                loader: 'file-loader',
                options:
                {
                    name: 'fonts/[name].[ext]?[hash]'
                }
            }]
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options:
            {
                loaders:
                {
                    scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                    sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
                },
                postcss: [
                    require('autoprefixer')
                ]
            }
        }]
    },
    plugins: [
        new webpack.ProvidePlugin(
        {
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),

        new FriendlyErrorsWebpackPlugin(),

        new ExtractTextPlugin("css/[name].css"),

        new webpack.LoaderOptionsPlugin(
        {
            minimize: inProduction,
            options:
            {
                postcss: [
                    require('autoprefixer')
                ]
            },
            context: __dirname,
            output:
            {
                path: './' + assetsDir
            }
        })

    ],
    resolve:
    {
        extensions: ['*', '.js', '.jsx', '.vue'],

        alias:
        {
            'vue$': 'vue/dist/vue.common.js'
        }
    }
};


if (inProduction)
{
    module.exports.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    );

    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    )
}
